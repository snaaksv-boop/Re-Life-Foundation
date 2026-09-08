import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, onSnapshot, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { ensureSafeImageSize } from '../lib/imageUtils';
import {
  OrganizationInfo,
  FounderInfo,
  TreatmentProgram,
  FacilityItem,
  GalleryPhoto,
  VideoItem,
  Testimonial,
  RecoveryStep,
  ContactSubmission,
  SiteNotice,
  AboutSectionData
} from '../types';
import {
  defaultOrgInfo,
  defaultFounder,
  defaultPrograms,
  defaultFacilities,
  defaultGallery,
  defaultVideos,
  defaultTestimonials,
  defaultRecoverySteps,
  defaultNotices,
  defaultAboutData
} from '../data/defaultContent';

interface ContentContextType {
  orgInfo: OrganizationInfo;
  setOrgInfo: (info: OrganizationInfo) => void;
  updateOrgInfo: (updates: Partial<OrganizationInfo>) => void;
  
  founder: FounderInfo;
  setFounder: (f: FounderInfo) => void;
  updateFounder: (updates: Partial<FounderInfo>) => void;
  setFounderPhoto: (dataUrl: string | null) => void;

  programs: TreatmentProgram[];
  setPrograms: (programs: TreatmentProgram[]) => void;
  updateProgram: (id: string, updates: Partial<TreatmentProgram>) => void;

  facilities: FacilityItem[];
  setFacilities: (facilities: FacilityItem[]) => void;
  updateFacility: (id: string, updates: Partial<FacilityItem>) => Promise<void> | void;
  addFacility: (facility: Omit<FacilityItem, 'id'>) => Promise<void> | void;
  deleteFacility: (id: string) => void;

  gallery: GalleryPhoto[];
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  deleteGalleryPhoto: (id: string) => void;
  updateGalleryPhoto: (id: string, updates: Partial<GalleryPhoto>) => void;

  videos: VideoItem[];
  addVideo: (video: Omit<VideoItem, 'id'>) => void;
  deleteVideo: (id: string) => void;
  updateVideo: (id: string, updates: Partial<VideoItem>) => void;

  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;

  recoverySteps: RecoveryStep[];
  
  notices: SiteNotice[];
  addNotice: (notice: Omit<SiteNotice, 'id'>) => void;
  deleteNotice: (id: string) => void;
  toggleNotice: (id: string) => void;

  submissions: ContactSubmission[];
  addSubmission: (sub: Omit<ContactSubmission, 'id' | 'timestamp' | 'status'>) => void;
  updateSubmissionStatus: (id: string, status: ContactSubmission['status']) => void;

  heroBgUrl: string;
  setHeroBgUrl: (url: string) => void;
  
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;

  aboutData: AboutSectionData;
  updateAboutData: (updates: Partial<AboutSectionData>) => void;

  resetToDefaults: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'relife_foundation_v1_';

export const sortGalleryNewestFirst = (items: GalleryPhoto[]): GalleryPhoto[] => {
  return [...items].sort((a, b) => {
    const getPhotoTime = (p: GalleryPhoto): number => {
      if (p.createdAt && typeof p.createdAt === 'number') return p.createdAt;
      if (p.id && p.id.startsWith('gal-')) {
        const num = Number(p.id.replace('gal-', ''));
        if (!isNaN(num) && num > 1000000000) return num;
      }
      return 0;
    };

    const timeA = getPhotoTime(a);
    const timeB = getPhotoTime(b);

    if (timeA > 0 && timeB > 0 && timeA !== timeB) {
      return timeB - timeA; // Newer timestamp first (1st position)
    }
    if (timeA > 0 && timeB === 0) return -1; // user-added photo comes before default
    if (timeA === 0 && timeB > 0) return 1;  // default photo comes after user-added
    return 0;
  });
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}orgInfo`);
      return saved ? JSON.parse(saved) : defaultOrgInfo;
    } catch {
      return defaultOrgInfo;
    }
  });

  const [founder, setFounder] = useState<FounderInfo>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}founder`);
      return saved ? JSON.parse(saved) : defaultFounder;
    } catch {
      return defaultFounder;
    }
  });

  const [programs, setPrograms] = useState<TreatmentProgram[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}programs`);
      return saved ? JSON.parse(saved) : defaultPrograms;
    } catch {
      return defaultPrograms;
    }
  });

  const [facilities, setFacilities] = useState<FacilityItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}facilities`);
      return saved ? JSON.parse(saved) : defaultFacilities;
    } catch {
      return defaultFacilities;
    }
  });

  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}gallery`);
      return saved ? sortGalleryNewestFirst(JSON.parse(saved)) : defaultGallery;
    } catch {
      return defaultGallery;
    }
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}videos`);
      return saved ? JSON.parse(saved) : defaultVideos;
    } catch {
      return defaultVideos;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}testimonials`);
      return saved ? JSON.parse(saved) : defaultTestimonials;
    } catch {
      return defaultTestimonials;
    }
  });

  const [notices, setNotices] = useState<SiteNotice[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}notices`);
      return saved ? JSON.parse(saved) : defaultNotices;
    } catch {
      return defaultNotices;
    }
  });

  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}submissions`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [heroBgUrl, setHeroBgUrlState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}heroBg`);
      return saved || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1920&q=85';
    } catch {
      return 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1920&q=85';
    }
  });

  const [logoUrl, setLogoUrlState] = useState<string | null>(() => {
    try {
      return localStorage.getItem(`${STORAGE_KEY_PREFIX}logo`) || null;
    } catch {
      return null;
    }
  });

  const [aboutData, setAboutData] = useState<AboutSectionData>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}aboutData`);
      return saved ? JSON.parse(saved) : defaultAboutData;
    } catch {
      return defaultAboutData;
    }
  });

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}orgInfo`, JSON.stringify(orgInfo));
    } catch (e) {
      console.warn("Storage full or error saving orgInfo", e);
    }
  }, [orgInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}founder`, JSON.stringify(founder));
    } catch (e) {
      console.warn("Storage full or error saving founder", e);
    }
  }, [founder]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}programs`, JSON.stringify(programs));
    } catch (e) {
      console.warn("Storage full or error saving programs", e);
    }
  }, [programs]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}facilities`, JSON.stringify(facilities));
    } catch (e) {
      console.warn("Storage full or error saving facilities", e);
    }
  }, [facilities]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}gallery`, JSON.stringify(gallery));
    } catch (e) {
      console.warn("Storage full or error saving gallery", e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}videos`, JSON.stringify(videos));
    } catch (e) {
      console.warn("Storage full or error saving videos", e);
    }
  }, [videos]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}testimonials`, JSON.stringify(testimonials));
    } catch (e) {
      console.warn("Storage full or error saving testimonials", e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}notices`, JSON.stringify(notices));
    } catch (e) {
      console.warn("Storage full or error saving notices", e);
    }
  }, [notices]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}submissions`, JSON.stringify(submissions));
    } catch (e) {
      console.warn("Storage full or error saving submissions", e);
    }
  }, [submissions]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}aboutData`, JSON.stringify(aboutData));
    } catch (e) {
      console.warn("Storage full or error saving aboutData", e);
    }
  }, [aboutData]);

  // Firestore real-time synchronization for site content sections and inquiries
  useEffect(() => {
    // Sanitize any existing large images stored from previous tests in local storage
    if (founder.photoUrl && founder.photoUrl.startsWith('data:image') && founder.photoUrl.length > 300000) {
      ensureSafeImageSize(founder.photoUrl).then((safe) => {
        if (safe && safe !== founder.photoUrl) {
          setFounder(prev => ({ ...prev, photoUrl: safe }));
        }
      });
    }
    if (heroBgUrl && heroBgUrl.startsWith('data:image') && heroBgUrl.length > 300000) {
      ensureSafeImageSize(heroBgUrl).then((safe) => {
        if (safe && safe !== heroBgUrl) {
          setHeroBgUrlState(safe);
        }
      });
    }

    // Subscribe to siteContent collection (modular per-section docs, each <50KB)
    const unsubContent = onSnapshot(collection(db, 'siteContent'), (snapshot) => {
      snapshot.forEach((docSnap) => {
        if (docSnap.id === 'config') return; // Ignore legacy monolithic document
        const section = docSnap.id;
        const docData = docSnap.data();
        if (section === 'about' && docData.data) setAboutData(docData.data);
        else if (section === 'orgInfo' && docData.data) setOrgInfo(docData.data);
        else if (section === 'founder' && docData.data) {
          const cloudFounder = docData.data as FounderInfo;
          setFounder(prev => {
            // Prevent accidental deletion:
            // If the incoming cloud data has no photoUrl (or null/empty/default), but the local user
            // already has a valid photoUrl, preserve the local photo and sync it to the cloud.
            if (!cloudFounder.photoUrl && prev.photoUrl) {
              const healed = { ...cloudFounder, photoUrl: prev.photoUrl };
              syncSectionToCloud('founder', { data: healed });
              return healed;
            }
            return cloudFounder;
          });
        }
        else if (section === 'programs' && docData.data) setPrograms(docData.data);
        else if (section === 'facilities' && docData.data) {
          const cloudFacilities = docData.data as FacilityItem[];
          setFacilities(prev => {
            if (!cloudFacilities || cloudFacilities.length === 0) return prev;
            const cloudMap = new Map(cloudFacilities.map(f => [f.id, f]));
            // Preserve customized user photos in facilities if cloud hasn't received them yet
            const merged = prev.map(localFac => {
              const cloudFac = cloudMap.get(localFac.id);
              if (!cloudFac) return localFac;
              if (localFac.imageUrl?.startsWith('data:image') && !cloudFac.imageUrl?.startsWith('data:image')) {
                return { ...cloudFac, imageUrl: localFac.imageUrl };
              }
              return cloudFac;
            });
            return merged;
          });
        }
        else if (section === 'gallery' && docData.data) {
          const cloudGallery = sortGalleryNewestFirst(docData.data as GalleryPhoto[]);
          setGallery(prev => {
            if (!cloudGallery || cloudGallery.length === 0) return prev;
            // Prevent cloud snapshot from wiping out newly added local photos
            const cloudIds = new Set(cloudGallery.map(p => p.id));
            const localOnly = prev.filter(p => !cloudIds.has(p.id) && (p.createdAt || p.id.startsWith('gal-')));
            if (localOnly.length > 0) {
              const merged = sortGalleryNewestFirst([...localOnly, ...cloudGallery]);
              syncSectionToCloud('gallery', { data: merged });
              return merged;
            }
            return cloudGallery;
          });
        }
        else if (section === 'videos' && docData.data) setVideos(docData.data);
        else if (section === 'testimonials' && docData.data) setTestimonials(docData.data);
        else if (section === 'branding') {
          if (docData.heroBgUrl) setHeroBgUrlState(docData.heroBgUrl);
          if (docData.logoUrl !== undefined) setLogoUrlState(docData.logoUrl);
        }
      });
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'siteContent');
    });

    const unsubInquiries = onSnapshot(collection(db, 'inquiries'), (snapshot) => {
      if (!snapshot.empty) {
        const cloudSubmissions: ContactSubmission[] = [];
        snapshot.forEach((d) => {
          cloudSubmissions.push(d.data() as ContactSubmission);
        });
        cloudSubmissions.sort((a, b) => (b.id > a.id ? 1 : -1));
        setSubmissions(cloudSubmissions);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'inquiries');
    });

    return () => {
      unsubContent();
      unsubInquiries();
    };
  }, []);

  const syncSectionToCloud = async (section: string, payload: Record<string, unknown>) => {
    try {
      const payloadStr = JSON.stringify(payload);
      if (payloadStr.length > 950000) {
        console.warn(`[Cloud Sync] Skipped writing to section '${section}': payload size (${payloadStr.length} bytes) exceeds safe limit.`);
        return;
      }
      await setDoc(doc(db, 'siteContent', section), payload, { merge: true });
    } catch (error) {
      console.warn(`Firestore sync warning for ${section}:`, error);
    }
  };

  const updateAboutData = (updates: Partial<AboutSectionData>) => {
    setAboutData(prev => {
      const updated = { ...prev, ...updates };
      syncSectionToCloud('about', { data: updated });
      return updated;
    });
  };

  const updateOrgInfo = (updates: Partial<OrganizationInfo>) => {
    setOrgInfo(prev => {
      const updated = { ...prev, ...updates };
      syncSectionToCloud('orgInfo', { data: updated });
      return updated;
    });
  };

  const updateFounder = async (updates: Partial<FounderInfo>) => {
    let safeUpdates = { ...updates };
    if (updates.photoUrl) {
      safeUpdates.photoUrl = (await ensureSafeImageSize(updates.photoUrl, 70000)) || updates.photoUrl;
    }
    setFounder(prev => {
      const photoUrl = updates.photoUrl !== undefined ? safeUpdates.photoUrl : prev.photoUrl;
      const updated = { ...prev, ...safeUpdates, photoUrl };
      try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}founder`, JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not cache founder in localStorage', err);
      }
      syncSectionToCloud('founder', { data: updated });
      return updated;
    });
  };

  const setFounderPhoto = async (dataUrl: string | null) => {
    const safePhoto = dataUrl ? (await ensureSafeImageSize(dataUrl, 70000)) : null;
    setFounder(prev => {
      const updated = { ...prev, photoUrl: safePhoto };
      try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}founder`, JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not cache founder in localStorage', err);
      }
      syncSectionToCloud('founder', { data: updated });
      return updated;
    });
  };

  const updateProgram = (id: string, updates: Partial<TreatmentProgram>) => {
    setPrograms(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      syncSectionToCloud('programs', { data: updated });
      return updated;
    });
  };

  const updateFacility = async (id: string, updates: Partial<FacilityItem>) => {
    let safeUpdates = { ...updates };
    if (updates.imageUrl) {
      safeUpdates.imageUrl = (await ensureSafeImageSize(updates.imageUrl, 70000)) || updates.imageUrl;
    }
    setFacilities(prev => {
      const updated = prev.map(f => f.id === id ? { ...f, ...safeUpdates } : f);
      try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}facilities`, JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage save error", e);
      }
      syncSectionToCloud('facilities', { data: updated });
      return updated;
    });
  };

  const addFacility = async (facility: Omit<FacilityItem, 'id'>) => {
    const safeImageUrl = (await ensureSafeImageSize(facility.imageUrl, 70000)) || facility.imageUrl;
    const newFacility: FacilityItem = {
      ...facility,
      imageUrl: safeImageUrl,
      id: `fac-${Date.now()}`
    };
    setFacilities(prev => {
      const updated = [...prev, newFacility];
      try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}facilities`, JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage save error", e);
      }
      syncSectionToCloud('facilities', { data: updated });
      return updated;
    });
  };

  const deleteFacility = (id: string) => {
    setFacilities(prev => {
      const updated = prev.filter(f => f.id !== id);
      try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}facilities`, JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage save error", e);
      }
      syncSectionToCloud('facilities', { data: updated });
      return updated;
    });
  };

  const addGalleryPhoto = async (photo: Omit<GalleryPhoto, 'id'>) => {
    const safeImageUrl = (await ensureSafeImageSize(photo.imageUrl, 70000)) || photo.imageUrl;
    const now = Date.now();
    const newPhoto: GalleryPhoto = {
      ...photo,
      imageUrl: safeImageUrl,
      id: `gal-${now}`,
      createdAt: now
    };
    setGallery(prev => {
      // The new photo is placed strictly at index 0 (1st in line)
      const filtered = prev.filter(p => p.id !== newPhoto.id);
      const updated = [newPhoto, ...filtered];
      try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}gallery`, JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage save error", e);
      }
      syncSectionToCloud('gallery', { data: updated });
      return updated;
    });
  };

  const deleteGalleryPhoto = (id: string) => {
    setGallery(prev => {
      const updated = prev.filter(p => p.id !== id);
      syncSectionToCloud('gallery', { data: updated });
      return updated;
    });
  };

  const updateGalleryPhoto = (id: string, updates: Partial<GalleryPhoto>) => {
    setGallery(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      syncSectionToCloud('gallery', { data: updated });
      return updated;
    });
  };

  const addVideo = (video: Omit<VideoItem, 'id'>) => {
    const newVideo: VideoItem = {
      ...video,
      id: `vid-${Date.now()}`
    };
    setVideos(prev => {
      const updated = [newVideo, ...prev];
      syncSectionToCloud('videos', { data: updated });
      return updated;
    });
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => {
      const updated = prev.filter(v => v.id !== id);
      syncSectionToCloud('videos', { data: updated });
      return updated;
    });
  };

  const updateVideo = (id: string, updates: Partial<VideoItem>) => {
    setVideos(prev => {
      const updated = prev.map(v => v.id === id ? { ...v, ...updates } : v);
      syncSectionToCloud('videos', { data: updated });
      return updated;
    });
  };

  const addTestimonial = (test: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...test,
      id: `test-${Date.now()}`
    };
    setTestimonials(prev => {
      const updated = [newTest, ...prev];
      syncSectionToCloud('testimonials', { data: updated });
      return updated;
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => {
      const updated = prev.filter(t => t.id !== id);
      syncSectionToCloud('testimonials', { data: updated });
      return updated;
    });
  };

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) => {
    setTestimonials(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, ...updates } : t);
      syncSectionToCloud('testimonials', { data: updated });
      return updated;
    });
  };

  const addNotice = (notice: Omit<SiteNotice, 'id'>) => {
    const newNotice: SiteNotice = {
      ...notice,
      id: `not-${Date.now()}`
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const toggleNotice = (id: string) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, active: !n.active } : n));
  };

  const addSubmission = async (sub: Omit<ContactSubmission, 'id' | 'timestamp' | 'status'>) => {
    const newSub: ContactSubmission = {
      ...sub,
      id: `sub-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      status: 'New'
    };
    setSubmissions(prev => [newSub, ...prev]);
    try {
      await setDoc(doc(db, 'inquiries', newSub.id), newSub);
    } catch (err) {
      console.error("Error writing submission to Firestore:", err);
    }
  };

  const updateSubmissionStatus = async (id: string, status: ContactSubmission['status']) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    try {
      await updateDoc(doc(db, 'inquiries', id), { status });
    } catch (err) {
      console.error("Error updating submission status in Firestore:", err);
    }
  };

  const setHeroBgUrl = async (url: string) => {
    const safeUrl = (await ensureSafeImageSize(url)) || url;
    setHeroBgUrlState(safeUrl);
    syncSectionToCloud('branding', { heroBgUrl: safeUrl });
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}heroBg`, safeUrl);
    } catch (e) {
      console.warn("Storage save error", e);
    }
  };

  const setLogoUrl = async (url: string | null) => {
    const safeUrl = await ensureSafeImageSize(url);
    setLogoUrlState(safeUrl);
    syncSectionToCloud('branding', { logoUrl: safeUrl });
    try {
      if (safeUrl) {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}logo`, safeUrl);
      } else {
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}logo`);
      }
    } catch (e) {
      console.warn("Storage save error", e);
    }
  };

  const resetToDefaults = () => {
    if (confirm("Reset all website settings, photos and content to original defaults?")) {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      setOrgInfo(defaultOrgInfo);
      setFounder(defaultFounder);
      setPrograms(defaultPrograms);
      setFacilities(defaultFacilities);
      setGallery(defaultGallery);
      setVideos(defaultVideos);
      setTestimonials(defaultTestimonials);
      setNotices(defaultNotices);
      setSubmissions([]);
      setHeroBgUrlState('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1920&q=85');
      setLogoUrlState(null);
      setAboutData(defaultAboutData);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        orgInfo,
        setOrgInfo,
        updateOrgInfo,
        founder,
        setFounder,
        updateFounder,
        setFounderPhoto,
        programs,
        setPrograms,
        updateProgram,
        facilities,
        setFacilities,
        updateFacility,
        addFacility,
        deleteFacility,
        gallery,
        addGalleryPhoto,
        deleteGalleryPhoto,
        updateGalleryPhoto,
        videos,
        addVideo,
        deleteVideo,
        updateVideo,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        updateTestimonial,
        recoverySteps: defaultRecoverySteps,
        notices,
        addNotice,
        deleteNotice,
        toggleNotice,
        submissions,
        addSubmission,
        updateSubmissionStatus,
        heroBgUrl,
        setHeroBgUrl,
        logoUrl,
        setLogoUrl,
        aboutData,
        updateAboutData,
        resetToDefaults
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

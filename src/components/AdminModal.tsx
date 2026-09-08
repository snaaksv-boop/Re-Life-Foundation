import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import {
  X,
  Settings,
  Image as ImageIcon,
  Video,
  User,
  Phone,
  FileText,
  Star,
  Trash2,
  Plus,
  RotateCcw,
  Check,
  Upload,
  Mail,
  Building,
  Layers,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  ShieldCheck,
  Sliders,
  Play,
  Link2,
  AlertCircle
} from 'lucide-react';
import { GalleryPhoto, VideoItem, Testimonial, TreatmentProgram, FacilityItem } from '../types';
import { compressImage } from '../lib/imageUtils';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
  initialTab?: string;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  defaultTab,
  initialTab
}) => {
  const {
    orgInfo,
    updateOrgInfo,
    founder,
    updateFounder,
    setFounderPhoto,
    programs,
    updateProgram,
    facilities,
    updateFacility,
    addFacility,
    deleteFacility,
    gallery,
    addGalleryPhoto,
    deleteGalleryPhoto,
    videos,
    addVideo,
    updateVideo,
    deleteVideo,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    submissions,
    updateSubmissionStatus,
    heroBgUrl,
    setHeroBgUrl,
    logoUrl,
    setLogoUrl,
    aboutData,
    updateAboutData,
    resetToDefaults
  } = useContent();

  const activeInitialTab = defaultTab || initialTab || 'about';
  const [activeTab, setActiveTab] = useState<string>(activeInitialTab);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('relife_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminCreds, setAdminCreds] = useState(() => {
    try {
      const saved = localStorage.getItem('relife_admin_creds');
      return saved ? JSON.parse(saved) : { username: 'admin', password: 'relife2025' };
    } catch {
      return { username: 'admin', password: 'relife2025' };
    }
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Password change state in Security tab
  const [newUsername, setNewUsername] = useState(adminCreds.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [securityError, setSecurityError] = useState('');

  // Form states
  const [aboutForm, setAboutForm] = useState({ ...aboutData });
  const [aboutSaved, setAboutSaved] = useState(false);
  const aboutPosterRef = useRef<HTMLInputElement>(null);
  const aboutVideoFileRef = useRef<HTMLInputElement>(null);

  const [generalForm, setGeneralForm] = useState({ ...orgInfo });
  const [generalSaved, setGeneralSaved] = useState(false);

  const [founderForm, setFounderForm] = useState({
    name: founder.name,
    title: founder.title,
    quote: founder.quote,
    message: founder.message,
    photoUrl: founder.photoUrl
  });
  const [founderSaved, setFounderSaved] = useState(false);
  const founderFileRef = useRef<HTMLInputElement>(null);

  const heroFileRef = useRef<HTMLInputElement>(null);
  const logoFileRef = useRef<HTMLInputElement>(null);

  // Sync state if orgInfo/aboutData/founder updates
  useEffect(() => {
    setAboutForm({ ...aboutData });
  }, [aboutData]);

  useEffect(() => {
    setGeneralForm({ ...orgInfo });
  }, [orgInfo]);

  useEffect(() => {
    setFounderForm({
      name: founder.name,
      title: founder.title,
      quote: founder.quote,
      message: founder.message,
      photoUrl: founder.photoUrl
    });
  }, [founder]);

  useEffect(() => {
    if (defaultTab || initialTab) {
      setActiveTab(defaultTab || initialTab || 'about');
    }
  }, [defaultTab, initialTab]);

  // Gallery photo state
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Centre' as GalleryPhoto['category'],
    description: '',
    date: '2025',
    imageUrl: ''
  });
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const photoFileRef = useRef<HTMLInputElement>(null);

  // Video item state
  const [newVideo, setNewVideo] = useState({
    title: '',
    category: 'Overview',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    duration: '3:30'
  });
  const newVideoFileRef = useRef<HTMLInputElement>(null);
  const newVideoThumbRef = useRef<HTMLInputElement>(null);

  // Facility photo upload
  const facilityFileInputRef = useRef<HTMLInputElement>(null);
  const newFacilityFileInputRef = useRef<HTMLInputElement>(null);
  const [activeFacilityIdForUpload, setActiveFacilityIdForUpload] = useState<string | null>(null);
  const [facilityStatusMessage, setFacilityStatusMessage] = useState<string>('');
  const [showAddFacilityForm, setShowAddFacilityForm] = useState(false);
  const [newFacilityTitle, setNewFacilityTitle] = useState('');
  const [newFacilityImageUrl, setNewFacilityImageUrl] = useState('');

  // Founder photo URL input
  const [founderPhotoUrlInput, setFounderPhotoUrlInput] = useState('');
  const [videoUploadStatus, setVideoUploadStatus] = useState<string>('');
  const [galleryStatusMessage, setGalleryStatusMessage] = useState<string>('');
  const [photoToDelete, setPhotoToDelete] = useState<GalleryPhoto | null>(null);

  // Testimonial state
  const [newTestimonial, setNewTestimonial] = useState({
    author: '',
    relationship: 'Family Member',
    content: '',
    rating: 5,
    date: 'Current'
  });

  if (!isOpen) return null;

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const enteredUser = usernameInput.trim();
    const enteredPass = passwordInput.trim();

    if (enteredUser === adminCreds.username && enteredPass === adminCreds.password) {
      setIsAuthenticated(true);
      try {
        localStorage.setItem('relife_admin_auth', 'true');
      } catch (err) {
        console.warn('Could not save auth state', err);
      }
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('relife_admin_auth');
    } catch (err) {
      console.warn('Could not remove auth state', err);
    }
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleAutofillDemo = () => {
    setUsernameInput(adminCreds.username);
    setPasswordInput(adminCreds.password);
    setLoginError('');
  };

  // Change Password / Security handler
  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError('');
    setSecuritySuccess('');

    if (currentPassword !== adminCreds.password) {
      setSecurityError('Current password does not match.');
      return;
    }

    if (!newUsername.trim()) {
      setSecurityError('Username cannot be empty.');
      return;
    }

    const updatedCreds = {
      username: newUsername.trim(),
      password: newPassword.trim() ? newPassword.trim() : adminCreds.password
    };

    setAdminCreds(updatedCreds);
    try {
      localStorage.setItem('relife_admin_creds', JSON.stringify(updatedCreds));
      setSecuritySuccess('Credentials updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      setSecurityError('Failed to save credentials.');
    }
  };

  // About & Video save handler
  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutData(aboutForm);
    setAboutSaved(true);
    setTimeout(() => setAboutSaved(false), 3000);
  };

  // General settings save handler
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrgInfo(generalForm);
    setGeneralSaved(true);
    setTimeout(() => setGeneralSaved(false), 3000);
  };

  // Founder profile save handler
  const handleSaveFounder = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateFounder(founderForm);
    setFounderSaved(true);
    setTimeout(() => setFounderSaved(false), 3000);
  };

  // File upload helper with automatic image compression to preserve storage and Firestore doc limits (<50KB)
  const handleFileUpload = async (file: File, callback: (result: string) => void) => {
    try {
      const compressed = await compressImage(file, 640, 640, 0.65);
      callback(compressed);
    } catch (err) {
      console.warn("Image compression failed, using fallback reader", err);
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          try {
            const comp = await compressImage(e.target.result as string, 640, 640, 0.65);
            callback(comp);
          } catch {
            callback(e.target.result as string);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Video upload helper supporting MP4/WebM files
  const handleVideoUpload = (file: File, callback: (result: string) => void) => {
    // If small video clip (< 750KB), convert to base64 so it can persist in Firestore
    if (file.size <= 750000) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          callback(e.target.result as string);
          setVideoUploadStatus(`Video loaded (${(file.size / 1024).toFixed(0)} KB)`);
          setTimeout(() => setVideoUploadStatus(''), 4000);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // For larger video files, create a blob Object URL for smooth instant video playback
      const objUrl = URL.createObjectURL(file);
      callback(objUrl);
      setVideoUploadStatus(`Video file ready: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`);
      setTimeout(() => setVideoUploadStatus(''), 6000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in overflow-hidden">
      <div className="bg-white text-slate-900 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[#051C1A] text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-teal-900/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-800/80 flex items-center justify-center border border-teal-600/40 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg font-heading tracking-wide text-white">
                  Customized Control Panel
                </h3>
                {isAuthenticated && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Admin Active</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-teal-300/80">
                Re-Life Foundation • Video, Photos, Programs, Contacts &amp; Website Customization
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-950/70 hover:bg-rose-950/80 text-teal-200 hover:text-rose-200 text-xs font-medium border border-teal-800 hover:border-rose-700/60 transition-all"
                title="Log out of Customized Panel"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-teal-300 hover:text-white hover:bg-teal-900/60 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* BODY: If NOT authenticated, show Login Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex items-center justify-center bg-slate-50">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 sm:p-8">
              
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-teal-900 text-amber-400 mx-auto flex items-center justify-center shadow-lg border border-teal-700/50 mb-4">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 font-heading">
                  Customized Website Login
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Please enter your username and password to customize videos, photos, programs and information.
                </p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="e.g. admin"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 absolute right-3 top-2.5 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#0A413D] hover:bg-[#072f2c] active:bg-[#052422] text-white font-semibold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Sign In to Customized Panel</span>
                  </button>
                </div>
              </form>

              {/* Default Credential Helper */}
              <div className="mt-6 pt-5 border-t border-slate-100 bg-amber-50/70 -mx-6 -mb-6 p-4 rounded-b-2xl border-t border-amber-200/50">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-amber-900 block uppercase tracking-wide">
                      Default Administrator Credentials
                    </span>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Username: <strong className="font-mono text-amber-950">admin</strong> &bull; Password: <strong className="font-mono text-amber-950">relife2025</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutofillDemo}
                    className="px-2.5 py-1 text-xs font-semibold bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-lg shrink-0 transition-colors shadow-xs"
                  >
                    Auto Fill
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* BODY: Authenticated Customized Panel with Tabs */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-60 bg-slate-50 border-r border-slate-200 p-3 md:p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
              <button
                onClick={() => setActiveTab('about')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'about'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <Video className="w-4 h-4 shrink-0 text-amber-400" />
                <span>About Video &amp; Text</span>
              </button>

              <button
                onClick={() => setActiveTab('general')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'general'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>General &amp; Helpline</span>
              </button>

              <button
                onClick={() => setActiveTab('branding')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'branding'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <ImageIcon className="w-4 h-4 shrink-0" />
                <span>Hero &amp; Logo</span>
              </button>

              <button
                onClick={() => setActiveTab('founder')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'founder'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Founder (Siddik Ali)</span>
              </button>

              <button
                onClick={() => setActiveTab('programs')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'programs'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Treatment Programs</span>
              </button>

              <button
                onClick={() => setActiveTab('facilities')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'facilities'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <Building className="w-4 h-4 shrink-0" />
                <span>Facilities &amp; Rooms</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'gallery'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <Layers className="w-4 h-4 shrink-0" />
                <span>Photo Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'videos'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <Video className="w-4 h-4 shrink-0" />
                <span>Videos Section</span>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'testimonials'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <Star className="w-4 h-4 shrink-0" />
                <span>Testimonials</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'inquiries'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Inquiries</span>
                </div>
                {submissions.length > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-amber-500 text-white font-bold">
                    {submissions.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  activeTab === 'security'
                    ? 'bg-[#0A413D] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <KeyRound className="w-4 h-4 shrink-0 text-teal-700" />
                <span>Login &amp; Password</span>
              </button>

              <div className="mt-auto pt-4 hidden md:block">
                <button
                  type="button"
                  onClick={resetToDefaults}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-rose-700 hover:bg-rose-50 rounded-xl transition-colors font-medium border border-rose-200/80"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7">
              
              {/* TAB 1: ABOUT SECTION VIDEO & TEXT */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        About Us Video &amp; Content Customization
                      </h4>
                      <p className="text-xs text-slate-500">
                        Replace or customize the video in the &quot;About Re-Life Foundation&quot; section, update text, bullet points and poster.
                      </p>
                    </div>
                    {aboutSaved && (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleSaveAbout} className="space-y-4">
                    {/* Video URL, Upload & Title */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block">
                          Video Settings (Link &amp; Upload Options)
                        </span>
                        {videoUploadStatus && (
                          <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {videoUploadStatus}
                          </span>
                        )}
                      </div>

                      {/* Video Link + Video Upload button */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Video Source: Enter Link (YouTube/Vimeo/MP4) OR Upload Video File
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="relative flex-1">
                            <input
                              type="text"
                              value={aboutForm.videoUrl}
                              onChange={(e) => setAboutForm({ ...aboutForm, videoUrl: e.target.value })}
                              placeholder="Paste YouTube, Vimeo or MP4 URL (e.g. https://youtu.be/...)"
                              className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 font-mono"
                            />
                            <Link2 className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                          </div>

                          <button
                            type="button"
                            onClick={() => aboutVideoFileRef.current?.click()}
                            className="px-3.5 py-2 bg-[#0A413D] hover:bg-[#072f2c] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shrink-0 shadow-xs transition-colors"
                            title="Upload MP4 or WebM video file from device"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Video File</span>
                          </button>
                          <input
                            ref={aboutVideoFileRef}
                            type="file"
                            accept="video/mp4,video/webm,video/ogg,video/quicktime"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleVideoUpload(file, (url) => {
                                  setAboutForm({ ...aboutForm, videoUrl: url });
                                });
                              }
                            }}
                          />
                        </div>

                        <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                          • <strong>Video Link:</strong> Paste any YouTube video link (e.g. <code>https://youtube.com/watch?v=...</code>) or Vimeo / cloud video.
                          <br />
                          • <strong>Upload Video File:</strong> Click <em>Upload Video File</em> to pick an MP4/WebM video directly from your phone or computer.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Video Title
                          </label>
                          <input
                            type="text"
                            value={aboutForm.videoTitle}
                            onChange={(e) => setAboutForm({ ...aboutForm, videoTitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Video Poster / Thumbnail Image
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={aboutForm.videoPoster}
                              onChange={(e) => setAboutForm({ ...aboutForm, videoPoster: e.target.value })}
                              placeholder="Photo URL or upload image"
                              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                            />
                            <button
                              type="button"
                              onClick={() => aboutPosterRef.current?.click()}
                              className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1"
                              title="Upload poster image from device"
                            >
                              <Upload className="w-3 h-3" />
                              <span>Upload</span>
                            </button>
                            <input
                              ref={aboutPosterRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, (dataUrl) => {
                                    setAboutForm({ ...aboutForm, videoPoster: dataUrl });
                                  });
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* About Us Text Fields */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                      <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block">
                        About Content &amp; Points
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Badge Text</label>
                          <input
                            type="text"
                            value={aboutForm.badge}
                            onChange={(e) => setAboutForm({ ...aboutForm, badge: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Heading Title</label>
                          <input
                            type="text"
                            value={aboutForm.title}
                            onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Description Paragraph</label>
                        <textarea
                          rows={3}
                          value={aboutForm.description}
                          onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-700">3 Key Bullet Points</label>
                        {aboutForm.bullets.map((bullet, idx) => (
                          <input
                            key={idx}
                            type="text"
                            value={bullet}
                            onChange={(e) => {
                              const newBullets = [...aboutForm.bullets];
                              newBullets[idx] = e.target.value;
                              setAboutForm({ ...aboutForm, bullets: newBullets });
                            }}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#0A413D] hover:bg-[#072f2c] text-white font-semibold text-sm shadow-md transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save About Video &amp; Text</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: GENERAL & HELPLINE */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        General Info &amp; Contact Details
                      </h4>
                      <p className="text-xs text-slate-500">
                        Phone number, WhatsApp, registration number, address and timings.
                      </p>
                    </div>
                    {generalSaved && (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleSaveGeneral} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Organization Name</label>
                        <input
                          type="text"
                          value={generalForm.name}
                          onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Sub-Title / Tagline</label>
                        <input
                          type="text"
                          value={generalForm.tagline}
                          onChange={(e) => setGeneralForm({ ...generalForm, tagline: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / Helpline</label>
                        <input
                          type="text"
                          value={generalForm.phone}
                          onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value, phoneFormatted: `+91 ${e.target.value}` })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                        <input
                          type="text"
                          value={generalForm.whatsappNumber}
                          onChange={(e) => setGeneralForm({ ...generalForm, whatsappNumber: e.target.value, whatsappLink: `https://wa.me/${e.target.value}` })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Registration Number</label>
                        <input
                          type="text"
                          value={generalForm.registrationNo}
                          onChange={(e) => setGeneralForm({ ...generalForm, registrationNo: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Physical Address</label>
                      <input
                        type="text"
                        value={generalForm.address}
                        onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Landmark</label>
                        <input
                          type="text"
                          value={generalForm.landmark}
                          onChange={(e) => setGeneralForm({ ...generalForm, landmark: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">City &amp; State</label>
                        <input
                          type="text"
                          value={generalForm.city}
                          onChange={(e) => setGeneralForm({ ...generalForm, city: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">PIN Code</label>
                        <input
                          type="text"
                          value={generalForm.pincode}
                          onChange={(e) => setGeneralForm({ ...generalForm, pincode: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#0A413D] hover:bg-[#072f2c] text-white font-semibold text-sm shadow-md transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save General Information</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: HERO & BRANDING */}
              {activeTab === 'branding' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-3">
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      Hero Banner &amp; Logo Settings
                    </h4>
                    <p className="text-xs text-slate-500">
                      Customize the top hero banner background image and upload custom logo.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Hero Background Photo */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                      <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block">
                        Hero Banner Background Photo
                      </span>
                      <div className="relative aspect-[16/7] rounded-xl overflow-hidden bg-slate-900 max-w-lg border border-slate-300">
                        <img
                          src={heroBgUrl}
                          alt="Hero Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          type="text"
                          value={heroBgUrl}
                          onChange={(e) => setHeroBgUrl(e.target.value)}
                          placeholder="Paste image URL here"
                          className="flex-1 min-w-[200px] px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => heroFileRef.current?.click()}
                          className="px-4 py-2 bg-[#0A413D] hover:bg-[#072f2c] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Building Photo</span>
                        </button>
                        <input
                          ref={heroFileRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (dataUrl) => setHeroBgUrl(dataUrl));
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Logo Upload & Link */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                      <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block">
                        Website Custom Logo (Upload File or Paste Link)
                      </span>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-teal-950 flex items-center justify-center p-2 border border-teal-800 shrink-0">
                          {logoUrl ? (
                            <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                          ) : (
                            <span className="text-amber-400 text-xs font-bold text-center">Default Vector</span>
                          )}
                        </div>
                        <div className="flex-1 w-full space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <input
                              type="text"
                              value={logoUrl || ''}
                              onChange={(e) => setLogoUrl(e.target.value || null)}
                              placeholder="Paste logo image link (e.g. https://...)"
                              className="flex-1 min-w-[200px] px-3 py-2 rounded-xl border border-slate-300 text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => logoFileRef.current?.click()}
                              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shrink-0"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Logo</span>
                            </button>
                            {logoUrl && (
                              <button
                                type="button"
                                onClick={() => setLogoUrl(null)}
                                className="px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl border border-rose-200 shrink-0"
                              >
                                Reset
                              </button>
                            )}
                          </div>
                          <input
                            ref={logoFileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (dataUrl) => setLogoUrl(dataUrl));
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: FOUNDER PROFILE */}
              {activeTab === 'founder' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Founder Profile: Siddik Ali
                      </h4>
                      <p className="text-xs text-slate-500">
                        Upload official photo and edit Founder &amp; Director message. (Photo editing is exclusively available here in Customized panel).
                      </p>
                    </div>
                    {founderSaved && (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Check className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </span>
                    )}
                  </div>

                  <form onSubmit={handleSaveFounder} className="space-y-4">
                    {/* Photo Upload & Link Box */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center gap-5">
                      <div className="w-32 h-36 rounded-2xl bg-gradient-to-br from-amber-700/30 to-amber-900/40 border-2 border-amber-500/60 overflow-hidden flex items-center justify-center relative shadow-md shrink-0">
                        {founder.photoUrl ? (
                          <img src={founder.photoUrl} alt={founder.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center p-2">
                            <User className="w-10 h-10 text-amber-600/70 mx-auto" />
                            <span className="text-[10px] text-amber-800 font-semibold mt-1 block">No Photo</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2.5 text-center sm:text-left flex-1 w-full">
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            Founder Portrait Photo (Upload File or Paste Link)
                          </span>
                          <p className="text-xs text-slate-500 max-w-lg mt-0.5">
                            Upload a photo from your phone/computer OR paste any direct image web link.
                          </p>
                        </div>

                        {/* Photo Web Link Input */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={founderPhotoUrlInput || founder.photoUrl || ''}
                            onChange={(e) => setFounderPhotoUrlInput(e.target.value)}
                            placeholder="Paste photo link (e.g. https://...)"
                            className="flex-1 px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                          />
                          <button
                            type="button"
                            onClick={async () => {
                              if (founderPhotoUrlInput.trim()) {
                                const url = founderPhotoUrlInput.trim();
                                await setFounderPhoto(url);
                                setFounderForm(prev => ({ ...prev, photoUrl: url }));
                                setFounderPhotoUrlInput('');
                              }
                            }}
                            className="px-3 py-1.5 bg-[#0A413D] text-white text-xs font-semibold rounded-xl hover:bg-[#072f2c] shrink-0"
                          >
                            Apply Link
                          </button>
                        </div>

                        {/* Photo File Upload Button & Remove */}
                        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start pt-1">
                          <button
                            type="button"
                            onClick={() => founderFileRef.current?.click()}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Photo from Device</span>
                          </button>
                          {founder.photoUrl && (
                            <button
                              type="button"
                              onClick={async () => {
                                await setFounderPhoto(null);
                                setFounderForm(prev => ({ ...prev, photoUrl: null }));
                                setFounderPhotoUrlInput('');
                              }}
                              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200"
                            >
                              Remove Photo
                            </button>
                          )}
                          <input
                            ref={founderFileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, async (dataUrl) => {
                                  await setFounderPhoto(dataUrl);
                                  setFounderForm(prev => ({ ...prev, photoUrl: dataUrl }));
                                  setFounderPhotoUrlInput('');
                                });
                              }
                              e.target.value = '';
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Founder Name</label>
                        <input
                          type="text"
                          value={founderForm.name}
                          onChange={(e) => setFounderForm({ ...founderForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Official Title</label>
                        <input
                          type="text"
                          value={founderForm.title}
                          onChange={(e) => setFounderForm({ ...founderForm, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Inspiring Motto / Quote</label>
                      <input
                        type="text"
                        value={founderForm.quote}
                        onChange={(e) => setFounderForm({ ...founderForm, quote: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Founder&apos;s Full Message</label>
                      <textarea
                        rows={4}
                        value={founderForm.message}
                        onChange={(e) => setFounderForm({ ...founderForm, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#0A413D] hover:bg-[#072f2c] text-white font-semibold text-sm shadow-md transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save Founder Profile</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 5: TREATMENT PROGRAMS */}
              {activeTab === 'programs' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-3">
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      Treatment Programs Customization
                    </h4>
                    <p className="text-xs text-slate-500">
                      Edit the 4 core recovery programs displayed on the homepage.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {programs.map((program) => (
                      <div key={program.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-slate-900 text-sm">{program.title}</h5>
                          <span className="text-xs text-teal-800 font-mono">{program.id}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                            <input
                              type="text"
                              value={program.title}
                              onChange={(e) => updateProgram(program.id, { title: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Short Summary</label>
                            <input
                              type="text"
                              value={program.shortDesc}
                              onChange={(e) => updateProgram(program.id, { shortDesc: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Detailed Description</label>
                          <textarea
                            rows={2}
                            value={program.fullDesc}
                            onChange={(e) => updateProgram(program.id, { fullDesc: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: FACILITIES & ROOMS */}
              {activeTab === 'facilities' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 font-heading">
                        Facilities &amp; Rooms Photos (Upload &amp; Link)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Upload photos directly from your device or paste web links for the facility categories shown on the homepage. Changes appear immediately in "OUR FACILITIES"!
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddFacilityForm(!showAddFacilityForm)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0A413D] hover:bg-[#072f2c] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{showAddFacilityForm ? 'Cancel' : 'Add New Facility Photo'}</span>
                    </button>
                  </div>

                  {facilityStatusMessage && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs">
                      <span>✓ {facilityStatusMessage}</span>
                      <button onClick={() => setFacilityStatusMessage('')} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">✕</button>
                    </div>
                  )}

                  {/* Add New Facility Form */}
                  {showAddFacilityForm && (
                    <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-3">
                      <h5 className="text-xs font-bold text-teal-900 uppercase tracking-wider">
                        Add New Room / Facility Photo
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Facility / Room Title *</label>
                          <input
                            type="text"
                            placeholder="e.g. Recreation Hall, Dining Area"
                            value={newFacilityTitle}
                            onChange={(e) => setNewFacilityTitle(e.target.value)}
                            className="w-full px-3 py-2 bg-white rounded-lg border border-teal-200 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Photo URL or Upload *</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="https://... or click Upload"
                              value={newFacilityImageUrl}
                              onChange={(e) => setNewFacilityImageUrl(e.target.value)}
                              className="flex-1 px-3 py-2 bg-white rounded-lg border border-teal-200 text-xs font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => newFacilityFileInputRef.current?.click()}
                              className="px-3 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shrink-0 cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <input
                        ref={newFacilityFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, (dataUrl) => {
                              setNewFacilityImageUrl(dataUrl);
                              setFacilityStatusMessage('Photo uploaded from device. Click "Save Facility" below.');
                            });
                          }
                          e.target.value = '';
                        }}
                      />

                      {newFacilityImageUrl && (
                        <div className="w-32 h-20 rounded-lg overflow-hidden border border-teal-300 bg-white">
                          <img src={newFacilityImageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddFacilityForm(false);
                            setNewFacilityTitle('');
                            setNewFacilityImageUrl('');
                          }}
                          className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={!newFacilityTitle.trim() || !newFacilityImageUrl.trim()}
                          onClick={async () => {
                            if (!newFacilityTitle.trim() || !newFacilityImageUrl.trim()) return;
                            await addFacility({
                              title: newFacilityTitle.trim(),
                              imageUrl: newFacilityImageUrl.trim(),
                              description: 'Dedicated healing facility at Borbhiti campus.',
                              highlights: ['Safe Environment', 'Clean & Sanitized']
                            });
                            setNewFacilityTitle('');
                            setNewFacilityImageUrl('');
                            setShowAddFacilityForm(false);
                            setFacilityStatusMessage('New facility photo added successfully! Visible now in OUR FACILITIES.');
                            setTimeout(() => setFacilityStatusMessage(''), 4000);
                          }}
                          className="px-4 py-1.5 bg-[#0A413D] hover:bg-[#072f2c] text-white text-xs font-bold rounded-lg shadow-sm disabled:opacity-50 cursor-pointer"
                        >
                          Save Facility
                        </button>
                      </div>
                    </div>
                  )}

                  <input
                    ref={facilityFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && activeFacilityIdForUpload) {
                        const targetId = activeFacilityIdForUpload;
                        handleFileUpload(file, async (dataUrl) => {
                          await updateFacility(targetId, { imageUrl: dataUrl });
                          setActiveFacilityIdForUpload(null);
                          setFacilityStatusMessage('Facility photo updated successfully! Visible now in OUR FACILITIES.');
                          setTimeout(() => setFacilityStatusMessage(''), 4000);
                        });
                      }
                      e.target.value = '';
                    }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {facilities.map((fac) => (
                      <div key={fac.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative">
                          <img src={fac.imageUrl} alt={fac.title} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setActiveFacilityIdForUpload(fac.id);
                              facilityFileInputRef.current?.click();
                            }}
                            className="absolute bottom-2 right-2 px-3 py-1.5 bg-[#0A413D]/95 hover:bg-[#0A413D] text-white text-xs font-semibold rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-xs transition-transform active:scale-95 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Photo</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <label className="block text-xs font-semibold text-slate-700">Room / Facility Title</label>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete facility photo "${fac.title}"?`)) {
                                deleteFacility(fac.id);
                                setFacilityStatusMessage(`"${fac.title}" deleted.`);
                                setTimeout(() => setFacilityStatusMessage(''), 3000);
                              }
                            }}
                            className="text-rose-600 hover:text-rose-800 text-[11px] font-medium flex items-center gap-1 cursor-pointer"
                            title="Remove facility"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>

                        <input
                          type="text"
                          value={fac.title}
                          onChange={(e) => updateFacility(fac.id, { title: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium"
                        />

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Photo Link / URL</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={fac.imageUrl}
                              onChange={async (e) => {
                                const val = e.target.value;
                                await updateFacility(fac.id, { imageUrl: val });
                                setFacilityStatusMessage('Facility photo URL updated.');
                                setTimeout(() => setFacilityStatusMessage(''), 2500);
                              }}
                              placeholder="Paste photo link or use Upload button above"
                              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setActiveFacilityIdForUpload(fac.id);
                                facilityFileInputRef.current?.click();
                              }}
                              className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1 cursor-pointer"
                              title="Upload from device"
                            >
                              <Upload className="w-3 h-3" />
                              <span>Upload</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: PHOTO GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-3">
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      Photo Gallery Management (Upload &amp; Link)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Upload photos directly from your device or paste image links to add to the public gallery. New photos appear 1st!
                    </p>
                  </div>

                  {galleryStatusMessage && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-xs">
                      <span>✓ {galleryStatusMessage}</span>
                      <button onClick={() => setGalleryStatusMessage('')} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">✕</button>
                    </div>
                  )}

                  {/* Add Photo Form */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block">
                      Add New Photo
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Photo Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Dining Hall, Meditation Garden"
                          value={newPhoto.title}
                          onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                        <select
                          value={newPhoto.category}
                          onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value as GalleryPhoto['category'] })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                        >
                          <option value="Centre">Centre Building &amp; Rooms</option>
                          <option value="Counselling">Counselling &amp; Doctors</option>
                          <option value="Wellness">Yoga &amp; Wellness</option>
                          <option value="Community">Community &amp; Sessions</option>
                        </select>
                      </div>
                    </div>

                    {/* Photo Source: Link or Upload */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Photo Source: Paste Image Link OR Upload from Device
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          placeholder="Paste image web link (https://...)"
                          value={newPhoto.imageUrl}
                          onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                        />
                        <button
                          type="button"
                          onClick={() => photoFileRef.current?.click()}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shrink-0"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo</span>
                        </button>
                        <input
                          ref={photoFileRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (dataUrl) => setNewPhoto({ ...newPhoto, imageUrl: dataUrl }));
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newPhoto.title && newPhoto.imageUrl) {
                              addGalleryPhoto(newPhoto);
                              setGalleryStatusMessage(`Photo "${newPhoto.title}" added to position #1 in Gallery!`);
                              setNewPhoto({ title: '', category: 'Centre', description: '', date: '2025', imageUrl: '' });
                              setTimeout(() => setGalleryStatusMessage(''), 4500);
                            }
                          }}
                          disabled={!newPhoto.title || !newPhoto.imageUrl}
                          className="px-5 py-2 bg-[#0A413D] hover:bg-[#072f2c] text-white text-xs font-semibold rounded-xl disabled:opacity-50 shadow-xs shrink-0 cursor-pointer"
                        >
                          Add Photo to Gallery (1st Position)
                        </button>
                      </div>
                    </div>

                    {/* Photo Preview if selected */}
                    {newPhoto.imageUrl && (
                      <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-300 bg-slate-100 shrink-0">
                          <img src={newPhoto.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs text-slate-600">
                          <span className="font-semibold text-emerald-700 block">Photo ready to add!</span>
                          <span className="text-[11px] text-slate-400 truncate max-w-xs block font-mono">
                            {newPhoto.imageUrl.startsWith('data:') ? 'Image uploaded from device' : newPhoto.imageUrl}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Existing Gallery Grid with Prominent Delete Option */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800 block">
                        Current Gallery ({gallery.length} Photos — #1 appears first)
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Click red "Delete" to remove any photo
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {gallery.map((img, idx) => {
                        const isNew = img.createdAt || (img.id.startsWith('gal-') && !img.id.match(/^gal-[1-8]$/));
                        return (
                          <div key={img.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between transition-all hover:border-slate-300">
                            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group">
                              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              
                              {/* Position Badge: #1, #2, etc. */}
                              <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs ${
                                  idx === 0 
                                    ? 'bg-emerald-600 text-white ring-2 ring-white' 
                                    : 'bg-slate-900/80 text-white backdrop-blur-xs'
                                }`}>
                                  #{idx + 1} {idx === 0 ? '(1st)' : ''}
                                </span>
                                {isNew && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shadow-xs">
                                    NEW
                                  </span>
                                )}
                              </div>

                              {/* Corner Delete Button - ALWAYS VISIBLE */}
                              <button
                                type="button"
                                onClick={() => setPhotoToDelete(img)}
                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer z-10"
                                title="Delete this photo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Card Details & Clear Delete Button */}
                            <div className="p-2.5 space-y-2 flex-1 flex flex-col justify-between">
                              <div>
                                <span className="text-[9px] uppercase font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 inline-block mb-1">
                                  {img.category}
                                </span>
                                <p className="font-bold text-slate-900 text-xs line-clamp-1" title={img.title}>
                                  {img.title}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => setPhotoToDelete(img)}
                                className="w-full py-1.5 px-2 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 hover:border-rose-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete Photo</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Photo Deletion Confirmation Dialog */}
                  {photoToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
                      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                          <Trash2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base font-heading">Delete Photo?</h4>
                          <p className="text-xs text-slate-600 mt-1">
                            Are you sure you want to permanently delete this photo from the gallery?
                          </p>
                          <p className="text-xs font-bold text-slate-900 mt-2 line-clamp-2">
                            "{photoToDelete.title}"
                          </p>
                        </div>
                        <div className="w-28 h-28 mx-auto rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                          <img src={photoToDelete.imageUrl} alt={photoToDelete.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setPhotoToDelete(null)}
                            className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              deleteGalleryPhoto(photoToDelete.id);
                              setGalleryStatusMessage(`Photo "${photoToDelete.title}" deleted.`);
                              setPhotoToDelete(null);
                              setTimeout(() => setGalleryStatusMessage(''), 3000);
                            }}
                            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer active:scale-95"
                          >
                            Yes, Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 8: VIDEOS SECTION */}
              {activeTab === 'videos' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-3">
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      Videos Section Management (Upload &amp; Link)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Upload video files or paste video links (YouTube, Vimeo, MP4) for the cards shown on the homepage.
                    </p>
                  </div>

                  {/* Add New Video Form */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block">
                        Add New Video Card
                      </span>
                      {videoUploadStatus && (
                        <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {videoUploadStatus}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Video Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Centre Walkthrough &amp; Patient Care"
                          value={newVideo.title}
                          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                        <select
                          value={newVideo.category}
                          onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                        >
                          <option value="Overview">Overview</option>
                          <option value="Recovery Story">Recovery Story</option>
                          <option value="Therapy & Care">Therapy &amp; Care</option>
                          <option value="Meditation">Meditation &amp; Yoga</option>
                          <option value="Facilities">Facilities Tour</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                      <input
                        type="text"
                        placeholder="Brief summary of what this video shows"
                        value={newVideo.description}
                        onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                      />
                    </div>

                    {/* Video Source: Paste Link OR Upload File */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <label className="block text-xs font-bold text-slate-800">
                        Video Source (Paste Link OR Upload Video File) <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Paste YouTube, Vimeo or MP4 URL (e.g. https://youtu.be/...)"
                            value={newVideo.videoUrl}
                            onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                            className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700 font-mono"
                          />
                          <Link2 className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                        </div>
                        <button
                          type="button"
                          onClick={() => newVideoFileRef.current?.click()}
                          className="px-4 py-2 bg-[#0A413D] hover:bg-[#072f2c] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                          title="Upload video file from phone or computer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Video File</span>
                        </button>
                        <input
                          ref={newVideoFileRef}
                          type="file"
                          accept="video/mp4,video/webm,video/ogg,video/quicktime"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleVideoUpload(file, (url) => {
                                setNewVideo(prev => ({
                                  ...prev,
                                  videoUrl: url,
                                  title: prev.title || file.name.replace(/\.[^/.]+$/, "")
                                }));
                              });
                            }
                          }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Accepts YouTube links, Vimeo, or direct .mp4 files uploaded from your device.
                      </p>
                    </div>

                    {/* Thumbnail / Cover Photo */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <label className="block text-xs font-bold text-slate-800">
                        Cover Thumbnail Photo (Optional)
                      </label>
                      <div className="flex flex-col sm:flex-row gap-2 items-center">
                        {newVideo.thumbnailUrl && (
                          <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300">
                            <img src={newVideo.thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <input
                          type="text"
                          placeholder="Thumbnail image URL (or upload below)"
                          value={newVideo.thumbnailUrl}
                          onChange={(e) => setNewVideo({ ...newVideo, thumbnailUrl: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-teal-700"
                        />
                        <button
                          type="button"
                          onClick={() => newVideoThumbRef.current?.click()}
                          className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shrink-0"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Thumbnail</span>
                        </button>
                        <input
                          ref={newVideoThumbRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (dataUrl) => {
                                setNewVideo({ ...newVideo, thumbnailUrl: dataUrl });
                              });
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (newVideo.title && newVideo.videoUrl) {
                            addVideo({
                              ...newVideo,
                              thumbnailUrl: newVideo.thumbnailUrl || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
                            });
                            setNewVideo({
                              title: '',
                              category: 'Overview',
                              description: '',
                              videoUrl: '',
                              thumbnailUrl: '',
                              duration: '3:30'
                            });
                          }
                        }}
                        disabled={!newVideo.title || !newVideo.videoUrl}
                        className="px-6 py-2.5 rounded-xl bg-[#0A413D] hover:bg-[#072f2c] text-white text-xs font-bold shadow-md disabled:opacity-50 flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Add Video to Homepage</span>
                      </button>
                    </div>
                  </div>

                  {/* Existing Videos List & Editing */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-700">
                        Current Homepage Videos ({videos.length})
                      </span>
                    </div>

                    <div className="space-y-4">
                      {videos.map((vid) => (
                        <div key={vid.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                          <div className="flex flex-col sm:flex-row gap-4 items-start">
                            <div className="w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-slate-900 shrink-0 relative group">
                              <img src={vid.thumbnailUrl} alt={vid.title} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="w-9 h-9 rounded-full bg-amber-500/95 text-white flex items-center justify-center shadow-md">
                                  <Play className="w-4 h-4 fill-current ml-0.5" />
                                </div>
                              </div>
                              <span className="absolute bottom-1.5 right-1.5 bg-black/75 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                                {vid.duration || '3:30'}
                              </span>
                            </div>

                            <div className="flex-1 space-y-2 w-full">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span className="inline-block text-[10px] font-bold text-amber-700 uppercase bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md mb-1">
                                    {vid.category}
                                  </span>
                                  <h5 className="font-bold text-slate-900 text-sm">{vid.title}</h5>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => deleteVideo(vid.id)}
                                  className="p-2 text-rose-600 hover:bg-rose-100/70 rounded-xl shrink-0 transition-colors"
                                  title="Delete Video"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <p className="text-xs text-slate-600 line-clamp-2">{vid.description}</p>
                              
                              {/* Video Link display & edit */}
                              <div className="pt-1 space-y-1.5">
                                <label className="block text-[11px] font-semibold text-slate-600">Video Link / Source URL</label>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={vid.videoUrl}
                                    onChange={(e) => updateVideo(vid.id, { videoUrl: e.target.value })}
                                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                                    placeholder="Paste new video URL or YouTube link"
                                  />
                                </div>
                              </div>

                              {/* Thumbnail URL edit */}
                              <div className="space-y-1">
                                <label className="block text-[11px] font-semibold text-slate-600">Thumbnail Image URL</label>
                                <input
                                  type="text"
                                  value={vid.thumbnailUrl}
                                  onChange={(e) => updateVideo(vid.id, { thumbnailUrl: e.target.value })}
                                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                                  placeholder="Paste thumbnail image URL"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 9: TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-3">
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      Testimonials &amp; Recovery Stories
                    </h4>
                    <p className="text-xs text-slate-500">
                      Manage reviews from recovered residents and grateful family members.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {testimonials.map((test) => (
                      <div key={test.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <strong className="text-sm font-bold text-slate-900">{test.author}</strong>
                            <span className="text-xs text-slate-500 ml-2">({test.relationship})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteTestimonial(test.id)}
                            className="text-rose-600 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-700 italic">&ldquo;{test.content}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 10: INQUIRIES / LEADS */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-3">
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      Confidential Inquiries &amp; Consultations ({submissions.length})
                    </h4>
                    <p className="text-xs text-slate-500">
                      Requests submitted by families or patients through the website contact forms.
                    </p>
                  </div>

                  {submissions.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
                      No inquiries received yet. When visitors submit the &quot;Request Confidential Help&quot; form, their contact details will appear here.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submissions.map((sub) => (
                        <div key={sub.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-bold text-slate-900 text-sm">{sub.name}</h5>
                              <p className="text-xs text-teal-800 font-semibold">{sub.phone} &bull; {sub.email || 'No email'}</p>
                            </div>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              sub.status === 'new' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                            }`}>
                              {sub.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                            {sub.message}
                          </p>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                            <span>Received: {new Date(sub.timestamp).toLocaleString()}</span>
                            {sub.status === 'new' && (
                              <button
                                type="button"
                                onClick={() => updateSubmissionStatus(sub.id, 'contacted')}
                                className="text-xs font-semibold text-teal-800 hover:underline"
                              >
                                Mark as Contacted
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 11: SECURITY & PASSWORD SETTINGS */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-3">
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      Customized Panel Security &amp; Credentials
                    </h4>
                    <p className="text-xs text-slate-500">
                      Update your administrator username and password to secure website editing.
                    </p>
                  </div>

                  {securitySuccess && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{securitySuccess}</span>
                    </div>
                  )}

                  {securityError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                      <span>{securityError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveSecurity} className="max-w-md space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Administrator Username
                      </label>
                      <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Current Password (Required to make changes)
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        New Password (Leave blank to keep current)
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#0A413D] hover:bg-[#072f2c] text-white font-semibold text-sm shadow-md transition-colors flex items-center gap-2"
                      >
                        <KeyRound className="w-4 h-4" />
                        <span>Update Credentials</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

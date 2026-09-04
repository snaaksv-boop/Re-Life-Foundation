import { OrganizationInfo, FounderInfo, TreatmentProgram, FacilityItem, GalleryPhoto, VideoItem, Testimonial, RecoveryStep, SiteNotice } from '../types';

export const defaultOrgInfo: OrganizationInfo = {
  name: "RE-LIFE FOUNDATION",
  tagline: "Rehabilitation & De-Addiction Centre",
  subTagline: "Compassionate care and support for alcohol & drug rehabilitation. We walk with you every step of the way.",
  phone: "9394420255",
  phoneFormatted: "+91 9394420255",
  whatsappNumber: "919394420255",
  whatsappLink: "https://wa.me/919394420255",
  email: "help@relifefoundation.in",
  address: "Near Nidan Hospital, Opposite Jatiya Bidyalaya, Borbhiti, Nagaon, Assam",
  landmark: "Near Nidan Hospital, Opposite Jatiya Bidyalaya",
  city: "Borbhiti, Nagaon",
  state: "Assam",
  pincode: "781002",
  registrationNo: "2025/IGR015/4/701",
  hours: "24 Hours Emergency & Help Helpline",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    whatsapp: "https://wa.me/919394420255"
  }
};

export const defaultFounder: FounderInfo = {
  name: "Siddik Ali",
  title: "Founder & Director",
  organization: "Re-Life Foundation",
  quote: "Compassion. Respect. Second Chances.",
  message: "Recovery begins with compassion, understanding and the courage to take the first step. Every individual struggling with substance dependency deserves dignity, empathy, and structured guidance to rebuild their life, repair family bonds, and step forward into a healthier future.",
  photoUrl: null // Intentional placeholder as requested: allows admin/user to upload direct photo anytime
};

export const defaultPrograms: TreatmentProgram[] = [
  {
    id: "prog-1",
    title: "Addiction Recovery",
    shortDesc: "Structured support designed to help individuals begin their recovery journey.",
    fullDesc: "Our comprehensive addiction recovery program provides a safe, substance-free environment where individuals overcome physical dependency through evidence-informed protocols, structured daily habits, and peer support.",
    iconName: "heart-handshake",
    features: [
      "Initial detoxification & safe transition",
      "Round-the-clock supportive supervision",
      "Structured relapse-prevention protocols",
      "Daily routine restoration & personal care"
    ]
  },
  {
    id: "prog-2",
    title: "Counselling",
    shortDesc: "One-on-one and group counselling focused on emotional and psychological wellbeing.",
    fullDesc: "Experienced mental health counsellors work closely with each individual to identify triggers, resolve underlying trauma, rebuild self-esteem, and establish healthy coping mechanisms without reliance on substances.",
    iconName: "users",
    features: [
      "Individual one-on-one psychological counselling",
      "Structured interactive group therapy",
      "Cognitive & behavioral restructuring",
      "Conflict resolution & emotional regulation"
    ]
  },
  {
    id: "prog-3",
    title: "Medical Support",
    shortDesc: "Professional health assessment, monitoring and appropriate medical support.",
    fullDesc: "Regular physical health check-ups, vital signs tracking, nutritional replenishment, and coordination with qualified medical practitioners to ensure safe, comfortable withdrawal management.",
    iconName: "stethoscope",
    features: [
      "Comprehensive medical evaluation upon entry",
      "Regular health & vital signs monitoring",
      "Nutritious, balanced recovery diet plan",
      "Coordination with nearby medical specialists"
    ]
  },
  {
    id: "prog-4",
    title: "Yoga & Wellness",
    shortDesc: "Yoga, physical activities, relaxation and wellness practices to support recovery.",
    fullDesc: "Restoring mind-body harmony through guided morning yoga, pranayama (breathwork), meditation, light physical exercise, and recreational activities that naturally elevate mood and reduce cravings.",
    iconName: "flower2",
    features: [
      "Daily guided morning yoga & stretching",
      "Pranayama breathing techniques for anxiety",
      "Guided mindfulness & evening meditation",
      "Indoor games & healthy recreational habits"
    ]
  }
];

export const defaultRecoverySteps: RecoveryStep[] = [
  {
    step: "01",
    title: "Assessment",
    subtitle: "Understanding the individual's needs",
    description: "Detailed medical, psychological, and lifestyle evaluation to craft a customized recovery path."
  },
  {
    step: "02",
    title: "Counselling",
    subtitle: "Building awareness & motivation",
    description: "Empathetic counselling to address emotional barriers and awaken the personal resolve to change."
  },
  {
    step: "03",
    title: "Structured Recovery",
    subtitle: "Creating healthy daily routines",
    description: "A disciplined, peaceful environment establishing positive sleeping, eating, and living habits."
  },
  {
    step: "04",
    title: "Wellness",
    subtitle: "Yoga, exercise & healthy practices",
    description: "Restoring physical vitality, reducing mental stress, and balancing nervous system health."
  },
  {
    step: "05",
    title: "Family & Social Support",
    subtitle: "Reconnecting positive bonds",
    description: "Guided family sessions to heal broken trust, educate loved ones, and prepare a supportive home."
  },
  {
    step: "06",
    title: "Continuing Support",
    subtitle: "Long-term relapse prevention",
    description: "Ongoing check-ins, alumni meetings, and community encouragement for lasting sobriety."
  }
];

export const defaultFacilities: FacilityItem[] = [
  {
    id: "fac-1",
    title: "Rehabilitation Centre",
    description: "A calm, secure and dedicated campus in Borbhiti, Nagaon, providing a distraction-free sanctuary for healing.",
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Secure campus", "Natural ventilation", "24/7 care", "Peaceful surroundings"]
  },
  {
    id: "fac-2",
    title: "Accommodation / Rooms",
    description: "Dignified, clean and well-ventilated living quarters with comfortable beds and personal storage space.",
    imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Clean bedding", "Daily sanitization", "Continuous water supply", "Orderly atmosphere"]
  },
  {
    id: "fac-3",
    title: "Counselling Area",
    description: "Private, sound-insulated counselling room providing a safe space for confidential one-on-one sessions.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80",
    highlights: ["100% Confidential", "Empathetic psychologists", "Calm ambiance", "Record privacy"]
  },
  {
    id: "fac-4",
    title: "Group Session Area",
    description: "Spacious community hall designed for daily morning assemblies, peer support groups, and awareness discussions.",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Group discussions", "Audio-visual aids", "Peer sharing circle", "Inspirational sessions"]
  },
  {
    id: "fac-5",
    title: "Yoga & Wellness Space",
    description: "Dedicated hall with green yoga mats and natural light for morning asanas, meditation, and breath therapy.",
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Certified yoga trainer", "Pranayama therapy", "Mind-calming space", "Daily routine"]
  },
  {
    id: "fac-6",
    title: "Medical / Health Support Area",
    description: "Dedicated health station with monitoring equipment, first aid, and regular physician oversight.",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
    highlights: ["Vital monitoring", "First-aid ready", "Physician visits", "Health records"]
  }
];

export const defaultGallery: GalleryPhoto[] = [
  {
    id: "gal-1",
    title: "Re-Life Foundation Building & Main Entrance",
    category: "Centre",
    description: "Main centre building with welcoming portico and secure gated premises in Borbhiti, Nagaon, Assam.",
    date: "2025",
    imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-2",
    title: "Individual Counselling & Assessment Session",
    category: "Counselling",
    description: "Dedicated counsellor conducting a private assessment session with clients.",
    date: "2025",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-3",
    title: "Community Group Awareness Meeting",
    category: "Activities",
    description: "Residents gathered in the main hall for peer motivation and recovery discussions.",
    date: "2025",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-4",
    title: "Morning Yoga & Meditation on Green Mats",
    category: "Wellness",
    description: "Daily holistic yoga and pranayama exercise for mental balance and craving control.",
    date: "2025",
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-5",
    title: "Residential Accommodation & Resting Ward",
    category: "Accommodation",
    description: "Clean, hygienic and comfortable sleeping area with structured living standards.",
    date: "2025",
    imageUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-6",
    title: "Group Study & Educational Awareness Session",
    category: "Activities",
    description: "Collaborative study session on understanding addiction and life skills.",
    date: "2025",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-7",
    title: "Family Counseling & Reconnection Day",
    category: "Events",
    description: "Guiding family members through supportive communication and healthy boundaries.",
    date: "2025",
    imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gal-8",
    title: "Health & Vital Monitoring Station",
    category: "Centre",
    description: "Regular check-ups ensuring every resident maintains stable physical vitals.",
    date: "2025",
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
  }
];

export const defaultVideos: VideoItem[] = [
  {
    id: "vid-1",
    title: "Re-Life Foundation Overview",
    description: "A virtual walkthrough of our rehabilitation centre in Borbhiti, Nagaon, Assam.",
    category: "Overview",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Embeddable standard format
    thumbnailUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80",
    duration: "3:45"
  },
  {
    id: "vid-2",
    title: "Care & Support at Our Centre",
    description: "Discover our daily structured routine, compassionate counselling, and supportive atmosphere.",
    category: "Care",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    duration: "4:12"
  },
  {
    id: "vid-3",
    title: "Yoga & Wellness Sessions",
    description: "How morning meditation and yoga help restore neurochemical balance during recovery.",
    category: "Wellness",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    duration: "2:50"
  },
  {
    id: "vid-4",
    title: "Group Awareness & Peer Session",
    description: "Real reflections on overcoming stigma and building brotherhood in sobriety.",
    category: "Activities",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    duration: "3:15"
  }
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "test-1",
    author: "R. Borah",
    relationship: "Family Member (Father)",
    content: "When my son fell into substance abuse, our family felt helpless. The team at Re-Life Foundation provided not only medical safety but genuine human compassion. Today my son is back home, working and smiling again. Forever grateful to Siddik Ali and the dedicated staff.",
    rating: 5,
    date: "January 2025"
  },
  {
    id: "test-2",
    author: "M. Ahmed",
    relationship: "Resident in Recovery",
    content: "The environment here is unlike anywhere else. There is zero stigma and total respect. The counsellors listened to my pain without judgment, and the daily yoga gave me back my sleep and mental peace. Re-Life gave me my second chance at living.",
    rating: 5,
    date: "December 2024"
  },
  {
    id: "test-3",
    author: "P. Saikia",
    relationship: "Family Member (Sister)",
    content: "Re-Life Foundation kept us informed every week about my brother's progress. The family counselling helped us understand his struggle and how to support him post-recovery. Nagaon is fortunate to have such a dedicated centre.",
    rating: 5,
    date: "November 2024"
  }
];

export const defaultNotices: SiteNotice[] = [
  {
    id: "not-1",
    title: "24/7 Helpline Active",
    content: "Our admissions helpline (9394420255) is available 24 hours a day for immediate crisis support and confidential family consultations.",
    date: "March 2026",
    active: true
  }
];

export const defaultAboutData = {
  title: "About Re-Life Foundation",
  badge: "ABOUT US",
  description: "Re-Life Foundation is a trusted rehabilitation and de-addiction centre located in Borbhiti, Nagaon, Assam. We provide a safe, supportive and structured environment for individuals struggling with alcohol and drug addiction.",
  bullets: [
    "Personalized care and evidence-informed approach",
    "Holistic healing for mind, body and spirit",
    "Respect, dignity and a second chance at life"
  ],
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  videoPoster: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
  videoTitle: "Re-Life Foundation Centre Walkthrough & Resident Healing Journey"
};

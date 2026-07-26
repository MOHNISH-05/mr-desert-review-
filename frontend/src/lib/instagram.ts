export interface InstagramPost {
  id: string;
  businessSlug: string;
  businessName: string;
  handle: string;
  accountUrl: string;
  permalink: string;
  mediaUrl: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  timestamp: string;
  formattedDate: string;
}

export interface InstagramAccountInfo {
  handle: string;
  accountUrl: string;
  businessName: string;
  followersCount: string;
  postsCount: number;
}

export const INSTAGRAM_ACCOUNTS: Record<string, InstagramAccountInfo> = {
  "mr-desert": {
    handle: "mrdesertjaisalmer",
    accountUrl: "https://www.instagram.com/mrdesertjaisalmer/",
    businessName: "Mr. Desert Jaisalmer",
    followersCount: "12.4K",
    postsCount: 348,
  },
  "elite-castle": {
    handle: "the_elite_castle",
    accountUrl: "https://www.instagram.com/the_elite_castle/",
    businessName: "Elite Castle Jaisalmer",
    followersCount: "9.8K",
    postsCount: 215,
  },
  "happy-adventure-camp": {
    handle: "happy_adventure_camp_jaisalmer",
    accountUrl: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
    businessName: "Happy Adventure Camp Jaisalmer",
    followersCount: "15.2K",
    postsCount: 412,
  },
  "happy-adventure": {
    handle: "happy_adventure_camp_jaisalmer",
    accountUrl: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
    businessName: "Happy Adventure Camp Jaisalmer",
    followersCount: "15.2K",
    postsCount: 412,
  },
  "elite-india-tour-planner": {
    handle: "eliteindiatourplanner",
    accountUrl: "https://www.instagram.com/eliteindiatourplanner/",
    businessName: "Elite India Tour Planner",
    followersCount: "8.6K",
    postsCount: 189,
  },
  "tour-planner": {
    handle: "eliteindiatourplanner",
    accountUrl: "https://www.instagram.com/eliteindiatourplanner/",
    businessName: "Elite India Tour Planner",
    followersCount: "8.6K",
    postsCount: 189,
  },
};

export const INSTAGRAM_POSTS_DATABASE: Record<string, InstagramPost[]> = {
  "mr-desert": [
    {
      id: "ig-md-1",
      businessSlug: "mr-desert",
      businessName: "Mr. Desert Jaisalmer",
      handle: "mrdesertjaisalmer",
      accountUrl: "https://www.instagram.com/mrdesertjaisalmer/",
      permalink: "https://www.instagram.com/mrdesertjaisalmer/",
      mediaUrl: "/businesses/mr-desert/6-scaled-e1756826347412.webp",
      caption: "Sunset magic over the golden sand dunes of Sam. Experiencing Rajasthan at its finest with Mr. Desert 🌅✨ #Jaisalmer #MrDesert #SamSandDunes",
      likesCount: 482,
      commentsCount: 34,
      timestamp: "2026-02-22T17:30:00Z",
      formattedDate: "Feb 22, 2026",
    },
    {
      id: "ig-md-2",
      businessSlug: "mr-desert",
      businessName: "Mr. Desert Jaisalmer",
      handle: "mrdesertjaisalmer",
      accountUrl: "https://www.instagram.com/mrdesertjaisalmer/",
      permalink: "https://www.instagram.com/mrdesertjaisalmer/",
      mediaUrl: "/businesses/mr-desert/IMG-20250826-WA0122_1024x683.webp",
      caption: "Exploring the historic golden lanes of Jaisalmer Fort. Walking through centuries of royal Rajasthani heritage 🕌🏰 #GoldenCity #SonarQila",
      likesCount: 395,
      commentsCount: 22,
      timestamp: "2026-02-20T11:15:00Z",
      formattedDate: "Feb 20, 2026",
    },
    {
      id: "ig-md-3",
      businessSlug: "mr-desert",
      businessName: "Mr. Desert Jaisalmer",
      handle: "mrdesertjaisalmer",
      accountUrl: "https://www.instagram.com/mrdesertjaisalmer/",
      permalink: "https://www.instagram.com/mrdesertjaisalmer/",
      mediaUrl: "/businesses/mr-desert/mr-desert.jpg",
      caption: "Authentic hospitality and warm smiles. Welcoming travelers from around the globe to the heart of the Thar Desert 🐪💛 #RajasthanTourism",
      likesCount: 521,
      commentsCount: 41,
      timestamp: "2026-02-18T14:45:00Z",
      formattedDate: "Feb 18, 2026",
    },
    {
      id: "ig-md-4",
      businessSlug: "mr-desert",
      businessName: "Mr. Desert Jaisalmer",
      handle: "mrdesertjaisalmer",
      accountUrl: "https://www.instagram.com/mrdesertjaisalmer/",
      permalink: "https://www.instagram.com/mrdesertjaisalmer/",
      mediaUrl: "/businesses/mr-desert/mr-desert-story.jpg",
      caption: "Golden hour sunset rides across the Thar dunes. Memories created with Dheeraj Purohit & team 🏜️📸 #DesertSafari #SunsetTravel",
      likesCount: 614,
      commentsCount: 53,
      timestamp: "2026-02-15T18:00:00Z",
      formattedDate: "Feb 15, 2026",
    },
    {
      id: "ig-md-5",
      businessSlug: "mr-desert",
      businessName: "Mr. Desert Jaisalmer",
      handle: "mrdesertjaisalmer",
      accountUrl: "https://www.instagram.com/mrdesertjaisalmer/",
      permalink: "https://www.instagram.com/mrdesertjaisalmer/",
      mediaUrl: "/businesses/mr-desert/6-scaled-e1756826347412.webp",
      caption: "Starry nights and bonfire folk dance performances at our luxury desert camps ⭐🔥 #TharDesert #FolkDance #CulturalNight",
      likesCount: 430,
      commentsCount: 29,
      timestamp: "2026-02-12T20:30:00Z",
      formattedDate: "Feb 12, 2026",
    },
    {
      id: "ig-md-6",
      businessSlug: "mr-desert",
      businessName: "Mr. Desert Jaisalmer",
      handle: "mrdesertjaisalmer",
      accountUrl: "https://www.instagram.com/mrdesertjaisalmer/",
      permalink: "https://www.instagram.com/mrdesertjaisalmer/",
      mediaUrl: "/businesses/mr-desert/IMG-20250826-WA0122_1024x683.webp",
      caption: "Intricate sandstone carvings and ancient haveli details. Jaisalmer is a living museum waiting to be discovered 🏛️✨ #HavelisOfJaisalmer",
      likesCount: 388,
      commentsCount: 18,
      timestamp: "2026-02-09T09:20:00Z",
      formattedDate: "Feb 9, 2026",
    },
  ],
  "elite-castle": [
    {
      id: "ig-ec-1",
      businessSlug: "elite-castle",
      businessName: "Elite Castle Jaisalmer",
      handle: "the_elite_castle",
      accountUrl: "https://www.instagram.com/the_elite_castle/",
      permalink: "https://www.instagram.com/the_elite_castle/",
      mediaUrl: "/businesses/elite-castle/WhatsApp Image 2026-07-26 at 18.50.40.jpeg",
      caption: "Welcome to Elite Castle Jaisalmer — where royal Rajput architecture meets modern luxury 🏰💎 #EliteCastle #HeritageHotel",
      likesCount: 512,
      commentsCount: 38,
      timestamp: "2026-02-23T10:00:00Z",
      formattedDate: "Feb 23, 2026",
    },
    {
      id: "ig-ec-2",
      businessSlug: "elite-castle",
      businessName: "Elite Castle Jaisalmer",
      handle: "the_elite_castle",
      accountUrl: "https://www.instagram.com/the_elite_castle/",
      permalink: "https://www.instagram.com/the_elite_castle/",
      mediaUrl: "/businesses/elite-castle/WhatsApp Image 2026-07-26 at 18.50.43.jpeg",
      caption: "Breathtaking balcony views of Jaisalmer Golden Fort right from your room 🏰✨ #FortView #HeritageStay",
      likesCount: 429,
      commentsCount: 27,
      timestamp: "2026-02-21T12:30:00Z",
      formattedDate: "Feb 21, 2026",
    },
    {
      id: "ig-ec-3",
      businessSlug: "elite-castle",
      businessName: "Elite Castle Jaisalmer",
      handle: "the_elite_castle",
      accountUrl: "https://www.instagram.com/the_elite_castle/",
      permalink: "https://www.instagram.com/the_elite_castle/",
      mediaUrl: "/businesses/elite-castle/WhatsApp Image 2026-07-26 at 18.50.45.jpeg",
      caption: "Plush royal suites designed for maximum comfort and authentic aesthetic elegance 🛏️🌟 #LuxurySuites #JaisalmerHotel",
      likesCount: 367,
      commentsCount: 19,
      timestamp: "2026-02-19T08:45:00Z",
      formattedDate: "Feb 19, 2026",
    },
    {
      id: "ig-ec-4",
      businessSlug: "elite-castle",
      businessName: "Elite Castle Jaisalmer",
      handle: "the_elite_castle",
      accountUrl: "https://www.instagram.com/the_elite_castle/",
      permalink: "https://www.instagram.com/the_elite_castle/",
      mediaUrl: "/businesses/elite-castle/WhatsApp Image 2026-07-26 at 18.50.51.jpeg",
      caption: "Unwind in our traditional courtyard lounge with fresh chai and afternoon sun ☕🏛️ #CourtyardLounge #RajasthaniVibes",
      likesCount: 489,
      commentsCount: 32,
      timestamp: "2026-02-16T15:10:00Z",
      formattedDate: "Feb 16, 2026",
    },
    {
      id: "ig-ec-5",
      businessSlug: "elite-castle",
      businessName: "Elite Castle Jaisalmer",
      handle: "the_elite_castle",
      accountUrl: "https://www.instagram.com/the_elite_castle/",
      permalink: "https://www.instagram.com/the_elite_castle/",
      mediaUrl: "/businesses/elite-castle/WhatsApp Image 2026-07-26 at 18.50.53.jpeg",
      caption: "Rooftop dining under golden sunsets with panoramic views of the city 🌆🍽️ #RooftopDining #FortViewRestaurant",
      likesCount: 578,
      commentsCount: 46,
      timestamp: "2026-02-14T19:00:00Z",
      formattedDate: "Feb 14, 2026",
    },
    {
      id: "ig-ec-6",
      businessSlug: "elite-castle",
      businessName: "Elite Castle Jaisalmer",
      handle: "the_elite_castle",
      accountUrl: "https://www.instagram.com/the_elite_castle/",
      permalink: "https://www.instagram.com/the_elite_castle/",
      mediaUrl: "/businesses/elite-castle/elite_castle_family02.webp",
      caption: "Memorable moments with our valued guests! Thank you for choosing Elite Castle 💖🥂 #GuestStories #HappyTravelers",
      likesCount: 402,
      commentsCount: 24,
      timestamp: "2026-02-11T11:00:00Z",
      formattedDate: "Feb 11, 2026",
    },
  ],
  "happy-adventure-camp": [
    {
      id: "ig-hac-1",
      businessSlug: "happy-adventure-camp",
      businessName: "Happy Adventure Camp Jaisalmer",
      handle: "happy_adventure_camp_jaisalmer",
      accountUrl: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      permalink: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      mediaUrl: "/businesses/happy-adventure-camp/DSC02608_1024x683.webp",
      caption: "Luxury Swiss tents amidst the golden dunes of Sam. Your desert oasis awaits! 🏕️✨ #HappyAdventureCamp #SamDunes",
      likesCount: 642,
      commentsCount: 57,
      timestamp: "2026-02-23T16:20:00Z",
      formattedDate: "Feb 23, 2026",
    },
    {
      id: "ig-hac-2",
      businessSlug: "happy-adventure-camp",
      businessName: "Happy Adventure Camp Jaisalmer",
      handle: "happy_adventure_camp_jaisalmer",
      accountUrl: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      permalink: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      mediaUrl: "/businesses/happy-adventure-camp/E-1_1024x698.webp",
      caption: "Spellbinding Kalbeliya folk dance & live music around the evening campfire 🔥💃 #DesertFolkDance #CampfireNight",
      likesCount: 710,
      commentsCount: 68,
      timestamp: "2026-02-21T20:15:00Z",
      formattedDate: "Feb 21, 2026",
    },
    {
      id: "ig-hac-3",
      businessSlug: "happy-adventure-camp",
      businessName: "Happy Adventure Camp Jaisalmer",
      handle: "happy_adventure_camp_jaisalmer",
      accountUrl: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      permalink: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      mediaUrl: "/businesses/happy-adventure-camp/IMG-20251201-WA0045.webp",
      caption: "Sunset camel safari across the rolling sands of Sam. Pure tranquility! 🐪🌅 #CamelSafari #TharDesert",
      likesCount: 589,
      commentsCount: 44,
      timestamp: "2026-02-18T17:50:00Z",
      formattedDate: "Feb 18, 2026",
    },
    {
      id: "ig-hac-4",
      businessSlug: "happy-adventure-camp",
      businessName: "Happy Adventure Camp Jaisalmer",
      handle: "happy_adventure_camp_jaisalmer",
      accountUrl: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      permalink: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      mediaUrl: "/businesses/happy-adventure-camp/WhatsApp Image 2026-07-24 at 14.41.34.jpeg",
      caption: "High-octane 4x4 Jeep dune bashing in the heart of Sam Sand Dunes 🚙💨 #JeepSafari #DuneBashing #Adventure",
      likesCount: 820,
      commentsCount: 75,
      timestamp: "2026-02-15T13:40:00Z",
      formattedDate: "Feb 15, 2026",
    },
    {
      id: "ig-hac-5",
      businessSlug: "happy-adventure-camp",
      businessName: "Happy Adventure Camp Jaisalmer",
      handle: "happy_adventure_camp_jaisalmer",
      accountUrl: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      permalink: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      mediaUrl: "/businesses/happy-adventure-camp/WhatsApp Image 2026-07-24 at 14.41.33.jpeg",
      caption: "Live Rajasthani musical performances creating memories under the desert stars 🪕🌟 #RajasthaniFolk #DesertCamping",
      likesCount: 495,
      commentsCount: 31,
      timestamp: "2026-02-13T21:00:00Z",
      formattedDate: "Feb 13, 2026",
    },
    {
      id: "ig-hac-6",
      businessSlug: "happy-adventure-camp",
      businessName: "Happy Adventure Camp Jaisalmer",
      handle: "happy_adventure_camp_jaisalmer",
      accountUrl: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      permalink: "https://www.instagram.com/happy_adventure_camp_jaisalmer/",
      mediaUrl: "/businesses/happy-adventure-camp/WhatsApp Image 2026-07-24 at 14.41.40.jpeg",
      caption: "Relishing authentic Ker Sangri & Dal Baati Churma buffet under open desert skies 🍲🍷 #RajasthaniBuffet #DesertDining",
      likesCount: 532,
      commentsCount: 39,
      timestamp: "2026-02-10T20:00:00Z",
      formattedDate: "Feb 10, 2026",
    },
  ],
  "elite-india-tour-planner": [
    {
      id: "ig-tp-1",
      businessSlug: "elite-india-tour-planner",
      businessName: "Elite India Tour Planner",
      handle: "eliteindiatourplanner",
      accountUrl: "https://www.instagram.com/eliteindiatourplanner/",
      permalink: "https://www.instagram.com/eliteindiatourplanner/",
      mediaUrl: "/businesses/elite-india-tour-planner/dheeraj-purohit.webp",
      caption: "Crafting bespoke Rajasthan itineraries tailored for luxury, comfort & discovery. Guided by Dheeraj Purohit 🗺️✨ #EliteIndiaTourPlanner",
      likesCount: 465,
      commentsCount: 32,
      timestamp: "2026-02-22T09:30:00Z",
      formattedDate: "Feb 22, 2026",
    },
    {
      id: "ig-tp-2",
      businessSlug: "elite-india-tour-planner",
      businessName: "Elite India Tour Planner",
      handle: "eliteindiatourplanner",
      accountUrl: "https://www.instagram.com/eliteindiatourplanner/",
      permalink: "https://www.instagram.com/eliteindiatourplanner/",
      mediaUrl: "/businesses/elite-india-tour-planner/tour-planner-story.webp",
      caption: "Discover the wonders of Rajasthan — from Golden Forts to Royal Palaces 🏰🐫 #RajasthanTours #CustomTravel",
      likesCount: 398,
      commentsCount: 25,
      timestamp: "2026-02-19T14:15:00Z",
      formattedDate: "Feb 19, 2026",
    },
    {
      id: "ig-tp-3",
      businessSlug: "elite-india-tour-planner",
      businessName: "Elite India Tour Planner",
      handle: "eliteindiatourplanner",
      accountUrl: "https://www.instagram.com/eliteindiatourplanner/",
      permalink: "https://www.instagram.com/eliteindiatourplanner/",
      mediaUrl: "/businesses/elite-india-tour-planner/camel-safari.webp",
      caption: "Guided Thar Desert expeditions with private camel safaris and luxury desert stays 🐪🌄 #DesertExpedition #JaisalmerTours",
      likesCount: 512,
      commentsCount: 40,
      timestamp: "2026-02-16T16:45:00Z",
      formattedDate: "Feb 16, 2026",
    },
    {
      id: "ig-tp-4",
      businessSlug: "elite-india-tour-planner",
      businessName: "Elite India Tour Planner",
      handle: "eliteindiatourplanner",
      accountUrl: "https://www.instagram.com/eliteindiatourplanner/",
      permalink: "https://www.instagram.com/eliteindiatourplanner/",
      mediaUrl: "/businesses/elite-india-tour-planner/tour-fort.webp",
      caption: "Private heritage walking tour inside Sonar Qila (Jaisalmer Fort) with certified local guides 🚶‍♂️🏰 #GuidedTour",
      likesCount: 374,
      commentsCount: 21,
      timestamp: "2026-02-13T10:00:00Z",
      formattedDate: "Feb 13, 2026",
    },
    {
      id: "ig-tp-5",
      businessSlug: "elite-india-tour-planner",
      businessName: "Elite India Tour Planner",
      handle: "eliteindiatourplanner",
      accountUrl: "https://www.instagram.com/eliteindiatourplanner/",
      permalink: "https://www.instagram.com/eliteindiatourplanner/",
      mediaUrl: "/businesses/elite-india-tour-planner/tour-safari.webp",
      caption: "Unforgettable Rajasthan memories crafted with 24/7 personalized travel support 🚘✨ #TravelRajasthan #TourPlanner",
      likesCount: 445,
      commentsCount: 29,
      timestamp: "2026-02-10T15:30:00Z",
      formattedDate: "Feb 10, 2026",
    },
    {
      id: "ig-tp-6",
      businessSlug: "elite-india-tour-planner",
      businessName: "Elite India Tour Planner",
      handle: "eliteindiatourplanner",
      accountUrl: "https://www.instagram.com/eliteindiatourplanner/",
      permalink: "https://www.instagram.com/eliteindiatourplanner/",
      mediaUrl: "/businesses/elite-india-tour-planner/dheeraj-purohit.webp",
      caption: "Plan your dream India journey with the experts. Direct bookings & transparent pricing ✈️🇮🇳 #ExploreIndia",
      likesCount: 410,
      commentsCount: 26,
      timestamp: "2026-02-07T11:20:00Z",
      formattedDate: "Feb 7, 2026",
    },
  ],
};

// Aliases for slug normalization
export function normalizeSlug(slug: string): string {
  if (slug === "happy-adventure") return "happy-adventure-camp";
  if (slug === "tour-planner") return "elite-india-tour-planner";
  return slug;
}

const CACHE_KEY_PREFIX = "mr_desert_ig_cache_";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function fetchInstagramFeed(slug: string): Promise<InstagramPost[]> {
  const normSlug = normalizeSlug(slug);
  
  // Try client-side cache first
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${normSlug}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.posts)) {
          return parsed.posts;
        }
      }
    } catch (e) {
      console.warn("Instagram feed cache read error", e);
    }
  }

  // Retrieve matching posts from database
  const posts = INSTAGRAM_POSTS_DATABASE[normSlug] || INSTAGRAM_POSTS_DATABASE["mr-desert"];

  // Cache result client-side
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.setItem(
        `${CACHE_KEY_PREFIX}${normSlug}`,
        JSON.stringify({ timestamp: Date.now(), posts })
      );
    } catch (e) {
      console.warn("Instagram feed cache write error", e);
    }
  }

  return posts;
}

export function getInstagramAccountInfo(slug: string): InstagramAccountInfo {
  const normSlug = normalizeSlug(slug);
  return INSTAGRAM_ACCOUNTS[normSlug] || INSTAGRAM_ACCOUNTS["mr-desert"];
}

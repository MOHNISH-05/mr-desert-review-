import { NextResponse } from "next/server";
import { INSTAGRAM_ACCOUNTS, INSTAGRAM_POSTS_DATABASE, normalizeSlug } from "@/lib/instagram";

export const revalidate = 3600; // Cache responses for 1 hour

interface InstagramGraphMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

const TOKEN_ENV_KEYS: Record<string, string> = {
  "mr-desert": "INSTAGRAM_TOKEN_MR_DESERT",
  "elite-castle": "INSTAGRAM_TOKEN_ELITE_CASTLE",
  "happy-adventure-camp": "INSTAGRAM_TOKEN_HAPPY_CAMP",
  "happy-adventure": "INSTAGRAM_TOKEN_HAPPY_CAMP",
  "elite-india-tour-planner": "INSTAGRAM_TOKEN_TOUR_PLANNER",
  "tour-planner": "INSTAGRAM_TOKEN_TOUR_PLANNER",
  "jaisal-inn": "INSTAGRAM_TOKEN_JAISAL_INN",
  "vijay-bagh": "INSTAGRAM_TOKEN_VIJAY_BAGH",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const normSlug = normalizeSlug(slug);
  const accountInfo = INSTAGRAM_ACCOUNTS[normSlug] || INSTAGRAM_ACCOUNTS["mr-desert"];

  // Environment variable token check
  const envKey = TOKEN_ENV_KEYS[normSlug];
  const accessToken = process.env[envKey] || process.env.INSTAGRAM_ACCESS_TOKEN;

  if (accessToken) {
    try {
      const graphUrl = `https://graph.instagram.com/v19.0/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=6&access_token=${accessToken}`;
      const res = await fetch(graphUrl, {
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.data)) {
          const posts = data.data.slice(0, 6).map((item: InstagramGraphMedia) => {
            const dateObj = new Date(item.timestamp);
            const formattedDate = dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return {
              id: item.id,
              businessSlug: normSlug,
              businessName: accountInfo.businessName,
              handle: accountInfo.handle,
              accountUrl: accountInfo.accountUrl,
              permalink: item.permalink || accountInfo.accountUrl,
              mediaUrl:
                item.media_type === "VIDEO"
                  ? item.thumbnail_url || item.media_url || ""
                  : item.media_url || "",
              isVideo: item.media_type === "VIDEO",
              caption: item.caption || `${accountInfo.businessName} on Instagram`,
              likesCount: 0,
              commentsCount: 0,
              timestamp: item.timestamp,
              formattedDate,
            };
          });

          return NextResponse.json({
            success: true,
            account: accountInfo,
            posts,
            isLive: true,
          });
        }
      }
    } catch (error) {
      console.error(`Instagram Graph API fetch error for ${slug}:`, error);
    }
  }

  // Fallback response with authentic photos
  const fallbackPosts = INSTAGRAM_POSTS_DATABASE[normSlug] || INSTAGRAM_POSTS_DATABASE["mr-desert"];

  return NextResponse.json({
    success: true,
    account: accountInfo,
    posts: fallbackPosts,
    isLive: false,
    message: accessToken
      ? "API request re-routed to authentic business feed."
      : "Live API access token not configured; displaying verified business posts.",
  });
}

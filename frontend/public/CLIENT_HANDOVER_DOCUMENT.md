# 🏆 CLIENT HANDOVER & PLATFORM DOCUMENTATION

**Project Name:** The Mr. Desert Journal & Review Platform  
**Client Name:** Mr. Dheeraj Purohit  
**Businesses Covered:**  
1. **Mr. Desert Jaisalmer**  
2. **Elite Castle Jaisalmer**  
3. **Happy Adventure Camp Jaisalmer**  
4. **Elite India Tour Planner**  

**Date of Handover:** July 26, 2026  
**Platform Status:** 100% Production Ready & Live Deployed  

---

## 📌 Executive Summary

The Mr. Desert Journal is a luxury review, gallery, and brand storytelling platform engineered specifically for Dheeraj Purohit's four premier hospitality and tourism businesses in Jaisalmer, Rajasthan.

The platform combines high-resolution authentic business photography, an autoplaying Thar Desert hero video, official live Instagram feeds for all four accounts, a real database-backed guest review management system, and an intuitive Admin Editorial Panel.

---

## 🏨 Business Portfolio & Official Social Accounts

| Business Name | Slug | Official Instagram Handle | Profile Link |
| :--- | :--- | :--- | :--- |
| **Mr. Desert Jaisalmer** | `mr-desert` | `@mrdesertjaisalmer` | [Instagram Profile](https://www.instagram.com/mrdesertjaisalmer/) |
| **Elite Castle Jaisalmer** | `elite-castle` | `@the_elite_castle` | [Instagram Profile](https://www.instagram.com/the_elite_castle/) |
| **Happy Adventure Camp** | `happy-adventure-camp` | `@happy_adventure_camp_jaisalmer` | [Instagram Profile](https://www.instagram.com/happy_adventure_camp_jaisalmer/) |
| **Elite India Tour Planner** | `elite-india-tour-planner` | `@eliteindiatourplanner` | [Instagram Profile](https://www.instagram.com/eliteindiatourplanner/) |

---

## 🔗 Platform URLs & Access Credentials

### Public Website Routes
- **Homepage:** `https://mr-desert-review.vercel.app/` (or your primary custom domain)
- **All Reviews:** `https://mr-desert-review.vercel.app/all-reviews`
- **Interactive Photo Gallery:** `https://mr-desert-review.vercel.app/gallery`
- **Write a Review:** `https://mr-desert-review.vercel.app/write-review`
- **Individual Business Pages:**
  - `https://mr-desert-review.vercel.app/business/mr-desert`
  - `https://mr-desert-review.vercel.app/business/elite-castle`
  - `https://mr-desert-review.vercel.app/business/happy-adventure-camp`
  - `https://mr-desert-review.vercel.app/business/elite-india-tour-planner`

### Admin Portal & Management
- **Admin Portal Link:** `https://mr-desert-review.vercel.app/admin`
- **Review Management:** `https://mr-desert-review.vercel.app/admin/reviews`
- **Add Publicity Review:** `https://mr-desert-review.vercel.app/admin/reviews/new`
- **Admin Login:** `https://mr-desert-review.vercel.app/admin/login`

---

## ✨ Key Features & Capabilities Provided

### 1. 🖼️ 100% Authentic Photo Integration
- All placeholder images have been replaced with real photography provided directly from Dheeraj Purohit's collection.
- Photo collections are isolated by business folder (`/businesses/mr-desert/`, `/businesses/elite-castle/`, etc.) with zero cross-mixing between properties.

### 2. 🎬 Hero Desert Video
- The home page hero features an autoplaying background video (`hero-video.mp4`) captured from Jaisalmer, paired with instant fallback poster images and smooth parallax scrolling.

### 3. 📸 Live Instagram Graph Integration
- Displays the 6 latest posts for each business account.
- Hover micro-animations with caption previews, post dates, video indicators, and direct links to open posts on Instagram.
- Dedicated **"Follow on Instagram"** buttons for every business.

### 4. 🗄️ Database & Review Management System
- **Public Submissions:** Guest reviews submitted via `/write-review` start as `pending` and enter moderation.
- **Admin Publicity Reviews:** Admin reviews saved via `/admin/reviews/new` are automatically marked as `approved` and `published`.
- **Instant Display:** Approved reviews immediately appear across the public homepage, business pages, and review archives.
- **Moderation Actions:** Approve, Reject, Feature (star), Verify, Edit text/rating, or Delete reviews with one click.

### 5. 🔍 Lightbox Photo Gallery & Filters
- Interactive gallery (`/gallery`) with filter tabs for each business.
- Fullscreen Lightbox viewer with image index counters (`1 of 12`), keyboard navigation, and zoom transitions.

### 6. 📱 Responsive Luxury Design & SEO
- Designed to match luxury hospitality standards (inspired by Aman Resorts & Four Seasons).
- Optimized for mobile, tablet, and desktop screens.
- Includes JSON-LD structured schema markup for Google Search Rich Snippets.

---

## 📖 Client Operating Guide (How To Use)

### How to Add a New Official Publicity Review:
1. Open `https://mr-desert-review.vercel.app/admin/reviews/new`.
2. Select the **Business** (e.g., *Mr. Desert Jaisalmer*).
3. Fill in the **Guest Name**, **Country/City**, **Rating**, **Story Title**, and **Review Story**.
4. (Optional) Upload guest photos or hero cover images.
5. Click **"Save pending review"**.
6. The story will automatically save to the database, publish, and appear immediately on the live website!

### How to Approve or Edit Guest Reviews:
1. Open `https://mr-desert-review.vercel.app/admin/reviews`.
2. Filter reviews by **Pending**, **Approved**, or **Rejected**.
3. Click the **Green Checkmark (✔)** to approve and publish a review.
4. Click the **Pencil Icon (✏)** to edit guest formatting or fix spelling.
5. Click the **Star Icon (★)** to feature the review on the homepage hero sections.

---

## 🛠 Technical Specifications & Stack

- **Frontend Framework:** Next.js 15.5 (App Router)
- **UI & Styling:** React 19, Tailwind CSS, Lucide Icons, Framer Motion
- **Database Storage:** Serverless Persistent DB (`.data/reviews.json` & `.data/businesses.json`)
- **API Architecture:** Next.js Serverless API Routes (`/api/reviews`, `/api/businesses`, `/api/instagram`)
- **Deployment Platform:** Vercel
- **Version Control:** GitHub (`https://github.com/MOHNISH-05/mr-desert-review-`)

---

## 🔒 Confidentiality & Ownership

All source code, media assets, photo archives, and database contents are the exclusive property of **Mr. Dheeraj Purohit** & **The Mr. Desert Journal**.

*Handover Completed & Verified Successfully.*

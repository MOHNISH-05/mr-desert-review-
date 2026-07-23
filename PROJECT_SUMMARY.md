# Mr. Desert Reviews — Project Summary

## 1. Project purpose

Mr. Desert Reviews is a premium Jaisalmer review and travel-story website created to promote four official businesses through carefully presented guest experiences.

The site is designed to feel like a luxury travel publication rather than a basic Google Reviews listing.

## 2. Official businesses

The platform represents:

1. Mr. Desert Jaisalmer — main tourism brand
2. Elite Castle — luxury heritage hotel
3. Happy Adventure Camp — luxury desert camp
4. Elite India Tour Planner — Rajasthan and India tour planning company

Each business has its own public page, official website link, review listing, images, and booking/contact actions.

## 3. Main public features

- Premium Jaisalmer-themed homepage with gold, ivory, charcoal, and desert styling.
- Hero section focused on Dheeraj Purohit and the Mr. Desert editorial identity.
- Business story sections with large editorial images.
- Automatic premium image transitions every 1.5 seconds with crossfade and gentle zoom.
- Four business story links and review submission links.
- Public all-reviews page with search, business filtering, rating filtering, pagination, and premium story cards.
- Review cards with:
  - 16:9 cover image
  - Gold business badge
  - Rating and stars
  - Guest name, avatar, country, city, and verification status
  - Short review excerpt
  - Gallery thumbnails and lightbox
  - Read Full Story, Visit, Share, and Like actions
- Premium review detail pages with:
  - Large hero image
  - Guest photography gallery
  - Story content
  - Business information
  - Visit date and verification badges
  - Owner response
  - Related stories
- Public guest review form at `/write-review`.
- Business-specific review form links such as `/write-review?business=elite-castle`.
- Guest photo upload support: up to 5 images, maximum 10 MB each.
- Guest Gallery page displaying approved review images.
- Official business pages with website, booking, WhatsApp, address, maps, and review information.
- Attached Mr. Desert logo used in the navigation header.

## 4. Review moderation workflow

Reviews are never published immediately.

1. A guest submits a review and optional images.
2. The review is stored with `pending` status.
3. The review remains hidden from public pages.
4. An admin can edit the story, verify it, feature it, reject it, or delete it.
5. Admin approval changes the review to `approved` and publishes it.
6. Only approved and published reviews appear publicly.

## 5. Admin panel

Admin routes:

- `/admin/login` — admin login
- `/admin` — dashboard and statistics
- `/admin/reviews` — review moderation
- `/admin/reviews/new` — create a publicity review
- `/admin/businesses` — business management view

Admin review capabilities:

- Add a publicity review.
- Select one of the four businesses.
- Add guest name, email, country/city, rating, title, and story content.
- Upload a required featured hero image.
- Upload up to 20 gallery images.
- Edit review title, guest name, rating, and story content.
- Approve, reject, verify, feature, or delete reviews.

For local development, the current seeded login is:

- Username: `admin`
- Password: `admin123`

Change this before production deployment.

## 6. Technology

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- Responsive App Router pages

Frontend location:

`frontend/`

### Backend

- FastAPI
- SQLAlchemy
- SQLite for local development
- Pydantic schemas
- JWT-based admin authentication
- Static media uploads through `/uploads`

Backend location:

`backend/`

## 7. Important API behavior

Health check:

`GET http://localhost:8001/api/health`

Public approved review list:

`GET /api/reviews?status=approved`

Admin review list:

`GET /api/reviews/admin`

Create pending review:

`POST /api/reviews`

Upload review media:

`POST /api/reviews/{review_id}/media`

Approve review:

`POST /api/reviews/{review_id}/approve`

Reject review:

`POST /api/reviews/{review_id}/reject`

Update review:

`PUT /api/reviews/{review_id}`

## 8. Local development

### Start the backend

```powershell
cd C:\Users\Hp\AppData\Local\Temp\opencode\mr-desert-reviews\backend
$env:SECRET_KEY="local-validation-secret"
.\venv\Scripts\uvicorn.exe app.main:app --port 8001
```

### Start the frontend

```powershell
cd C:\Users\Hp\AppData\Local\Temp\opencode\mr-desert-reviews\frontend
npm install
npm run dev -- --port 3002
```

Local URLs:

- Website: `http://localhost:3002`
- Admin: `http://localhost:3002/admin`
- API: `http://localhost:8001`
- API docs: `http://localhost:8001/api/docs`

The frontend uses:

```env
NEXT_PUBLIC_API_URL=http://localhost:8001
```

## 9. Image and content assets

Official website images were added under:

`frontend/public/images/official/`

Images supplied from the local Dheeraj Purohit folder were added under:

`frontend/public/images/dheeraj/`

The attached Mr. Desert logo is located at:

`frontend/public/images/mr-desert-logo.png`

The image synchronization script attaches supplied images to representative approved review stories:

`backend/sync_review_media.py`

Run it from the backend directory when new local review assets need to be synchronized:

```powershell
.\venv\Scripts\python.exe sync_review_media.py
```

## 10. Verification completed

- Backend Python compilation passed.
- Frontend production build passed.
- Backend health endpoint returned status `ok`.
- CORS was configured for ports 3000 and 3002.
- Public pages filter out pending and rejected reviews.
- Admin-only actions require an authenticated JWT.
- Uploaded media is served from the backend `/uploads` path.

## 11. Production checklist

Before publishing the site:

- Replace the local admin password.
- Set a strong production `SECRET_KEY`.
- Move SQLite to PostgreSQL or another production database if required.
- Configure production frontend and backend URLs.
- Configure a permanent media storage provider for uploads.
- Add rate limiting and CAPTCHA or anti-spam protection to public review submissions.
- Confirm image usage rights and privacy permission for guest photos.
- Review all official business contact, booking, and website links.
- Run a final mobile, tablet, and desktop visual review.


# Mr. Desert Jaisalmer Tourism Hub

A premium tourism content platform for Jaisalmer: editorial travel stories, destination guides, curated guest experiences, gallery content and official links to the four Mr. Desert businesses.

This is not a booking engine and it does not accept public review or blog submissions. Admins curate and publish content; visitors discover Jaisalmer and continue to the official business websites to book.

## 🏪 Official Businesses

| Business | Website | Description |
|----------|---------|-------------|
| 🏜 Mr. Desert Jaisalmer | https://mrdesertjaisalmer.in | Main tourism brand |
| 🏨 Elite Castle Jaisalmer | https://elitecastlejaisalmer.com | Luxury heritage hotel |
| 🏕 Happy Adventure Camp Jaisalmer | https://happyadventurecampjaisalmer.com | Luxury desert camp |
| 🚙 Elite India Tour Planner | https://eliteindiatourplanner.com | Tour & travel services |

## 🚀 Tech Stack

### Frontend
- **Next.js 15** (App Router) with React 19
- **TypeScript** for type safety
- **Tailwind CSS** with luxury desert theme
- **Shadcn UI** components
- **Framer Motion** for animations

### Backend
- **FastAPI** (Python 3.12)
- **PostgreSQL** with SQLAlchemy async ORM
- **JWT Authentication** with role-based access
- **Alembic** for database migrations

### Deployment
- Frontend: Vercel
- Backend: Railway / Render
- Database: Neon PostgreSQL
- Media: Cloudinary

## 📁 Project Structure

```
mr-desert-reviews/
├── backend/
│   ├── app/
│   │   ├── api/endpoints/     # API routes
│   │   ├── core/              # Config, DB, Security
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Helpers
│   │   └── main.py            # FastAPI app
│   ├── migrations/            # Alembic migrations
│   ├── seed.py                # Seed data script
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js pages
│   │   ├── components/        # React components
│   │   ├── lib/               # Utilities & API client
│   │   ├── types/             # TypeScript types
│   │   └── hooks/             # Custom hooks
│   ├── public/                # Static assets
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🛠 Local Development Setup

### Prerequisites
- Node.js 20+
- Python 3.12+
- PostgreSQL 16+
- Docker (optional)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migration
alembic upgrade head

# Seed sample data
python seed.py

# Start development server
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

### Docker Setup

```bash
docker-compose up -d
```

## 🔗 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/businesses` | List businesses | No |
| GET | `/api/businesses/{id}` | Get business details | No |
| GET | `/api/businesses/slug/{slug}` | Get business by slug | No |
| POST | `/api/businesses` | Create business | Admin |
| PUT | `/api/businesses/{id}` | Update business | Admin |
| DELETE | `/api/businesses/{id}` | Delete business | Admin |
| GET | `/api/reviews` | List reviews | No |
| GET | `/api/reviews/{id}` | Get review | No |
| POST | `/api/reviews` | Submit review | No |
| PUT | `/api/reviews/{id}` | Update review | Admin |
| DELETE | `/api/reviews/{id}` | Delete review | Admin |
| POST | `/api/reviews/{id}/approve` | Approve review | Admin |
| POST | `/api/reviews/{id}/reject` | Reject review | Admin |
| POST | `/api/reviews/{id}/feature` | Toggle featured | Admin |
| POST | `/api/reviews/{id}/verify` | Toggle verified | Admin |
| POST | `/api/reviews/{id}/helpful` | Mark helpful | No |
| POST | `/api/reviews/{id}/reply` | Reply to review | Admin |
| POST | `/api/upload/media` | Upload media | Admin |
| GET | `/api/gallery` | Get gallery | No |
| GET | `/api/analytics/dashboard` | Dashboard stats | Admin |
| POST | `/api/auth/login` | Admin login | No |
| GET | `/api/auth/me` | Get current admin | Admin |
| GET | `/api/health` | Health check | No |

## Security

Set a strong `SECRET_KEY` in `backend/.env` before running outside development. Do not use demo credentials in production.

Public review responses are restricted to published/approved stories and redact guest contact details. Administrative review access is available at `/api/reviews/admin`.

## 🎨 UI Theme

- **Primary Color:** `#C79A3B` (Desert Gold)
- **Dark:** `#1C1C1C`
- **Background:** `#F8F6F2`
- **Accent:** `#8B5E3C`

## ✨ Features

- ✅ Centralized review hub for 4 businesses
- ✅ Public review submission with photo upload
- ✅ Advanced admin dashboard with analytics
- ✅ Review moderation (approve/reject/feature/verify)
- ✅ Owner reply system
- ✅ Gallery with lightbox
- ✅ JWT authentication & role-based access
- ✅ SEO optimized with Open Graph & Schema
- ✅ Responsive mobile-first design
- ✅ Dark mode support
- ✅ Search, filter & pagination
- ✅ Rating breakdown & statistics
- ✅ Skeleton loaders & animations
- ✅ Cross-website integration ready

## 📄 License

Private - Mr. Desert Jaisalmer

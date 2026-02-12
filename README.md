# Universal Studio Platform

A production-ready studio/venue website built with Next.js, Medusa v2, and Sanity CMS for managing events, media library, and ticket sales.

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│   Next.js Storefront (Port 8000)       │
│   - Event Listings & Details            │
│   - Media Library                       │
│   - Ticket Purchase (Medusa SDK)        │
└──────────┬──────────────────────────────┘
           │
    ┌──────┴──────┬─────────────┐
    │             │             │
    ▼             ▼             ▼
┌────────┐   ┌────────┐   ┌────────────┐
│ Sanity │   │ Medusa │   │  Stripe*   │
│  CMS   │   │ Backend│   │  Payments  │
│        │   │(Port   │   │            │
│Events &│   │ 9000)  │   │            │
│ Media  │   │        │   │            │
└────────┘   └────┬───┘   └────────────┘
                  │
            ┌─────┴─────┐
            │           │
        ┌───▼───┐   ┌───▼───┐
        │Postgres│  │ Redis │
        │(Port   │  │(Port  │
        │ 5432)  │  │ 6379) │
        └────────┘  └───────┘
```

## 📦 Project Structure

```
universal/
├── packages/
│   ├── types/            # Shared TypeScript types (@universal/types)
│   │   └── src/          # Event, Media, Booking, API types
│   └── sanity/           # Sanity client & queries (@universal/sanity)
│       └── src/          # createSanityClient, getEvents, getMedia, etc.
│
├── backend/              # Medusa v2 backend
│   ├── src/
│   │   ├── api/         # Custom API routes
│   │   │   ├── admin/sync-event/  # Admin: Sync events to products
│   │   │   └── store/events/      # Store: Get events
│   │   └── workflows/   # Business logic workflows
│   │       ├── steps/
│   │       │   ├── create-event-product.ts
│   │       │   ├── update-sanity-event.ts
│   │       │   ├── set-event-capacity.ts    # Optional: inventory
│   │       │   └── send-event-notification.ts # Optional: admin emails
│   │       └── sync-event-to-product.ts
│   ├── medusa-config.ts
│   └── package.json
│
├── storefront/          # Next.js 15 frontend
│   ├── src/
│   │   ├── app/[countryCode]/
│   │   │   ├── events/       # Event pages
│   │   │   │   ├── page.tsx  # Events listing
│   │   │   │   └── [slug]/page.tsx  # Event detail
│   │   │   ├── resources/   # Booking resources
│   │   │   │   ├── page.tsx  # Resources listing
│   │   │   │   └── [slug]/page.tsx  # Resource detail
│   │   │   └── media/        # Media library pages
│   │   │       ├── page.tsx  # Media listing
│   │   │       └── [slug]/page.tsx  # Media detail
│   │   └── lib/
│   │       └── sanity/       # Sanity client & queries
│   └── package.json
│
├── sanity/              # Sanity Studio CMS
│   ├── schemas/
│   │   ├── documents/
│   │   │   ├── event.ts     # Event schema
│   │   │   ├── media.ts     # Media schema
│   │   │   └── resource.ts  # Bookable resource schema
│   │   └── objects/
│   │       ├── blockContent.ts
│   │       └── seo.ts
│   ├── sanity.config.ts
│   └── package.json
│
├── .yarnrc.yml          # Yarn 4 config (nodeLinker, hoisting limits)
├── .yarn/releases/      # Bundled Yarn 4 binary
└── docker-compose.yml   # Local Postgres + Redis
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20
- Yarn 4 (Berry) — bundled via `.yarn/releases/`
- Docker & Docker Compose (for local development)

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd universal

# Install dependencies for all workspaces (run from project root)
yarn install
yarn build
```

> **Note:** All dependencies are managed from the project root using Yarn 4 workspaces. Run `yarn install` from the root — do not run it from individual workspace directories.

### 2. Start Infrastructure

```bash
# Start Postgres and Redis
docker-compose up -d

# Verify services are running
docker-compose ps
```

### 3. Configure Environment Variables

#### Backend (`backend/.env`)

```env
# Database
DATABASE_URL=postgres://postgres:postgres@localhost:5432/medusa
REDIS_URL=redis://localhost:6379

# Medusa
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:5173,http://localhost:9000
AUTH_CORS=http://localhost:5173,http://localhost:9000

# Sanity CMS
SANITY_PROJECT_ID=your-sanity-project-id
SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token
```

#### Storefront (`storefront/.env.local`)

```env
# Medusa Backend
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=your-publishable-key

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

#### Sanity (`sanity/.env.local`)

```env
SANITY_STUDIO_PROJECT_ID=your-sanity-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2024-01-01
```

### 4. Run Database Migrations

Create all database tables (including the booking plugin schema):

```bash
cd backend
yarn medusa db:migrate
```

### 5. Set Up External Services

#### Sanity CMS

1. Create account at [sanity.io](https://sanity.io)
2. Create new project
3. Get Project ID and Dataset name
4. Create API token (read/write permissions)
5. Update environment variables

#### Stripe (Optional - for payments)

1. Create account at [stripe.com](https://stripe.com)
2. Get test API keys
3. Add to Medusa config

### 6. Start Development Servers

```bash
# Terminal 1: Medusa Backend
cd backend
yarn dev
# Runs on http://localhost:9000

# Terminal 2: Sanity Studio
cd sanity
yarn dev
# Runs on http://localhost:3333

# Terminal 3: Next.js Storefront
cd storefront
yarn dev
# Runs on http://localhost:8000
```

### 7. Access Applications

- **Storefront**: http://localhost:8000
- **Medusa Admin**: http://localhost:9000/app
- **Sanity Studio**: http://localhost:3333

## 📝 Workflows

### Event Sync Workflow

Creates Medusa products from Sanity events with optional inventory tracking and notifications.

**Workflow steps:**
1. Create product/variant in Medusa with price
2. Link `medusaProductId` and `medusaVariantId` back to Sanity
3. (Optional) Set inventory capacity to prevent overselling
4. (Optional) Send admin notification email

**API:** `POST /admin/sync-event`

**Required fields:** `eventId`, `title`, `slug`, `price`, `currency`
**Optional fields:** `description`, `capacity`, `locationId`, `eventDate`, `notifyAdmins`

**Example:**
```bash
curl -X POST http://localhost:9000/admin/sync-event \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "event-abc123",
    "title": "My Event",
    "slug": "my-event",
    "price": 49.99,
    "currency": "usd",
    "capacity": 500,
    "notifyAdmins": true
  }'
```

**Creating an Event:**
1. Create Event in Sanity Studio (http://localhost:3333), publish
2. Call `POST /admin/sync-event` with event data
3. Event appears on storefront at http://localhost:8000/events

### Adding Media

1. Create Media document in Sanity Studio with category, file, and featured image
2. Publish — appears on storefront at http://localhost:8000/media

## 🛠️ Development

### Building Types Package

```bash
cd packages/types
yarn build
```

### Running Tests

```bash
# Backend tests
cd backend
yarn test

# Storefront tests (when added)
cd storefront
yarn test
```

### Type Checking

```bash
# Check all packages
yarn type-check
```

## 🏭 Production Deployment

### Medusa Backend

**Option 1: Medusa Cloud (Recommended)**
- Deploy to [Medusa Cloud](https://medusajs.com/cloud)
- Managed Postgres, Redis, and hosting
- Add Sanity env variables in dashboard

**Option 2: Self-Hosted**
- Deploy to Railway, Render, or any Node.js host
- Ensure Postgres and Redis are available
- Set all environment variables

### Next.js Storefront

- Deploy to [Vercel](https://vercel.com)
- Connect GitHub repository
- Add environment variables
- Auto-deploys on push to main

### Sanity Studio

```bash
cd sanity
yarn build
yarn deploy
```

## 📚 Key Features

✅ **Event Management**
- Create events in Sanity CMS
- Auto-sync to Medusa as products (with optional inventory tracking & admin notifications)
- Ticket sales through Medusa checkout

✅ **Booking System**
- Studio spaces, equipment rentals, resource reservations
- Availability management, cart-based booking flow
- Browse at `/resources`, manage in Medusa Admin

✅ **Media Library**
- White papers, case studies, guides
- File downloads
- Video embedding
- Category filtering

✅ **E-commerce**
- Medusa v2 backend
- Native email/password auth
- Stripe payments
- Cart & checkout

✅ **Type Safety**
- Shared TypeScript types package
- Strict mode enabled
- Full type coverage

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Database/Redis errors** | `docker-compose restart postgres` or `docker-compose restart redis` |
| **Medusa build errors** | `cd backend && rm -rf .medusa && yarn build` |
| **Sanity schema errors** | `rm -rf sanity/node_modules && yarn install` |
| **Booking migration fails** | Only run `npx medusa db:migrate` — do not run `db:generate bookingModule` (booking package includes compiled migrations) |

**Note:** Yarn 4 is configured at root via `.yarnrc.yml`. Do not add `.yarnrc.yml` in individual workspaces.

## 📖 External Documentation

- [Medusa Documentation](https://docs.medusajs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Booking Plugin](https://github.com/RSC-Labs/medusa-booking-system)

## 📅 Booking System

The platform includes a booking system for studio spaces, equipment rentals, and resource reservations, powered by [@rsc-labs/medusa-booking-system](https://github.com/RSC-Labs/medusa-booking-system).

**Setup:** The booking plugin is already in `backend/package.json`. Run migrations during the Quick Start step — no additional configuration needed.

**Admin Workflow:**
1. Create resource in Sanity (pricing, images, capacity)
2. Create matching resource in Medusa Admin (Booking System → Resources)
3. Copy Medusa Resource ID into Sanity `medusaResourceId` field
4. Set availability rules (Booking System → Availability Rules)

**Storefront:** Browse resources at `/resources`, view details and pricing at `/resources/[slug]`, book with date/time selection.

**Schema:** Sanity resource includes `title`, `slug`, `resourceType`, `description`, `featuredImage`, `hourlyRate`, `dailyRate`, `capacity`, `medusaResourceId`.

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request

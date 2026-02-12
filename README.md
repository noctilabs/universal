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

The event sync workflow creates Medusa products from Sanity events and supports optional inventory tracking and admin notifications.

#### Workflow Steps

| Step | Required | Description |
|------|----------|-------------|
| 1. Create Product | ✅ | Creates product/variant in Medusa with price |
| 2. Update Sanity | ✅ | Links `medusaProductId` and `medusaVariantId` back to Sanity event |
| 3. Set Capacity | Optional | Inventory management – prevents overselling tickets |
| 4. Send Notification | Optional | Email alerts to admins when events are synced |

**Optional parameters:** `capacity`, `locationId`, `eventDate`, `notifyAdmins`

#### API: POST /admin/sync-event

**Request body:**
```typescript
{
  eventId: string        // Sanity event document ID (required)
  title: string          // Event title (required)
  slug: string           // URL-friendly slug (required)
  price: number          // Ticket price, e.g. 49.99 (required)
  currency: string       // Currency code, default "usd" (required)
  description?: string   // Event description
  capacity?: number      // Max tickets (for inventory)
  locationId?: string    // Sales location ID in Medusa
  eventDate?: string     // ISO 8601 date string
  notifyAdmins?: boolean // Send email notification (default: false)
}
```

#### Quick Reference: cURL Examples

**Minimal sync (no inventory):**
```bash
curl -X POST http://localhost:9000/admin/sync-event \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "event-abc123",
    "title": "My Event",
    "slug": "my-event",
    "price": 49.99,
    "currency": "usd"
  }'
```

**Full sync (with inventory & notifications):**
```bash
curl -X POST http://localhost:9000/admin/sync-event \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "event-abc123",
    "title": "My Event",
    "slug": "my-event",
    "description": "Event description",
    "price": 49.99,
    "currency": "usd",
    "capacity": 500,
    "locationId": "loc_default",
    "eventDate": "2024-08-15T19:00:00Z",
    "notifyAdmins": true
  }'
```

#### Rollback Behavior

The workflow uses compensation functions to rollback on failure:
- **Step 1 fails** → No rollback
- **Step 2 fails** → Delete product from Step 1
- **Step 3 fails** → Delete inventory → Delete product
- **Step 4 fails** → No rollback (notification is optional)

#### Creating an Event

1. **In Sanity Studio** (http://localhost:3333): Create Event document, fill details, publish
2. **Sync to Medusa**: Call `POST /admin/sync-event` with event data (see cURL examples above)
3. **View on Storefront**: Event appears at http://localhost:8000/events; "Get Tickets" links to Medusa product

**Related files:** `backend/src/workflows/sync-event-to-product.ts`, `backend/src/workflows/steps/*.ts`, `backend/src/api/admin/sync-event/route.ts`

### Adding Media (White Papers, Case Studies)

1. **In Sanity Studio**:
   - Create new Media document
   - Select category (White Paper, Case Study, etc.)
   - Upload file or add external URL
   - Add featured image
   - Publish

2. **View on Storefront**:
   - Media appears at http://localhost:8000/media
   - Users can download/view content

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

### Postgres Connection Error

```bash
# Restart Postgres
docker-compose restart postgres

# Check logs
docker-compose logs postgres
```

### Redis Connection Error

```bash
# Restart Redis
docker-compose restart redis
```

### Medusa Build Errors

```bash
cd backend
rm -rf .medusa
yarn build
```

### Yarn Version Mismatch

This monorepo uses Yarn 4 (Berry) configured at the root via `.yarnrc.yml`. Do not add `.yarnrc.yml` files in individual workspaces. The root config uses `nmHoistingLimits: workspaces` to keep each workspace's dependencies together, which is required for Medusa plugins to resolve correctly.

### Booking Migration Fails (Unexpected token 'async')

This happens when `db:generate bookingModule` creates a new TypeScript migration that fails to load. **Fix:** Skip `db:generate` for the booking module—the package already includes the compiled migration. Run only:

```bash
cd backend
npx medusa db:migrate
```

If you already ran `db:generate` and have the failing `.ts` file in `node_modules`, run `yarn install` to restore a clean state, then `npx medusa db:migrate`.

### Sanity Schema Errors

```bash
# Reinstall from root
rm -rf sanity/node_modules
yarn install
```

## 📖 External Documentation

- [Medusa Documentation](https://docs.medusajs.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Booking Plugin](https://github.com/RSC-Labs/medusa-booking-system)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request


## 📅 Booking System

The platform includes a **complete booking system** for managing studio spaces, equipment rentals, and resource reservations, powered by [@rsc-labs/medusa-booking-system](https://github.com/RSC-Labs/medusa-booking-system).

### Architecture

```
Sanity CMS (Content) → Resource definitions, pricing, images
         ↓
Medusa Booking System → BookingResource, Availability rules, Cart, Orders
         ↓
Next.js Storefront → Browse resources, check availability, create bookings
```

### Features

| Category | Capabilities |
|----------|--------------|
| **Studio Spaces** | Recording studios, rehearsal rooms, meeting rooms – hourly/daily rates, capacity tracking |
| **Equipment Rentals** | Audio gear, instruments, cameras – quantity management, deposit support |
| **Availability** | Time-based rules, priority scheduling, real-time availability checks |
| **Booking Workflows** | Shopping cart for multiple bookings, dynamic pricing, resource allocation |

### Resource Types

| Type | Use Case | Pricing |
|------|----------|---------|
| Studio Space | General studio | Hourly/Daily |
| Recording Studio | Professional recording | Hourly/Daily |
| Rehearsal Room | Band practice | Hourly |
| Meeting Room | Meetings/events | Hourly |
| Equipment | Rentals | Daily |

### Installation & Setup

The booking plugin is in `backend/package.json`. Run:

```bash
# From project root
yarn install
cd backend
npx medusa db:migrate
yarn dev
```

> **Note:** Do not run `db:generate bookingModule`—it creates a TypeScript migration that fails to load. The booking module includes its migrations in the package.

### Sanity Resource Schema

The `resource` schema supports: `title`, `slug`, `resourceType`, `shortDescription`, `description`, `featuredImage`, `gallery`, `hourlyRate`, `dailyRate`, `currency`, `capacity`, `features`, `technicalSpecs`, `equipmentDetails`, `medusaResourceId` (link to Medusa).

### Admin Workflow

1. **Create in Sanity** – Add bookable resource with pricing, images, capacity
2. **Create in Medusa** – Booking System → Resources, create matching resource
3. **Link** – Copy Medusa Resource ID into Sanity `medusaResourceId` field
4. **Set availability** – Booking System → Availability Rules (day of week, start/end time, priority)
5. **Manage bookings** – View, approve, refund, track utilization

### Availability Rules

In Medusa Admin → Booking System → Availability Rules:

- **Resource**: Select the bookable resource
- **Day of Week**: 0–6 (Sunday–Saturday) or empty for all days
- **Start/End Time**: e.g. "09:00", "17:00"
- **Priority**: Higher numbers override lower ones
- **Is Active**: Enable/disable

### Storefront Pages

- **Resources listing:** http://localhost:8000/resources – Filter by type (`?type=studio_space`, `?type=equipment`)
- **Resource detail:** http://localhost:8000/resources/[slug] – Full details, pricing, "Book This Resource" CTA

### API Endpoints

**Store API:**
- `GET /store/booking/resources` – List resources
- `GET /store/booking/resources/:id/availability?startDate=...&endDate=...` – Check availability
- `POST /store/booking/cart` – Create booking cart
- `POST /store/booking/cart/:cartId/bookings` – Add booking (resourceId, startTime, endTime)
- `POST /store/booking/cart/:cartId/complete` – Complete checkout

**Admin API:**
- `POST /admin/booking/resources` – Create resource
- `GET /admin/booking/bookings` – List bookings
- `POST /admin/booking/availability-rules` – Create availability rule

### Booking Flow

1. User browses resources → `/resources`
2. Clicks resource → `/resources/[slug]`
3. Clicks "Book This Resource"
4. Selects date/time, checks availability
5. Adds to booking cart
6. Proceeds to checkout
7. Payment → Booking confirmed

### Troubleshooting

- **Booking system not in Admin:** Run `npx medusa db:migrate`, restart Medusa
- **Resource not available:** Ensure `medusaResourceId` in Sanity, resource exists in Medusa, availability rules configured
- **Availability returns empty:** Verify rules exist, cover time range, `isActive: true`


import type { SanityDocument, Slug, SEO, SanityImage, BlockContent } from "./sanity.js";
/**
 * Event status enum
 */
export declare enum EventStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    CANCELLED = "cancelled",
    SOLD_OUT = "soldOut",
    UPCOMING = "upcoming",
    PAST = "past"
}
/**
 * Event type definition from Sanity
 */
export interface Event extends SanityDocument {
    _type: "event";
    title: string;
    slug: Slug;
    description?: BlockContent[];
    shortDescription?: string;
    eventDate: string;
    eventEndDate?: string;
    venue?: string;
    address?: string;
    city?: string;
    country?: string;
    capacity?: number;
    ticketPrice: number;
    currency?: string;
    featuredImage?: SanityImage;
    gallery?: SanityImage[];
    status: EventStatus;
    tags?: string[];
    seo?: SEO;
    medusaProductId?: string;
    medusaVariantId?: string;
}
/**
 * Event with Medusa product data
 */
export interface EventWithProduct extends Event {
    medusaProductId: string;
    medusaVariantId: string;
    product?: {
        id: string;
        title: string;
        handle: string;
        variants: Array<{
            id: string;
            title: string;
            prices: Array<{
                amount: number;
                currency_code: string;
            }>;
        }>;
    };
}
/**
 * Event list response with pagination
 */
export interface EventListResponse {
    events: Event[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
/**
 * Event filter options
 */
export interface EventFilters {
    status?: EventStatus[];
    fromDate?: string;
    toDate?: string;
    city?: string;
    tags?: string[];
    search?: string;
}
/**
 * Event as returned from GROQ queries (projected fields - list view)
 */
export interface EventListItem extends Pick<SanityDocument, "_id" | "_createdAt" | "_updatedAt"> {
    _type: "event";
    title: string;
    slug: string;
    shortDescription?: string;
    eventDate: string;
    eventEndDate?: string;
    venue?: string;
    city?: string;
    country?: string;
    capacity?: number;
    ticketPrice: number;
    currency?: string;
    featuredImage?: string;
    featuredImageAlt?: string;
    status: string;
    tags?: string[];
    medusaProductId?: string;
    medusaVariantId?: string;
}
/**
 * Event as returned from GROQ queries (projected fields - detail view)
 */
export interface EventDetail extends EventListItem {
    description?: BlockContent[];
    address?: string;
    gallery?: string[];
    seo?: SEO;
    ticketTypes?: Array<{ id: string; label: string; price: number; currency: string }>;
}
//# sourceMappingURL=event.d.ts.map
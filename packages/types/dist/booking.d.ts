/**
 * Studio booking and resource rental types
 */
/**
 * Resource type enum
 */
export declare enum ResourceType {
    STUDIO_SPACE = "studio_space",
    EQUIPMENT = "equipment",
    REHEARSAL_ROOM = "rehearsal_room",
    RECORDING_STUDIO = "recording_studio",
    MEETING_ROOM = "meeting_room",
    OTHER = "other"
}
/**
 * Booking status enum
 */
export declare enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
/**
 * Booking resource definition
 */
export interface BookingResource {
    id: string;
    name: string;
    type: ResourceType;
    description?: string;
    capacity?: number;
    hourlyRate?: number;
    dailyRate?: number;
    features?: string[];
    images?: string[];
    isActive: boolean;
    metadata?: Record<string, unknown>;
}
/**
 * Time slot for availability
 */
export interface TimeSlot {
    start: string;
    end: string;
    available: boolean;
    resourceId?: string;
}
/**
 * Availability rule
 */
export interface AvailabilityRule {
    id: string;
    resourceId: string;
    dayOfWeek?: number;
    startTime: string;
    endTime: string;
    isActive: boolean;
    priority?: number;
}
/**
 * Booking request
 */
export interface BookingRequest {
    resourceId: string;
    startTime: string;
    endTime: string;
    customerId?: string;
    notes?: string;
    metadata?: Record<string, unknown>;
}
/**
 * Booking confirmation
 */
export interface Booking {
    id: string;
    resourceId: string;
    resource?: BookingResource;
    customerId: string;
    startTime: string;
    endTime: string;
    status: BookingStatus;
    totalAmount?: number;
    currency?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    metadata?: Record<string, unknown>;
}
/**
 * Booking cart (for multiple bookings)
 */
export interface BookingCart {
    id: string;
    customerId?: string;
    bookings: BookingRequest[];
    totalAmount: number;
    currency: string;
    createdAt: string;
    expiresAt?: string;
}
/**
 * Equipment rental
 */
export interface EquipmentRental extends BookingResource {
    type: ResourceType.EQUIPMENT;
    brand?: string;
    model?: string;
    quantity: number;
    condition?: "new" | "good" | "fair";
    requiresDeposit?: boolean;
    depositAmount?: number;
}
/**
 * Resource as returned from Sanity GROQ queries (list view)
 */
export interface ResourceListItem {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    _type: "resource";
    title: string;
    slug: string;
    resourceType: string;
    shortDescription?: string;
    hourlyRate?: number;
    dailyRate?: number;
    currency?: string;
    capacity?: number;
    squareFootage?: number;
    featuredImage?: string;
    featuredImageAlt?: string;
    features?: string[];
    isActive?: boolean;
    medusaResourceId?: string;
}
/**
 * Resource as returned from Sanity GROQ queries (detail view)
 */
export interface ResourceDetail extends ResourceListItem {
    description?: unknown;
    gallery?: string[];
    technicalSpecs?: Record<string, unknown>;
    equipmentDetails?: Record<string, unknown>;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
    };
}
/**
 * Studio space booking
 */
export interface StudioSpace extends BookingResource {
    type: ResourceType.STUDIO_SPACE | ResourceType.RECORDING_STUDIO | ResourceType.REHEARSAL_ROOM;
    squareFootage?: number;
    amenities?: string[];
    technicalSpecs?: {
        soundproofing?: boolean;
        acousticTreatment?: boolean;
        controlRoom?: boolean;
        instruments?: string[];
    };
}
//# sourceMappingURL=booking.d.ts.map
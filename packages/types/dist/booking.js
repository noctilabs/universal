/**
 * Studio booking and resource rental types
 */
/**
 * Resource type enum
 */
export var ResourceType;
(function (ResourceType) {
    ResourceType["STUDIO_SPACE"] = "studio_space";
    ResourceType["EQUIPMENT"] = "equipment";
    ResourceType["REHEARSAL_ROOM"] = "rehearsal_room";
    ResourceType["RECORDING_STUDIO"] = "recording_studio";
    ResourceType["MEETING_ROOM"] = "meeting_room";
    ResourceType["OTHER"] = "other";
})(ResourceType || (ResourceType = {}));
/**
 * Booking status enum
 */
export var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "pending";
    BookingStatus["CONFIRMED"] = "confirmed";
    BookingStatus["IN_PROGRESS"] = "in_progress";
    BookingStatus["COMPLETED"] = "completed";
    BookingStatus["CANCELLED"] = "cancelled";
})(BookingStatus || (BookingStatus = {}));
//# sourceMappingURL=booking.js.map
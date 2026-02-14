export const SyncDocumentTypes = {
  BOOKING_RESOURCE: "booking_resource",
} as const;

export type SyncDocumentTypes =
  (typeof SyncDocumentTypes)[keyof typeof SyncDocumentTypes];

export type SyncDocumentInputs<T> = T extends "booking_resource"
  ? // TODO: Once this PR: [https://github.com/RSC-Labs/medusa-booking-system/pull/1] is accepted and released, we can use the BookingResource type from the medusa-booking-system package
    Record<string, any>
  : never;

// Note: The return type could be narrowed down based on T, but for now keep as is for simplicity
export type TransformMap<T> = Record<
  SyncDocumentTypes,
  (data: SyncDocumentInputs<T>) => any
>;

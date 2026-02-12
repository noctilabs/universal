/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: ResponseMeta
}

/**
 * API error structure
 */
export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  statusCode?: number
}

/**
 * Response metadata
 */
export interface ResponseMeta {
  timestamp: string
  requestId?: string
  version?: string
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    pageSize: number
    pageCount: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

/**
 * Result type for operations that may fail
 */
export type ApiResult<T, E = ApiError> =
  | { success: true; data: T }
  | { success: false; error: E }

/**
 * Webhook payload structure
 */
export interface WebhookPayload<T = unknown> {
  event: string
  data: T
  timestamp: string
  signature?: string
}

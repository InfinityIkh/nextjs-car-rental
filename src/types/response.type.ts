type SuccesResponse<T = unknown> = {
    success: boolean
    message: string
} & T

type ErrorResponse = {
    success: boolean
    message: string
    errors : Record<string, string[]>
}

export type ServiceResponse<T = unknown> = Promise<{
    data : SuccesResponse<T> | ErrorResponse
    status: number
}>
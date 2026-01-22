export interface ApiError {
    message: string;
    code?: string;
    status?: number;
}

export interface ApiSuccessResponse<T> {
    status: number;
    data: T;
    message?: string;
}

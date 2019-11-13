export interface AppError extends Error {
    code?: string;
    [key: string]: any;
}

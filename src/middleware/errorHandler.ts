import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number,
        public code?: string
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', err);

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message,
            code: err.code
        });
        return;
    }

    res.status(500).json({
        message: 'Internal server error',
        code: 'INTERNAL_ERROR'
    });
};
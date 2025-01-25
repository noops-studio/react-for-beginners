import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
    status?: number;
    details?: any; // Include `details` as part of the custom error type
}

export default function errorHandler(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    const statusCode = err.status || 500;
    const response = {
        success: false,
        error: {
            code: statusCode,
            message: err.message || "An unknown error occurred",
        },
    };

    // Include validation details if available
    if (statusCode === 422 && err.details) {
        response.error["details"] = {
            validationErrors: err.details.map((detail: any) => ({
                field: detail.context?.key,
                message: detail.message,
            })),
        };
    }

    res.status(statusCode).json(response);
}

import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validation(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await validator.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err: any) {
            next({
                status: 422,
                message: "Validation Error",
                details: err.details,
            });
        }
    };
}
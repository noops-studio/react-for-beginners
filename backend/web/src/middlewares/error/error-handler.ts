import { NextFunction, Request, Response } from "express";

export default function errorHandler(e: any, req: Request, res: Response, next: NextFunction) {
    console.error(e)
    res.status(e.status || 500).send(e.message || 'unknown error')
}
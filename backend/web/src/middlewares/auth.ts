import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import config from 'config'

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

export default function auth(req: Request, res: Response, next: NextFunction) {
    if (req.token) {
        const decoded = jwt.verify(req.token, config.get('app.jwtSecret')) as {id: string};
        req.userId = decoded.id
    }
    next()
}
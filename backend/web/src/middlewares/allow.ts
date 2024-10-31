import { sign } from 'jsonwebtoken';
import { NextFunction, Response, Request } from "express";
import config from 'config'

export default function allow(req: Request, res: Response, next: NextFunction) {
    const user = {
        id: '1230ae30-dc4f-4752-bd84-092956f5c633',
        name: 'Bob'
    }
    const token = sign(user, config.get('app.jwtSecret'))
    req.headers['authorization'] = `Bearer ${token}`
    next()
}
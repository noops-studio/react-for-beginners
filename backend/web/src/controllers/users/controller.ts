import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { createHmac } from "crypto";
import config from 'config'
import { sign } from 'jsonwebtoken'
import { v4 } from "uuid";

function hash(password: string): string {
    const hash = createHmac('sha256', config.get('app.secret'))
                    .update(password)
                    .digest('hex'); 
    return hash;
}

function jwt(user: User): string {
    const token = sign(user, config.get('app.jwtSecret'))
    return token
}

export async function signup(req: Request, res: Response, next: NextFunction) {
    req.body.password = hash(req.body.password)
    req.body.id = v4()
    const user = await User.create(req.body)
    const token = jwt(user.get({plain: true}));
    res.json({jwt: token})
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body
    const user = await User.findOne({
        where: {
            username,
            password: hash(password)
        }
    })
    const token = jwt(user.get({plain: true}));
    res.json({jwt: token})
}
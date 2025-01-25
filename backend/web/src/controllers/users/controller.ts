import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import { createHmac } from "crypto";
import config from "config";
import { sign } from "jsonwebtoken";
import { v4 } from "uuid";

function hash(password: string): string {
    const hashed = createHmac("sha256", config.get("app.secret"))
        .update(password)
        .digest("hex");
    return hashed;
}

function jwt(user: User): string {
    return sign(user.get({ plain: true }), config.get("app.jwtSecret"));
}

export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        req.body.password = hash(req.body.password);
        req.body.id = v4();
        const user = await User.create(req.body);
        const token = jwt(user);
        res.json({ success: true, data: { jwt: token, user } });
    } catch (err) {
        next({ status: 500, message: "Failed to sign up user" });
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;
        const hashedPassword = hash(password);

        const user = await User.findOne({
            where: {
                username,
                password: hashedPassword,
            },
        });

        if (!user) {
            return next({ status: 401, message: "Invalid username or password" });
        }

        const token = jwt(user);
        res.json({ success: true, data: { jwt: token, user } });
    } catch (err) {
        next({ status: 500, message: "Failed to log in user" });
    }
}

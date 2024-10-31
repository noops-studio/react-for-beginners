import { NextFunction, Request, Response } from "express";
import Post from "../../models/Post";
import sequelize from "../../db/sequelize";

export async function getUserFeed(req: Request, res: Response, next: NextFunction) {
    const feed = await sequelize.query(`
        select  posts.*
        from    users
        join    users as following on users.id = following.id
        join    posts on posts.user_id = following.id
        where   users.id = ?
        order by posts.created_at desc
    `, {
        replacements: [req.userId],
        model: Post
    })
    res.json(feed)
}
import { NextFunction, Request, Response } from "express";
import Post from "../../models/Post";
import sequelize from "../../db/sequelize";
import User from "../../models/User";
import Comment from "../../models/Comment";

export async function getUserFeed(req: Request, res: Response, next: NextFunction) {
    const feed = await sequelize.query(`
        select  posts.*
        from    posts 
        join    follows on  follows.followee_id = posts.user_id
                        and follows.follower_id = ?
    `, {
        replacements: [req.userId],
        model: Post,
    })
    await Promise.all(feed.map(post => post.reload({include:[
        User, {
            model: Comment,
            include: [User]
        },
    ]})))
    res.json(feed)
}
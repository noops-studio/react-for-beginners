import { NextFunction, Request, Response } from "express";
import Post from "../../models/Post";
import sequelize from "../../db/sequelize";
import User from "../../models/User";
import Comment from "../../models/Comment";

export async function getUserFeed(req: Request, res: Response, next: NextFunction) {
    try {
        const feed = await sequelize.query(
            `
            SELECT posts.*
            FROM posts 
            JOIN follows ON follows.followee_id = posts.user_id
                         AND follows.follower_id = ?
            `,
            {
                replacements: [req.userId],
                model: Post,
            }
        );

        await Promise.all(
            feed.map((post: any) =>
                post.reload({
                    include: [
                        User,
                        {
                            model: Comment,
                            include: [User],
                        },
                    ],
                })
            )
        );

        res.json({ success: true, data: feed });
    } catch (err) {
        next({ status: 500, message: "Failed to retrieve user feed" });
    }
}

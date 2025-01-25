import { NextFunction, Request, Response } from "express";
import Follow from "../../models/Follow";
import User from "../../models/User";
import sequelize from "../../db/sequelize";

export async function getUserFollowers(req: Request, res: Response, next: NextFunction) {
    try {
        const followers = await sequelize.query(
            `
            SELECT * FROM users WHERE id IN (
                SELECT follower_id FROM follows WHERE followee_id = ?
            )
            `,
            {
                replacements: [req.userId],
                model: User,
            }
        );
        res.json({ success: true, data: followers });
    } catch (err) {
        next({ status: 500, message: "Failed to retrieve followers" });
    }
}

export async function getUserFollowing(req: Request, res: Response, next: NextFunction) {
    try {
        const following = await sequelize.query(
            `
            SELECT * FROM users WHERE id IN (
                SELECT followee_id FROM follows WHERE follower_id = ?
            )
            `,
            {
                replacements: [req.userId],
                model: User,
            }
        );
        res.json({ success: true, data: following });
    } catch (err) {
        next({ status: 500, message: "Failed to retrieve following" });
    }
}

export async function follow(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        const userToFollowId = req.params.id;
        const follow = await Follow.create({
            followerId: userId,
            followeeId: userToFollowId,
        });
        const follower = await User.findByPk(userId);
        const followee = await User.findByPk(userToFollowId);
        const ret = req.ioSocket.emit("new-follow", {
            from: req.headers["x-client-id"] || "stam",
            follower,
            followee,
        });
        res.json({ success: true, data: follow });
    } catch (err) {
        next({ status: 500, message: "Failed to follow user" });
    }
}

export async function unfollow(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        const userToUnfollowId = req.params.id;
        console.log(userToUnfollowId);
        await Follow.destroy({
            where: {
                followerId: userId,
                followeeId: userToUnfollowId,
            },
        });
        const follower = await User.findByPk(userId);
        const followee = await User.findByPk(userToUnfollowId);
        const ret = req.ioSocket.emit("new-unfollow", {
            from: req.headers["x-client-id"] || "stam",
            follower,
            followee,
        });
        res.json({ success: true, message: "Unfollowed successfully" });
    } catch (err) {
        next({ status: 500, message: "Failed to unfollow user" });
    }
}

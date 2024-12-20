import { NextFunction, Request, Response } from "express";
import Follow from "../../models/Follow";
import User from "../../models/User";

export async function getUserFollowing(req: Request, res: Response, next: NextFunction) {
    const user = await User.findByPk(req.userId, {
        include: [{
            model: User,
            as: 'followers'
        },{
            model: User,
            as: 'following'
        }]
    })
    res.json(user.following)
}

export async function getUserFollowers(req: Request, res: Response, next: NextFunction) {
    // const followerId = '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14'
    const user = await User.findByPk(req.userId, {
        include: [{
            model: User,
            as: 'followers'
        },{
            model: User,
            as: 'following'
        }]
    })
    res.json(user.followers)
}

export async function follow(req: Request, res: Response, next: NextFunction) {
    const userId = req.userId
    const userToFollowId = req.params.id;
    const follow = await Follow.create({
        followerId: userId,
        followeeId: userToFollowId
    })
    res.json(follow)
}

export async function unfollow(req: Request, res: Response, next: NextFunction) {
    const userId = req.userId
    const userToFollowId = req.params.id;
    const follow = await Follow.findOne({
        where: {
            followerId: userId,
            followeeId: userToFollowId
        }
    })
    await follow.destroy()
    res.json({
        success: true
    })
}
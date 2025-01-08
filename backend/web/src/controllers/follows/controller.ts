import { NextFunction, Request, Response } from "express";
import Follow from "../../models/Follow";
import User from "../../models/User";
import sequelize from "../../db/sequelize";

export async function getUserFollowers(req: Request, res: Response, next: NextFunction) {
    // const user = await User.findByPk(req.userId, {
    //     include: [{
    //         model: User,
    //         as: 'followers'
    //     },{
    //         model: User,
    //         as: 'following'
    //     }]
    // })
    // res.json(user.following)
    const followers = await sequelize.query(`
        select * from users where id in (
            select follower_id from follows where followee_id = ?
        )
    `, {
        replacements: [req.userId],
        model: User,
    })
    res.json(followers)
}

export async function getUserFollowing(req: Request, res: Response, next: NextFunction) {
    // const followerId = '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14'
    // const user = await User.findByPk(req.userId, {
    //     include: [{
    //         model: User,
    //         as: 'followers'
    //     },{
    //         model: User,
    //         as: 'following'
    //     }]
    // })
    // res.json(user.followers)
    const followers = await sequelize.query(`
        select * from users where id in (
            select followee_id from follows where follower_id = ?
        )
    `, {
        replacements: [req.userId],
        model: User,
    })
    res.json(followers)
}

export async function follow(req: Request, res: Response, next: NextFunction) {
    const userId = req.userId
    const userToFollowId = req.params.id;
    const follow = await Follow.create({
        followerId: userId,
        followeeId: userToFollowId
    })
    const follower = await User.findByPk(userId)
    const followee = await User.findByPk(userToFollowId)
    const ret = req.ioSocket.emit('new-follow', {
        from: req.headers['x-client-id'] || 'stam',
        // follow: {...follow.get({plain: true})}, 
        follower,
        followee
    })
    res.json(follow)
}

export async function unfollow(req: Request, res: Response, next: NextFunction) {
    const userId = req.userId
    const userToUnfollowId = req.params.id;
    console.log(userToUnfollowId)
    await Follow.destroy({
        where: {
            followerId: userId,
            followeeId: userToUnfollowId
        }
    })
    const follower = await User.findByPk(userId)
    const followee = await User.findByPk(userToUnfollowId)
    const ret = req.ioSocket.emit('new-unfollow', {
        from: req.headers['x-client-id'] || 'stam',
        follower,
        followee
        // unfollow: {
        //     followerId: userId,
        //     followeeId: userToUnfollowId
        // }, 
    })
    res.json({
        success: true
    })
}
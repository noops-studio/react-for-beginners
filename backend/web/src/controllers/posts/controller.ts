import { v4 } from "uuid";
import Post from "../../models/Post";
import { NextFunction, Request, Response } from "express";
import Comment from "../../models/Comment";
import User from "../../models/User";

export async function getPerUser(req: Request, res: Response, next: NextFunction) {
    // const userId = '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14'
    const userId = req.userId
    const posts = await Post.findAll({
        where: {
            userId
        },
        include: [
            {
                model: Comment,
                include: [User]
            }, 
            User
        ]
    })
    res.json(posts)
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const post = await Post.findByPk(id)
    if (!post) return next ({
        status: 404,
        message: 'post id not found'
    })
    res.json(post)
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const post = await Post.findByPk(id)
    await post.destroy()
    res.json({
        success: true
    })
}

export async function update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const post = await Post.findByPk(id)
    const { title, body } = req.body;
    post.title = title;
    post.body = body;
    await post.save()
    res.json(post)
}

export async function create(req: Request, res: Response, next: NextFunction) {
    // const userId = '4b1193cc-7ba1-462c-99c5-2e3ea4ab6d14'
    const userId = req.userId
    const post = await Post.create({
        ...req.body,
        id: v4(),
        userId,
        imageUrl: 'http://mypic.com'
    })

    const user = await User.findByPk(userId)
    
    req.ioSocket.emit('new_post', {
        ...post.get({plain: true}), 
        user: user.get({plain: true}),
        comments: []
    })
    res.json(post)
}

import { v4 } from "uuid";
import Post from "../../models/Post";
import { NextFunction, Request, Response } from "express";
import Comment from "../../models/Comment";
import User from "../../models/User";

export async function getPerUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        const posts = await Post.findAll({
            where: {
                userId,
            },
            include: [
                {
                    model: Comment,
                    include: [User],
                },
                User,
            ],
        });
        res.json(posts);
    } catch (err) {
        next({ status: 500, message: "Failed to retrieve posts" });
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id, {
            include: [
                {
                    model: Comment,
                    include: [User],
                },
                User,
            ],
        });
        if (!post) {
            return next({ status: 404, message: "Post not found" });
        }
        res.json({ success: true, data: post });
    } catch (err) {
        next({ status: 500, message: "Failed to retrieve post" });
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id, {
            include: [
                {
                    model: Comment,
                    include: [User],
                },
                User,
            ],
        });
        if (!post) {
            return next({ status: 404, message: "Post not found" });
        }
        const { title, body } = req.body;
        post.title = title;
        post.body = body;
        await post.save();
        res.json({ success: true, data: post });
    } catch (err) {
        next({ status: 500, message: "Failed to update post" });
    }
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        const post = await Post.create({
            ...req.body,
            id: v4(),
            userId,
            imageUrl: "http://mypic.com",
        });

        await post.reload({
            include: [
                {
                    model: Comment,
                    include: [User],
                },
                User,
            ],
        });

        const ret = req.ioSocket.emit("new-post", {
            from: req.headers["x-client-id"] || "stam",
            post: { ...post.get({ plain: true }) },
        });
        console.log(`io ret`, ret);

        res.json({ success: true, data: post });
    } catch (err) {
        next({ status: 500, message: "Failed to create post" });
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id);
        if (!post) {
            return next({ status: 404, message: "Post not found" });
        }
        await post.destroy();
        res.json({ success: true, message: "Post deleted successfully" });
    } catch (err) {
        next({ status: 500, message: "Failed to delete post" });
    }
}

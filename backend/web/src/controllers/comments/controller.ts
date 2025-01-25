import { NextFunction, Request, Response } from "express";
import Comment from "../../models/Comment";
import { v4 } from "uuid";
import User from "../../models/User";
import Post from "../../models/Post";

export async function getPerPost(req: Request, res: Response, next: NextFunction) {
    try {
        const postId = req.params.postId;
        const comments = await Comment.findAll({
            where: {
                postId,
            },
        });
        res.json({ success: true, data: comments });
    } catch (err) {
        next({ status: 500, message: "Failed to retrieve comments" });
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const post = await Comment.findByPk(id);
        if (!post) {
            return next({ status: 404, message: "Comment not found" });
        }
        res.json({ success: true, data: post });
    } catch (err) {
        next({ status: 500, message: "Failed to retrieve comment" });
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return next({ status: 404, message: "Comment not found" });
        }
        const { body } = req.body;
        comment.body = body;
        await comment.save();
        res.json({ success: true, data: comment });
    } catch (err) {
        next({ status: 500, message: "Failed to update comment" });
    }
}

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.userId;
        const postId = req.params.postId;
        const comment = await Comment.create({
            ...req.body,
            id: v4(),
            postId,
            userId,
        });
        await comment.reload({
            include: [User],
        });
        res.json({ success: true, data: comment });
    } catch (err) {
        next({ status: 500, message: "Failed to create comment" });
    }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const id = req.params.id;
        const post = await Comment.findByPk(id);
        if (!post) {
            return next({ status: 404, message: "Comment not found" });
        }
        await post.destroy();
        res.json({ success: true, message: "Comment deleted successfully" });
    } catch (err) {
        next({ status: 500, message: "Failed to delete comment" });
    }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const comments = await Comment.findAll({
            include: [User, Post],
        });
        res.json({ success: true, data: comments });
    } catch (err) {
        next({ status: 500, message: "Failed to retrieve comments" });
    }
}

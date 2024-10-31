import { Router } from "express";
import { create, getOne, getPerUser, remove, update } from "../controllers/posts/controller";
import validation from "../middlewares/validation";
import { editPostValidator, newPostValidator } from "../controllers/posts/validator";
import { getUserFeed } from "../controllers/feed/controller";

const router = Router();

router.get('/', getUserFeed)

export default router;
import { Router } from "express";
import { create, getAll, getOne, getPerPost, remove, update } from "../controllers/comments/controller";
import validation from "../middlewares/validation";
import { editCommentValidator, newCommentValidator } from "../controllers/comments/validator";

const router = Router();

router.get('/', getAll)
router.get('/:postId', getPerPost)
router.delete('/:id', remove)
router.patch('/:id', validation(editCommentValidator), update)
router.post('/:postId', validation(newCommentValidator) ,create)

export default router;
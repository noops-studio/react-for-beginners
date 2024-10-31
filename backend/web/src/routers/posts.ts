import { Router } from "express";
import { create, getOne, getPerUser, remove, update } from "../controllers/posts/controller";
import validation from "../middlewares/validation";
import { editPostValidator, newPostValidator } from "../controllers/posts/validator";

const router = Router();

router.get('/', getPerUser)
router.get('/:id', getOne)
router.delete('/:id', remove)
router.patch('/:id', validation(editPostValidator),  update)
router.post('/', validation(newPostValidator) ,create)

export default router;
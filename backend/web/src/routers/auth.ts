import { Router } from "express";
import validation from "../middlewares/validation";
import { loginValidator, signupValidator } from "../controllers/users/validator";
import { login, signup } from "../controllers/users/controller";

const router = Router();

router.post('/login', validation(loginValidator), login)
router.post('/signup', validation(signupValidator), signup)

export default router;
import { Router } from "express";
import { getUserFollowers, getUserFollowing } from "../controllers/follows/controller";

const router = Router();

router.get('/followers', getUserFollowers )
router.get('/following', getUserFollowing )

export default router;
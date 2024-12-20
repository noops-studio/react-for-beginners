import { Router } from "express";
import { follow, getUserFollowers, getUserFollowing, unfollow } from "../controllers/follows/controller";

const router = Router();

router.get('/followers', getUserFollowers )
router.get('/following', getUserFollowing )
router.post('/follow/:id', follow )
router.post('/unfollow/:id', unfollow )

export default router;
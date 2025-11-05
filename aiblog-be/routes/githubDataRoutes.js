import { Router } from "express";
import {
	getRecentCommits,
	getMyRepos,
} from "../controllers/githubDataController.js";

const router = Router();

router.get("/my-repos", getMyRepos);
router.get("/recent-commits", getRecentCommits);

export default router;

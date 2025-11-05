import { Router } from "express";
import { getRecentCommits } from "../controllers/githubDataController.js";

const router = Router();

router.get("/recent-commits", getRecentCommits);

export default router;

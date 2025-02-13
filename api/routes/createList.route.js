import express from "express"
import {postList} from "../controllers/postListing.controller.js"

const router = express.Router();

router.get("/createlist",postList);

export default router
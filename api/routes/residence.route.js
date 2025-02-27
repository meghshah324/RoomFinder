import express from "express"
import { findRooms } from "../controllers/filterRommate.controller.js";

const router = express.Router();

router.post('/search',findRooms);

export default router
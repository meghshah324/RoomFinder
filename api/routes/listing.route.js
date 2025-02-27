import express from "express";
import { postList } from "../controllers/postListing.controller.js";
import { findRooms } from "../controllers/filterRommate.controller.js";
import { updateListing } from "../controllers/updateRoomDetails.js";

const router = express.Router();

router.get("/createlist", postList);
router.post("/search", findRooms);
router.put("/update-listing/:id", updateListing);

export default router;

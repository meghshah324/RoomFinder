import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { postList } from "../controllers/postListing.controller.js";
import { findRooms } from "../controllers/filterRommate.controller.js";
import { updateListing } from "../controllers/updateRoomDetails.js";
import { deletePost } from "../controllers/deleteListing.controller.js";
import { rooms } from "../controllers/rooms.controller.js";
import { getRoomById } from "../controllers/roomById.controller.js";

const router = express.Router();

router.post("/createlist", authMiddleware, postList);
router.get("/room/:id",getRoomById);
router.put("/update-listing/:id", authMiddleware, updateListing);
router.delete("/delete-listing/:id", authMiddleware, deletePost);
router.get("/search", findRooms);
router.get("/rooms", rooms);

export default router;

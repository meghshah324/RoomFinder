import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { postList } from "../controllers/postListing.controller.js";
import { filterRooms } from "../controllers/filterRommate.controller.js";
import { updateListing } from "../controllers/updateRoomDetails.js";
import { deletePost } from "../controllers/deleteListing.controller.js";
import { rooms } from "../controllers/rooms.controller.js";
import { generalLimiter } from "../middleware/rateLimiter.js"
import { getRoomById } from "../controllers/roomById.controller.js";
import { getRoomByUserId } from "../controllers/roomByUserId.controller.js";
import { uploadImages } from "../controllers/imageUpload.controller.js";


const router = express.Router();

router.post("/createlist", generalLimiter,authMiddleware, postList);
router.get("/room/:id",generalLimiter, getRoomById);
router.put("/update-listing/:id", generalLimiter, authMiddleware, updateListing);
router.delete("/delete-listing/:id", generalLimiter, authMiddleware, deletePost);
router.get("/userroom/:id", generalLimiter, authMiddleware, getRoomByUserId);
router.post("/rooms/filter", generalLimiter, filterRooms);
router.get("/rooms", generalLimiter, rooms);
router.post("/upload/image/:id", generalLimiter, authMiddleware, uploadImages);


export default router;

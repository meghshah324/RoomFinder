import express from "express"
import { signup } from "../controllers/auth.controller.js";
import { Login } from "../controllers/login.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js"
import User from "../models/user.model.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", Login);
router.get("/me", authMiddleware, async (req, res) => {
     const userId = req.user.userId;
     try {
          const user = await User.findById(userId).select('username email');
          if (!user) {
               return res.status(404).json({ message: 'User not found' });
          }
          res.json({
               userId: user._id,
               username: user.username,
               email : user.email
          });
     } catch (error) {
          console.error('Error fetching user:', error);
          res.status(500).json({ message: 'Server error' });
     }
});

export default router
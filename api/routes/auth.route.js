import express from "express"
import { signup } from "../controllers/auth.controller.js";
import { Login, Logout } from "../controllers/login.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js"
import User from "../models/user.model.js";
import { editPassword, editProfile } from "../controllers/editProfile.controller.js";
import { deleteAccount } from "../controllers/deleteAccount.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", Login);
router.post("/logout",Logout);
router.post("/edit-profile/:userId",editProfile);
router.put("/edit-password/:userId",editPassword);
router.delete("/delete-account/:userId", deleteAccount);

    
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
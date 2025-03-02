import express from "express"
import { signup } from "../controllers/auth.controller.js";
import { Login } from "../controllers/login.controller.js";


const router = express.Router();

router.post("/signup",signup);
router.post("/signin",Login);

export default router
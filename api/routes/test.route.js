import express from "express";
import { admin, loggedIn } from "../controllers/test.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/admin", admin);
router.get("/logged-in", verifyToken, loggedIn);
export default router;

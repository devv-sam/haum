import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  profilePosts,
  savePost,
  unsavePost,
} from "../controllers/user.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
// router.get("/:id", getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);
router.post("/unsave", verifyToken, unsavePost);
router.get("/profilePosts", verifyToken, profilePosts);

export default router;

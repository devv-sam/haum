import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, username, email, name } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        name,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};

// save post
export const savePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const tokenUserId = req.userId;

    const saved = await prisma.savedPost.create({
      data: {
        userId: tokenUserId,
        postId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Post saved successfully",
    });
  } catch (error) {
    console.error("Save post error:", error);
    // Check if it's a unique constraint violation
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Post already saved",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to save post",
    });
  }
};

// unsave post
export const unsavePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const tokenUserId = req.userId;

    await prisma.savedPost.delete({
      where: {
        userId_postId: {
          userId: tokenUserId,
          postId,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Post unsaved successfully",
    });
  } catch (error) {
    console.error("Unsave post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to unsave post",
    });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((item) => item.post);
    res.status(200).json({ userPosts, savedPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};

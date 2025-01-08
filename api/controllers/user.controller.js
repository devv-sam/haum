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

// Save post
export const savePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    // Check if already saved
    const existingSave = await prisma.savedPost.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    if (existingSave) {
      return res.status(400).json({
        success: false,
        message: "Post already saved",
      });
    }

    // Create new save
    await prisma.savedPost.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Post saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Unsave post
export const unsavePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    await prisma.savedPost.deleteMany({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Post unsaved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const profilePosts = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: tokenUserId },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: tokenUserId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((item) => item.post);
    res.status(200).json({ userPosts, savedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};

import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import getCoords from "../lib/getCoords.js";
export const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 100000,
        },
        isExpired: false,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    // If there's a token, check saved status for each post
    const token = req.cookies?.token;
    let userId;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        userId = payload.id;
      } catch (error) {
        console.error("Token verification error:", error);
      }
    }

    // Add isSaved property to each post
    const postsWithSavedStatus = await Promise.all(
      posts.map(async (post) => {
        if (!userId) return { ...post, isSaved: false };

        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: post.id,
              userId: userId,
            },
          },
        });

        return { ...post, isSaved: saved ? true : false };
      })
    );

    res.status(200).json(postsWithSavedStatus);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });
        return res.status(200).json({ ...post, isSaved: saved ? true : false });
      } catch (error) {
        return res.status(200).json({ ...post, isSaved: false });
      }
    }

    return res.status(200).json({ ...post, isSaved: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  const delistingDate = new Date(body.postData.delistingDate);
  const isExpired = delistingDate <= new Date();

  try {
    // Get coordinates for the address
    const { latitude, longitude } = await getCoords(body.postData.address);
    // Create the post and include the associated user data
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        latitude,
        longitude,
        postDetail: {
          create: {
            desc: body.postDetail.desc,
            tokensrem: body.postDetail.tokensrem,
            size: body.postDetail.size,
          },
        },
        delistingDate,
        isExpired,
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete posts" });
  }
};

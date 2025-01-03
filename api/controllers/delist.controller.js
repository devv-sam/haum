import prisma from "../lib/prisma.js";

export const ExpRemover = async () => {
  try {
    const currentDate = new Date();

    // Find all posts where the delistingDate is in the past and is not yet deleted
    const expiredPosts = await prisma.post.findMany({
      where: {
        delistingDate: {
          lte: currentDate, // posts where delistingDate is less than or equal to current date
        },
        isExpired: false, // Ensure we don't process already marked expired posts
      },
    });

    // Mark expired posts as expired (optional step)
    await prisma.post.updateMany({
      where: {
        id: {
          in: expiredPosts.map((post) => post.id),
        },
      },
      data: {
        isExpired: true,
      },
    });

    // Remove expired posts from the database
    await prisma.post.deleteMany({
      where: {
        id: {
          in: expiredPosts.map((post) => post.id),
        },
      },
    });
  } catch (error) {
    console.error("Error deleting expired posts:", error);
  }
};

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) return res.status(403).json({ message: "Invalid token" });
    req.userId = payload.id;
    next();
  });
};

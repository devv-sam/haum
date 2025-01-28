import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let token = req.cookies.token; // First, check cookies
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1]; // Check Authorization header
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) return res.status(403).json({ message: "Invalid token" });
    req.userId = payload.id; // ✅ Set userId for the request
    next();
  });
};

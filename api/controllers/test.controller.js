import jwt from "jsonwebtoken";
export const loggedIn = async (req, res) => {
  res.status(200).json({ message: "Authentication successful" });
};

export const admin = async (req, res) => {
  //verify token
  const token = req.cookies.token;
  // if we don't have a token, return an "unauthorized"
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // if we have a token, verify by decoding token with secret
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, payload) => {
    if (error) return res.status(403).json({ message: "Invalid token" });
    if (!payload.isAdmin) {
      res.status(403).json({ message: "Not authorized!" });
    }
  });
  res.status(200).json({ message: "Authentication successful" });
};

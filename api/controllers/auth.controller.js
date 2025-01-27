import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { fname, lname, name, username, email, password } = req.body;

  try {
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save the user to db
    const newUser = await prisma.user.create({
      data: {
        fname,
        lname,
        name,
        username,
        email,
        password: hashPassword,
      },
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(res.status(500).json({ message: "Failed to create user" }));
  }
};

// Function to generate a token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email using Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists and password is correct
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token with userId in the payload
    const token = generateToken(user.id);

    // Send user data and token to the frontend
    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
      token, // Send the token to the frontend
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
};

export { register, login, logout };

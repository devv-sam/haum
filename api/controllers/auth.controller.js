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

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate token
    const age = 1000 * 60 * 24 * 7;
    const token = jwt.sign(
      { id: user.id, isAdmin: true },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    // Send the token in the response instead of setting cookies
    res.status(200).json({ token, user: userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login!" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
};

export { register, login, logout };

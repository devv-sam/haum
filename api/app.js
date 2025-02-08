import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";
import cron from "node-cron";
import { ExpRemover } from "./controllers/delist.controller.js";
const app = express();

app.use(express.json());

// check cors configuration to see if it's causing the issue  https://vercel.com/guides/how-to-enable-cors
app.use(
  cors({
    origin: "https://haum.vercel.app", // Allow requests from this origin
    credentials: true, // Allow cookies to be sent
  })
);

//cleanup task
cron.schedule("0 * * * *", () => {
  ExpRemover();
});

app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 3000; // Use Render's assigned port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

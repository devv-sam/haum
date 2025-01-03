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

//middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

//cleanup task
cron.schedule("0 * * * *", () => {
  ExpRemover();
});

app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

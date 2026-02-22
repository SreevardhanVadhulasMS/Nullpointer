import express from "express";
import cors from "cors";

import authRoutes    from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import postRoutes    from "./routes/post.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "NullPointer API" });
});

app.use("/api/auth",    authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts",   postRoutes);

export default app;
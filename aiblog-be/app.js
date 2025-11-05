import express from "express";
import cors from "cors";

import testRoutes from "./routes/testRoutes.js";
import githubDataRoutes from "./routes/githubDataRoutes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/test", testRoutes);
app.use("/github-data", githubDataRoutes);

export default app;

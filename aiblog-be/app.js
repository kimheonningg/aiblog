import express from "express";
import cors from "cors";
import testRoutes from "./routes/testRoutes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/test", testRoutes);

export default app;

import express from "express";
import { chatWithGroq } from "../controllers/ai.controllers.js";
import { analyzeImageBase64 } from "../controllers/ai.controllers.js";

const aiRouter = express.Router();

aiRouter.post("/chat", chatWithGroq);
aiRouter.post("/analyze-image-base64", analyzeImageBase64);

export default aiRouter;

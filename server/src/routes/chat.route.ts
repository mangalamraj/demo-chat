import { Router } from "express";
import { streamChat } from "../controller/chat.controller";

const router = Router();

router.post("/stream", streamChat);

export default router;

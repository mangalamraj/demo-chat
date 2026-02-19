import { Router } from "express";
import { getDoctors } from "../controller/doctors.controller";

const router = Router();

router.get("/", getDoctors);

export default router;

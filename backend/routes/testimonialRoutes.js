import express from "express";
import { createTestimonial, getAllTestimonials } from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/", getAllTestimonials);
router.post("/", createTestimonial);

export default router;

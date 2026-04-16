import express from "express";
import { getMonthAvailability } from "../controllers/monthavailabilityController.js";

const router = express.Router();
router.get("/month-availability", getMonthAvailability);

export default router;
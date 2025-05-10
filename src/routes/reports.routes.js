import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getHelmetDesignCounts, getReportByClient } from "../controllers/reports.controller.js";

const router = Router();

router.get("/tiresByHelmetDesign", authRequired , getHelmetDesignCounts);
router.post('/reportByClient', authRequired,getReportByClient);

export default router
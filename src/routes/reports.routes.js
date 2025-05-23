import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getTiresWithContinentalBand, getReportByClient, getTiresWithBandagBand } from "../controllers/reports.controller.js";

const router = Router();

router.get("/tiresByBandContinental", authRequired , getTiresWithContinentalBand);
router.get("/tiresByBandBandag", authRequired , getTiresWithBandagBand);
router.post('/reportByClient', authRequired,getReportByClient);

export default router
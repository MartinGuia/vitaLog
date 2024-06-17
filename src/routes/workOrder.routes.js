import { Router } from "express";

import { closeWorkOrder } from "../controllers/workOrder.controller.js";

const router = Router();

router.post("/close", closeWorkOrder);

export default router;
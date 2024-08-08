import { Router } from "express";

import { closeWorkOrder, getWorkOrders } from "../controllers/workOrder.controller.js";

const router = Router();

router.post("/close", closeWorkOrder);
router.get("/workorders", getWorkOrders);

export default router;
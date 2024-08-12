import { Router } from "express";

import { closeWorkOrder, getWorkOrders, getWorkOrderById } from "../controllers/workOrder.controller.js";

const router = Router();

router.post("/close", closeWorkOrder);
router.get("/workorders", getWorkOrders);
router.get("/workorder/:id", getWorkOrderById);

export default router;
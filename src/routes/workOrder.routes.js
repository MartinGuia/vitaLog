import { Router } from "express";

import {createOrOpenWorkOrder ,closeWorkOrder, getWorkOrders, getWorkOrderById } from "../controllers/workOrder.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/open", authRequired, createOrOpenWorkOrder);
router.post("/close", authRequired, closeWorkOrder);
router.get("/workorders", getWorkOrders);
router.get("/workorder/:id", getWorkOrderById);

export default router;
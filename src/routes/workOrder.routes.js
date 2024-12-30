import { Router } from "express";

import {deleteWorkOrder, createOrOpenWorkOrder ,closeWorkOrder, getWorkOrders, getWorkOrderById } from "../controllers/workOrder.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/open", authRequired, createOrOpenWorkOrder);
router.post("/close", authRequired, closeWorkOrder);
router.get("/workorders", getWorkOrders);
router.get("/workorder/:id", getWorkOrderById);
router.delete("/deleteWorkorder/:id", deleteWorkOrder);

export default router;
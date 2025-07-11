import { Router } from "express";

import {deleteWorkOrder, createOrOpenWorkOrder ,closeWorkOrder, getWorkOrders, getWorkOrderById, quoteWorkOrder, getQuotedWorkOrders, reopenWorkOrder } from "../controllers/workOrder.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/open", authRequired, createOrOpenWorkOrder);
router.post("/close", authRequired, closeWorkOrder);
router.post("/reOpen", authRequired, reopenWorkOrder);
router.get("/workorders", authRequired,getWorkOrders);
router.get("/workorder/:id", authRequired,getWorkOrderById);
router.delete("/deleteWorkorder/:id", authRequired,deleteWorkOrder);
router.put("/quoteWorkOrder", authRequired,quoteWorkOrder);
router.get("/quoteWorkOrder", authRequired, getQuotedWorkOrders);

export default router;
import {Router} from "express"

import {createOrOpenDeliveryOrder, getDeliveryOrderById, addTiresToDeliveryOrder, closeDeliveryOrder, getDeliveryOrders, deleteDeliveryOrder} from "../controllers/deliveryOrder.controller.js"
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.post("/openDeliveryOrder", authRequired, createOrOpenDeliveryOrder)
router.post("/addTires", authRequired, addTiresToDeliveryOrder)
router.post("/closeDeliveryOrder", authRequired, closeDeliveryOrder)
router.get("/deliveryOrders", authRequired, getDeliveryOrders)
router.get("/deliveryOrder/:id", authRequired,getDeliveryOrderById)
router.delete("/deleteDeliveryOrder/:id", authRequired,deleteDeliveryOrder);

export default router;
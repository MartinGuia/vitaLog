import {Router} from "express"

import {createOrOpenDeliveryOrder, addTiresToDeliveryOrder, closeDeliveryOrder} from "../controllers/deliveryOrder.controller.js"
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.post("/openDeliveryOrder", authRequired, createOrOpenDeliveryOrder)
router.post("/addTires", authRequired, addTiresToDeliveryOrder)
router.post("/closeDeliveryOrder", authRequired, closeDeliveryOrder)

export default router;
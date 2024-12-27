import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTires,
  getTire,
  createTire,
  updateTire,
  deleteTire,
} from "../controllers/tire.controller.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { createTireSchema } from "../schemas/tire.schema.js";

const router = Router();

router.get("/tires", authRequired, getTires);
router.get("/tires/:id", authRequired ,getTire);
router.post("/tires", authRequired,createTire);
router.delete("/tires/:id", authRequired ,deleteTire);
router.put("/tire/:id", authRequired ,updateTire);

export default router;

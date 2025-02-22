import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTires,
  getTire,
  createTire,
  updateTire,
  updateFinalTire,
  getTiresWithInspection,
  getTireByBarcode,
  getTiresByHelmetDesign
} from "../controllers/tire.controller.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { createTireSchema } from "../schemas/tire.schema.js";

const router = Router();

router.get("/tires", authRequired, getTires);
router.get("/tires/:id", authRequired ,getTire);
router.get("/tiresByInspection", authRequired , getTiresWithInspection);
// router.delete("/tires/:id", authRequired ,deleteTire);
router.put("/tire/:id", authRequired ,updateTire);
router.put("/editTire/:id", authRequired , updateFinalTire);
router.post("/tires", authRequired, createTire);
router.post("/tireBarcode", authRequired , getTireByBarcode);
router.get("/tiresByBand", authRequired , getTiresByHelmetDesign);

export default router;

import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTires,
  getTire,
  createTire,
  updateTire,
  updateProductionTire,
  getTiresWithInspection,
  deleteTire,
  getTireByBarcode,
  updateQuoteTires,
  getQuoteTires,
} from "../controllers/tire.controller.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { createTireSchema } from "../schemas/tire.schema.js";

const router = Router();

router.get("/tires", authRequired, getTires);
router.get("/tires/:id", authRequired ,getTire);
router.get("/tiresByInspection", authRequired , getTiresWithInspection);
router.delete("/tire/:id", authRequired , deleteTire);
router.put("/tire/:id", authRequired ,updateTire);
router.put("/editTire/:id", authRequired , updateProductionTire);
router.post("/tires", authRequired, createTire);
router.post("/tireBarcode", authRequired , getTireByBarcode);
router.put("/quoteTires", authRequired , updateQuoteTires);
router.get("/quoteTires", authRequired , getQuoteTires);

export default router;

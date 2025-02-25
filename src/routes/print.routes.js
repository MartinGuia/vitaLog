import { Router } from "express";
import {printLabel} from "../libs/printLabel.js";

const router = Router();

// Ruta para imprimir información de prueba
router.post('/print', printLabel);
  
  export default router;
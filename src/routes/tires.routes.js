import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/tires', authRequired,)
router.get('/tires/:id', authRequired,)
router.post('/tires', authRequired,)
router.delete('/tires', authRequired,)
router.put('/tires', authRequired,)

export default router;
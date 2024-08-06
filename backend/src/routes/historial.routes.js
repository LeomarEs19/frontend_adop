import { Router } from "express";
import { eliminarAdopcionHistorico, listarAdopcionesHistorico } from "../controllers/historial.controller.js";

const router = Router();

router.get('/historial', listarAdopcionesHistorico);
router.delete('/historial/:id', eliminarAdopcionHistorico);

export default router;

import { Router } from "express";
import { confirmacionAdopcion, eliminarAdopcion, listarAdopciones, listarMisAdopciones, rechazarAdopcion, registrarAdopciones } from "../controllers/adopciones.controller.js";

const router = Router();

router.post('/adopciones', registrarAdopciones);
router.get('/adopciones', listarAdopciones);
router.get('/adopciones/mis-adopciones/:id', listarMisAdopciones);
router.delete('/adopciones/:id', eliminarAdopcion);
router.put('/adopciones/confirmar/:id', confirmacionAdopcion);
router.put('/adopciones/rechazar/:id', rechazarAdopcion);

export default router;

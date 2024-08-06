import { Router } from "express";
import { listarGeneros } from "../controllers/genero.controller.js";

const router = Router();

router.get('/listar', listarGeneros);

export default router;
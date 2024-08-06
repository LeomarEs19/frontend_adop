import { Router } from "express";
import { listarCategoria } from "../controllers/categoria.controller.js";

const router = Router();

router.get('/listar', listarCategoria);

export default router;
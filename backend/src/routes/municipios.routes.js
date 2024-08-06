import { Router } from 'express';
import { listarMunicipios, registrarMunicipios } from '../controllers/municipios.controller.js';

const router = Router();

router.get('/municipios', listarMunicipios);
router.post('/municipios', registrarMunicipios);

export default router;

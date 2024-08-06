import { Router } from 'express';
import { listarMascotas, registrarMascotas, mascotaEliminada, actualizarMascotas, mascotaPendiente, mascotaAdoptada, mascotaDisponible, buscarMascotas, cargarImagen } from '../controllers/mascotas.controller.js';

const router = Router();

router.get('/mascotas', listarMascotas);
router.get('/mascotas/:codigo', buscarMascotas);
router.post('/mascotas',cargarImagen, registrarMascotas);
router.delete('/mascotas/:codigo', mascotaEliminada);
router.put('/mascotas/:codigo', actualizarMascotas);
router.put('/mascotas/pendiente/:codigo', mascotaPendiente);
router.put('/mascotas/adoptada/:codigo', mascotaAdoptada);
router.put('/mascotas/disponible/:codigo', mascotaDisponible);

export default router;

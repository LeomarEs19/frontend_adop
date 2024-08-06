import { check } from 'express-validator';

export const middlewaresCreatePublics = [
    check('nombre', 'El nombre es obligatorio y debe tener entre 2 y 50 caracteres').not().isEmpty().isLength({ min: 2 }),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('imagen', 'La imagen debe ser opcional y tener una longitud máxima de 255 caracteres').optional(),
    check('fuentes', 'Las fuentes son obligatorias y deben tener una longitud máxima de 100 caracteres').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio').not().isEmpty(),
    check('id_usuario', 'El ID de usuario es obligatorio y debe ser un número entero').not().isEmpty().isInt()
];

export const middlewaresUpdatePublics = [
    check('nombre', 'El nombre debe tener entre 2 y 50 caracteres').optional().isLength({ min: 2 }),
    check('descripcion', 'La descripción es inválida').optional().not().isEmpty(),
    check('imagen', 'La imagen debe tener una longitud máxima de 255 caracteres').optional(),
    check('fuentes', 'Las fuentes deben tener una longitud máxima de 100 caracteres').optional(),
    check('tipo', 'El tipo es inválido').optional().not().isEmpty(),
    check('id_usuario', 'El ID de usuario debe ser un número entero').optional().isInt()
];

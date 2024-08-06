import { check } from "express-validator";

export const middlewaresShowArticles = [
    check('nombre', 'El nombre es obligatorio y debe tener entre 2 y 50 caracteres').not().isEmpty().isLength({ min: 2, max: 255 }),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('enlace', 'El enlace es obligatorio y debe tener una longitud máxima de 225 caracteres').not().isEmpty().isLength({ max: 225 }),
    check('autor', 'El autor es obligatorio y debe tener entre 3 y 100 caracteres').not().isEmpty().isLength({ min: 3, max: 100 }),
    check('id_usuario', 'El ID de usuario es obligatorio y debe ser un número entero').not().isEmpty().isInt()
];

export const middlewaresUpdateArticles = [
    check('nombre', 'El nombre debe tener entre 2 y 50 caracteres').optional().isLength({ min: 2, max: 50 }),
    check('descripcion', 'La descripción es inválida').optional().not().isEmpty(),
    check('enlace', 'El enlace debe tener una longitud máxima de 225 caracteres').optional().isLength({ max: 225 }),
    check('autor', 'El autor debe tener entre 3 y 100 caracteres').optional().isLength({ min: 3, max: 100 }),
    check('id_usuario', 'El ID de usuario debe ser un número entero').optional().isInt()
];

import {check} from 'express-validator'

export const middlewaresCreateComentario =[
    check('comentario','comentario, campo oblogatorio').not().isEmpty().isLength({ min: 2, max: 250 }).isString(),
    check('id_usuario','usuario invalido').not().isEmpty().isInt(),
    check('id_publicacion', 'publicacion no encontrada').not().isEmpty().isInt()
];
export const middlewaresUpdateComentario=[
  check('comentario','comentario, campo oblogatorio').optional().isLength({ min: 2, max: 250 }).isString(),
  check('id_usuario','usuario invalido').not().isEmpty().optional().isInt(),
  check('id_publicacion', 'publicacion no encontrada').not().isEmpty().optional().isInt()
];
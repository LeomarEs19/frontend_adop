import {check} from 'express-validator'

export const middlewaresCreateUsers =[
    check('nombre_completo','nombre, campo oblogatorio').not().isEmpty().isLength({ min: 3, max: 100 }).isString(),
    check('correo','correo invalido').not().isEmpty().isEmail(),
    check('clave', 'la clave es de caracter obligatorio').not().isEmpty().isLength({ min: 3, max: 100 }),
];
export const middlewaresUpdate=[
  check('nombre_completo','falta el nombre').optional().isLength({ min: 3, max: 100 }).isString().optional(),
  check('correo','correo invalido').isEmail().optional(),
  check('clave','clave').isLength({ min: 3, max: 100 }).isString().optional(),
];

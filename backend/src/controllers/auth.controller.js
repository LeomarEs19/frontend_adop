import { pool } from '../database/conexion.js'
import jwt from 'jsonwebtoken'


export const login = async (req, res) => {
    try {
        const { correo, clave } = req.body;
        
        const [resultado] = await pool.query('SELECT id, nombre_completo, correo, telefono, rol FROM usuarios WHERE correo=? AND clave=?', [correo, clave]);
        const user = resultado[0];

        if (user) {
            const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.AUTH_SECRET, { expiresIn: process.env.AUTH_EXPIRE });
            return res.status(200).json({
                token,
                user
            });
        } else {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

    } catch (error) {
        return res.status(500).json({
            mensaje: error.message
        });
    }
};


export const register = async (req, res) => {
    try {
        const { nombre_completo, correo, clave, telefono } = req.body;

        const [resultado] = await pool.query("INSERT INTO usuarios (nombre_completo, correo, clave, telefono) VALUES (?, ?, ?, ?)", [nombre_completo, correo, clave, telefono]);

        if (resultado.affectedRows > 0) {
            return res.status(201).json({
                mensaje: "Usuario registrado con éxito"
            });
        } else {
            return res.status(400).json({
                mensaje: "No se ha podido registrar el usuario"
            });
        }

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};


export const validarToken = async (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.status(401).json({
                mensaje: "El token es requerido"
            });
        } else {
            jwt.verify(token, process.env.AUTH_SECRET, (error) => {
                if (error) {
                    return res.status(401).json({
                        mensaje: "Token incorrecto"
                    });
                } else {
                    next();
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

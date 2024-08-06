import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

// Listar Usuarios
export const listartodo = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT * FROM usuarios");
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                message: "No hay usuarios registrados"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export const crearUnUsuario = async (req, res) => {
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(404).json({ error });
        }
        const { nombre_completo, correo, clave, telefono } = req.body;
        const [resultado] = await pool.query(
            "INSERT INTO usuarios(nombre_completo, correo, clave, telefono) VALUES (?, ?, ?, ?)",
            [nombre_completo, correo, clave, telefono]
        );

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": "El usuario ha sido creado con éxito!!!!!"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se pudo crear el usuario"
            });
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
};



// Actualizar Usuario
export const actualizarUnUsuario = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { nombre_completo, correo, clave, telefono } = req.body;

        // Verificar si el usuario existe
        const [oldUser] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        if (oldUser.length === 0) {
            return res.status(404).json({
                message: "No se encontró un usuario con ese ID"
            });
        }

        // Actualizar el usuario
        const [resultado] = await pool.query(`
            UPDATE usuarios SET 
            nombre_completo = ?, 
            correo = ?, 
            clave = ?,
            telefono = ?
            WHERE id = ?`, [
            nombre_completo || oldUser[0].nombre_completo,
            correo || oldUser[0].correo,
            clave || oldUser[0].clave,
            telefono || oldUser[0].telefono,
            id
        ]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                message: "El usuario ha sido actualizado con éxito"
            });
        } else {
            res.status(404).json({
                message: "No se pudo actualizar el usuario"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Mostrar Usuario por ID
export const mostrarunusuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({
                message: "No se encontró este usuario"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Eliminar Usuario
export const eliminarUnUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
        if (resultado.affectedRows > 0) {
            res.status(200).json({
                message: "Se eliminó exitosamente el usuario y los registros relacionados"
            });
        } else {
            res.status(404).json({
                message: "No se encontró ningún usuario con ese ID y no se pudo eliminar"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Contar todos los usuarios
export const contarUsuarios = async (req, res) => {
    try {
        const [resultado] = await pool.query("SELECT COUNT(*) as total FROM usuarios");
        if (resultado[0].total === 0) {
            res.status(404).json({ message: "No se encontraron usuarios" });
        } else {
            res.status(200).json({ total: resultado[0].total });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import { pool } from "../database/conexion.js";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
export const cargarImagen = upload.single('foto');

export const registrarMascotas = async (req, res) => {
    try {
        const { nombre, genero, edad, tipo, descripcion, ubicacion, castrado, vacunas, fk_municipio, antecedentes } = req.body;
        const foto = req.file.originalname;
        const estado = 'En Adopcion';

        const [result] = await pool.query(
            "INSERT INTO mascotas (nombre, genero, edad, tipo, foto, descripcion, ubicacion, castrado, vacunas, fk_municipio, antecedentes, estado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
            [nombre, genero, edad, tipo, foto, descripcion, ubicacion, castrado, vacunas, fk_municipio, antecedentes, estado]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Mascota registrada con éxito'
            });
        } else {
            res.status(404).json({
                message: 'Error al registrar la mascota'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor ' + error
        });
    }
};


export const listarMascotas = async (req, res) => {
    try {
        const [todos] = await pool.query(`
            SELECT 
                m.codigo,
                m.nombre,
                m.genero,
                m.edad,
                m.tipo,
                m.foto,
                m.descripcion,
                m.ubicacion,
                m.castrado,
                m.vacunas,
                m.fk_municipio,
                mu.nombre AS municipio,
                m.antecedentes,
                m.estado
            FROM 
                mascotas m
            LEFT JOIN 
                municipio mu ON m.fk_municipio = mu.codigo
            WHERE 
                m.estado = 'En Adopcion' OR m.estado = 'En Proceso'
        `);

        if (todos.length > 0) {
            res.status(200).json({ todos });
        } else {
            res.status(404).json({ message: 'No hay mascotas registradas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el sistema: ' + error });
    }
};


export const mascotaAdoptada = async (req, res) => {
    try {
        const { codigo } = req.params;
        const [result] = await pool.query("UPDATE mascotas SET estado = 'Adoptado' WHERE codigo = ?", [codigo]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'La mascota fue adoptada con éxito'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};

export const mascotaPendiente = async (req, res) => {
    try {
        const { codigo } = req.params;
        const [pendiente] = await pool.query("UPDATE mascotas SET estado = 'En Proceso' WHERE codigo = ?", [codigo]);

        if (pendiente.affectedRows > 0) {
            res.status(200).json({
                message: 'Pronto nos comunicaremos contigo'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};

export const mascotaDisponible = async (req, res) => {
    try {
        const { codigo } = req.params;
        const [disponible] = await pool.query("UPDATE mascotas SET estado = 'En Adopcion' WHERE codigo = ?", [codigo]);

        if (disponible.affectedRows > 0) {
            res.status(200).json({
                message: 'La mascota está disponible para adoptar'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};

export const mascotaEliminada = async (req, res) => {
    try {
        const { codigo } = req.params;
        const [result] = await pool.query("DELETE FROM mascotas WHERE codigo = ?", [codigo]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'La mascota fue eliminada con éxito'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};

export const actualizarMascotas = async (req, res) => {
    try {
        const { codigo } = req.params;
        const { nombre, genero, edad, tipo, descripcion, ubicacion, castrado, vacunas, fk_municipio, antecedentes } = req.body;
        const foto = req.file ? req.file.originalname : null;

        const [result] = await pool.query(
            'UPDATE mascotas SET nombre = IFNULL(?, nombre), genero = IFNULL(?, genero), edad = IFNULL(?, edad), tipo = IFNULL(?, tipo), foto = IFNULL(?, foto), descripcion = IFNULL(?, descripcion), ubicacion = IFNULL(?, ubicacion), castrado = IFNULL(?, castrado), vacunas = IFNULL(?, vacunas), fk_municipio = IFNULL(?, fk_municipio), antecedentes = IFNULL(?, antecedentes) WHERE codigo = ?',
            [nombre, genero, edad, tipo, foto, descripcion, ubicacion, castrado, vacunas, fk_municipio, antecedentes, codigo]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Mascota actualizada con éxito'
            });
        } else {
            res.status(404).json({
                message: 'No se pudo actualizar la mascota'
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error });
    }
};


export const buscarMascotas = async (req, res) => {
    try {
        const { codigo } = req.params;
        const [buscar] = await pool.query(`
            SELECT 
                codigo,
                nombre,
                genero,
                edad,
                tipo,
                foto,
                descripcion,
                ubicacion,
                castrado,
                vacunas,
                fk_municipio,
                antecedentes,
                estado
            FROM 
                mascotas
            WHERE 
                codigo = ?
        `, [codigo]);

        if (buscar.length > 0) {
            res.status(200).json({ buscar });
        } else {
            res.status(404).json({
                message: 'No se encontró la mascota'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error.message
        });
    }
};

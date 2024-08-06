import { pool } from "../database/conexion.js";

export const registrarAdopciones = async (req, res) => {
    try {
        const { fk_mascota, fk_usuario, numero_celular } = req.body;

        // Aquí asumimos que el estado '2' corresponde a 'En Proceso'
        const [adoptar] = await pool.query(
            "INSERT INTO adopciones (fk_mascota, fk_usuario, numero_celular, estado) VALUES (?, ?, ?, '2')",
            [fk_mascota, fk_usuario, numero_celular]
        );

        if (adoptar.affectedRows > 0) {
            res.status(200).json({
                message: 'Adopción registrada con éxito'
            });
        } else {
            res.status(404).json({
                message: 'Error al registrar la adopción'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};

export const confirmacionAdopcion = async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener detalles de la adopción actual
        const [adopcion] = await pool.query('SELECT * FROM adopciones WHERE id = ?', [id]);

        if (!adopcion.length) {
            return res.status(404).json({ message: 'Adopción no encontrada' });
        }

        // Actualizar el estado de la adopción a 'aceptado' (estado 1) en la tabla adopciones
        const [updateResult] = await pool.query('UPDATE adopciones SET estado = 1 WHERE id = ?', [id]);
        if (updateResult.affectedRows === 0) {
            return res.status(500).json({ message: 'No se pudo actualizar el estado de la adopción' });
        }

        // Mover la adopción al historial
        await pool.query(
            `INSERT INTO adopciones_historico (fk_mascota, fk_usuario, numero_celular, estado, fecha) 
             VALUES (?, ?, ?, 'aceptado', ?)`,
            [adopcion[0].fk_mascota, adopcion[0].fk_usuario, adopcion[0].numero_celular, adopcion[0].fecha]
        );

        res.status(200).json({ message: 'Adopción aceptada y movida al historial' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error });
    }
};



export const listarAdopciones = async (req, res) => {
    try {
        const [adopciones] = await pool.query(`
            SELECT 
                adopciones.id,
                mascotas.nombre AS nombre_mascota,
                usuarios.nombre_completo AS nombre_usuario,
                adopciones.numero_celular AS telefono,
                adopciones.fk_mascota AS mascota_codigo,
                usuarios.cedula AS usuario_cedula,
                usuarios.correo AS usuario_correo,
                adopciones.estado AS estado_adopcion,
                DATE_FORMAT(adopciones.fecha, '%Y-%m-%d') AS fecha_creacion
            FROM 
                adopciones
            LEFT JOIN 
                mascotas ON adopciones.fk_mascota = mascotas.codigo
            LEFT JOIN 
                usuarios ON adopciones.fk_usuario = usuarios.id
            WHERE adopciones.estado = '2'
        `);

        if (adopciones.length > 0) {
            res.status(200).json({ adopciones });
        } else {
            res.status(404).json({ message: 'No hay adopciones registradas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el sistema: ' + error });
    }
};


export const listarMisAdopciones = async (req, res) => {
    try {
        const { id } = req.params;
        const [misAdopciones] = await pool.query(`
            SELECT 
                adopciones.id,
                mascotas.nombre AS nombre_mascota,
                usuarios.nombre_completo AS nombre_usuario,
                adopciones.numero_celular AS telefono,
                adopciones.fk_mascota AS mascota_codigo,
                adopciones.fk_usuario AS usuario_id,
                CASE 
                    WHEN adopciones.estado = '3' THEN 'rechazado'
                    WHEN adopciones.estado = '2' THEN 'pendiente'
                    WHEN adopciones.estado = '1' THEN 'aceptado'
                END AS estado_adopcion,
                mascotas.tipo AS tipo_mascota,
                DATE_FORMAT(adopciones.fecha, '%Y-%m-%d') AS fecha_creacion
            FROM 
                adopciones
            LEFT JOIN 
                mascotas ON adopciones.fk_mascota = mascotas.codigo
            LEFT JOIN 
                usuarios ON adopciones.fk_usuario = usuarios.id
            WHERE 
                usuarios.id = ?
        `, [id]);

        if (misAdopciones.length > 0) {
            res.status(200).json({ misAdopciones });
        } else {
            res.status(404).json({ message: 'No hay adopciones registradas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el sistema: ' + error });
    }
};



export const eliminarAdopcion = async (req, res) => {
    try {
        const { id } = req.params;
        const [eliminar] = await pool.query("DELETE FROM adopciones WHERE id = ?", [id]);

        if (eliminar.affectedRows > 0) {
            res.status(200).json({
                message: 'Adopción eliminada con éxito'
            });
        } else {
            res.status(404).json({
                message: 'No se pudo eliminar la adopción'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};

export const rechazarAdopcion = async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener detalles de la adopción actual
        const [adopcion] = await pool.query('SELECT * FROM adopciones WHERE id = ?', [id]);

        if (!adopcion.length) {
            return res.status(404).json({ message: 'Adopción no encontrada' });
        }

        const { fk_mascota, fk_usuario, numero_celular, fecha } = adopcion[0];

        // Actualizar el estado de la adopción a 'rechazado'
        const [rechazar] = await pool.query("UPDATE adopciones SET estado = '3' WHERE id = ?", [id]);

        if (rechazar.affectedRows > 0) {
            // Mover la adopción al historial con la razón del rechazo
            await pool.query(
                `INSERT INTO adopciones_historico (fk_mascota, fk_usuario, numero_celular, estado, fecha) 
                 VALUES (?, ?, ?, 'rechazado', ?)`,
                [fk_mascota, fk_usuario, numero_celular, fecha]
            );

            res.status(200).json({
                message: 'Adopción rechazada y movida al historial con éxito'
            });
        } else {
            res.status(404).json({
                message: 'Error al rechazar la adopción'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor: ' + error
        });
    }
};
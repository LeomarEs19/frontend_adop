import { pool } from "../database/conexion.js";

// Listar adopciones históricas con detalles
export const listarAdopcionesHistorico = async (req, res) => {
    try {
        const [historico] = await pool.query(`
            SELECT 
                ah.id,
                usuario.nombre_completo AS usuario_nombre,
                mascota.nombre AS mascota_nombre,
                ah.numero_celular,
                ah.estado,
                ah.fecha
            FROM adopciones_historico ah
            JOIN usuarios usuario ON ah.fk_usuario = usuario.id
            JOIN mascotas mascota ON ah.fk_mascota = mascota.codigo
        `);

        res.status(200).json(historico);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error });
    }
};

// Eliminar adopción histórica
export const eliminarAdopcionHistorico = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query('DELETE FROM adopciones_historico WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Adopción histórica eliminada con éxito' });
        } else {
            res.status(404).json({ message: 'Adopción histórica no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error });
    }
};

/*
    * Listar Todos Los articulos x
    * Crear Un articulos x
    * Actualizar Un articulos x
    * Mostrar Un articulos x
    * Eliminar Un articulos x
    * Contar publicaciones x
    * Listar publicaciones por fechas x
*/

import { pool } from '../database/conexion.js';

export const listarMunicipios = async (req, res) => {
    try {
      const [municipios] = await pool.query(`
        SELECT
          municipio.codigo,
          municipio.nombre
        FROM municipio
      `);
  
      if (municipios.length > 0) {
        res.status(200).json(municipios); 
      } else {
        res.status(404).json({ message: 'No hay municipios registrados' });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error al obtener los municipios: ' + error
      });
    }
  };
export const registrarMunicipios = async (req,res)=>{
    try{
        const {nombre} = req.body
        const [result] = await pool.query("INSERT INTO municipio (nombre) VALUES (?)", [nombre])
        if(result.affectedRows > 0){
            res.status(200).json({message: 'Municipio registrado con éxito'})
        }
        else{
            res.status(404).json({
                message: 'No fue posible registrar el municipio'
            })
        }
    }catch(error){
        res.status(500).json({
            message: 'Error del servidor: '+error
        })
    }
}
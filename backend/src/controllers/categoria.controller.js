import { pool } from "../database/conexion.js"

export const listarCategoria = async (req,res)=>{
    try{
        const [categorias] = await pool.query("SELECT * FROM categorias")
        if(categorias.length > 0){
            res.json(categorias)
        }
        else{
            res.status(404).json({message: 'No hay generos registrados'})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Error al obtener los generos'})
    }
 
}
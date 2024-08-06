import { pool } from "../database/conexion.js"

export const listarGeneros = async (req,res)=>{
    try{
        const [generos] = await pool.query("SELECT * FROM genero")
        if(generos.length > 0){
            res.json(generos)
        }
        else{
            res.status(404).json({message: 'No hay generos registrados'})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({message: 'Error al obtener los generos'})
    }
}
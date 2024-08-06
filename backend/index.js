import express from 'express'
import body_parser from 'body-parser'
import rutaAdopciones from './src/routes/adopciones.routes.js'
import rutaMascotas from './src/routes/mascotas.routes.js'
import rutaMunicipios from './src/routes/municipios.routes.js'
import rutasUsuarios from './src/routes/usuarios.routes.js'
import rutasAuth from './src/routes/auth.routes.js'
import rutaCategoria from './src/routes/categoria.routes.js'
import rutaGenero from './src/routes/genero.routes.js'
import rutaHistorial from './src/routes/historial.routes.js'
import { validarToken } from './src/controllers/auth.controller.js'
import cors from 'cors'

const server = express()
const PORT = 3333

// Configuración
server.use(body_parser.json())
server.use(body_parser.urlencoded({ extended: false }))
server.use(cors())

// Ejs
server.set('view engine', 'ejs')
server.set('views', './views')
server.use('/public', express.static('./public'))
server.get('/document', (req, res) => {
    res.render('document.ejs')
})

// Rutas
server.use(rutasAuth)
server.use(validarToken, rutaMascotas)
server.use(validarToken, rutaMunicipios)
server.use(validarToken, rutasUsuarios)
server.use(validarToken, rutaCategoria)
server.use(validarToken, rutaAdopciones)
server.use(validarToken, rutaGenero)
server.use(validarToken, rutaHistorial)

server.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto http://localhost:${PORT}`);
})

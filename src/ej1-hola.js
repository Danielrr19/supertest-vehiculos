// Importamos Express, la herramienta que construye la API
import express from 'express'

// Creamos la aplicación (el "restaurante")
const app = express()

// Ruta GET /hola: cuando alguien la pida, responde con un JSON
app.get('/hola', (req, res) => {
    res.json({ mensaje: 'Hola mundo' })
})

// Exportamos la app para que Supertest pueda usarla
// (no la encendemos aquí; Supertest lo hace por su cuenta)
export default app
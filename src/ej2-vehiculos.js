import express from 'express'

const app = express()

// Datos de ejemplo en memoria (no usamos base de datos)
const vehiculos = [
    { id: 1, placa: 'P123-456', marca: 'Toyota', anio: 2020 },
    { id: 2, placa: 'P789-012', marca: 'Honda', anio: 2018 }
]

// GET /vehiculos devuelve la lista completa
app.get('/vehiculos', (req, res) => {
    res.json(vehiculos)
})

export default app
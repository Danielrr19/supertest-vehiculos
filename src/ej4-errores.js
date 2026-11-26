import express from 'express'

const app = express()

const vehiculos = [
    { id: 1, placa: 'P123-456', marca: 'Toyota', anio: 2020 }
]

// GET /vehiculos/:id busca un vehículo por su id
app.get('/vehiculos/:id', (req, res) => {
    // req.params.id llega como texto; lo convertimos a número
    const vehiculo = vehiculos.find(v => v.id === Number(req.params.id))

    // Si no existe, respondemos 404 (no encontrado)
    if (!vehiculo) {
        return res.status(404).json({ error: 'Vehículo no encontrado' })
    }
    res.json(vehiculo)
})

// Esto va AL FINAL: si ninguna ruta anterior coincidió, llega aquí
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' })
})

export default app
import express from 'express'

const app = express()
app.use(express.json())

const DATOS_INICIALES = [
    { id: 1, placa: 'P123-456', marca: 'Toyota', anio: 2020 },
    { id: 2, placa: 'P789-012', marca: 'Honda', anio: 2018 }
]
let vehiculos = [...DATOS_INICIALES]

export function reiniciarDatos() {
    vehiculos = [...DATOS_INICIALES]
}

// GET: lista completa
app.get('/vehiculos', (req, res) => {
    res.json(vehiculos)
})

// GET: un vehículo por id
app.get('/vehiculos/:id', (req, res) => {
    const vehiculo = vehiculos.find(v => v.id === Number(req.params.id))
    if (!vehiculo) {
        return res.status(404).json({ error: 'Vehículo no encontrado' })
    }
    res.json(vehiculo)
})

// POST: crear
app.post('/vehiculos', (req, res) => {
    const { placa, marca, anio } = req.body ?? {}
    if (!placa || !marca || !anio) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' })
    }
    const nuevo = { id: vehiculos.length + 1, placa, marca, anio }
    vehiculos.push(nuevo)
    res.status(201).json(nuevo)
})

// PUT: actualizar
app.put('/vehiculos/:id', (req, res) => {
    const i = vehiculos.findIndex(v => v.id === Number(req.params.id))
    if (i === -1) {
        return res.status(404).json({ error: 'Vehículo no encontrado' })
    }
    // Mezclamos datos viejos con nuevos; el id nunca cambia
    vehiculos[i] = { ...vehiculos[i], ...req.body, id: vehiculos[i].id }
    res.json(vehiculos[i])
})

// DELETE: eliminar
app.delete('/vehiculos/:id', (req, res) => {
    const i = vehiculos.findIndex(v => v.id === Number(req.params.id))
    if (i === -1) {
        return res.status(404).json({ error: 'Vehículo no encontrado' })
    }
    vehiculos.splice(i, 1)
    // 204 = "hecho, y no hay nada que devolver"
    res.status(204).send()
})

// Cualquier otra ruta: 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' })
})

export default app
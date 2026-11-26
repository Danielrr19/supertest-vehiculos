import express from 'express'

const app = express()

// Permite que la API entienda el JSON que llega en el body del pedido
app.use(express.json())

// Datos iniciales (se copian para poder volver a ellos)
const DATOS_INICIALES = [
    { id: 1, placa: 'P123-456', marca: 'Toyota', anio: 2020 },
    { id: 2, placa: 'P789-012', marca: 'Honda', anio: 2018 }
]
let vehiculos = [...DATOS_INICIALES]

// Vuelve a los datos originales; la usamos antes de cada prueba
export function reiniciarDatos() {
    vehiculos = [...DATOS_INICIALES]
}

// GET /vehiculos: sirve para comprobar que el POST sí guardó el dato
app.get('/vehiculos', (req, res) => {
    res.json(vehiculos)
})

// POST /vehiculos: registra un vehículo nuevo
app.post('/vehiculos', (req, res) => {
    // "?? {}" evita un error si no llega ningún body
    const { placa, marca, anio } = req.body ?? {}

    // Si falta algún dato, respondemos 400 (solicitud incorrecta)
    if (!placa || !marca || !anio) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' })
    }

    // Armamos el vehículo nuevo con un id consecutivo
    const nuevo = { id: vehiculos.length + 1, placa, marca, anio }
    vehiculos.push(nuevo)

    // 201 = "creado correctamente"
    res.status(201).json(nuevo)
})

export default app
import { describe, test, expect, beforeEach } from 'vitest'
import request from 'supertest'
import app, { reiniciarDatos } from './ej5-api-completa.js'

describe('Ejercicio 5: API completa', () => {
    // Datos limpios antes de cada prueba
    beforeEach(() => {
        reiniciarDatos()
    })

    test('GET /vehiculos/1 devuelve un vehículo', async () => {
        const res = await request(app).get('/vehiculos/1')

        expect(res.status).toBe(200)
        expect(res.body.placa).toBe('P123-456')
    })

    test('PUT /vehiculos/1 actualiza la marca', async () => {
        const res = await request(app).put('/vehiculos/1').send({ marca: 'Mazda' })

        expect(res.status).toBe(200)
        expect(res.body.marca).toBe('Mazda')
        expect(res.body.placa).toBe('P123-456') // lo demás no cambia
    })

    test('DELETE /vehiculos/1 elimina y luego da 404', async () => {
        const eliminar = await request(app).delete('/vehiculos/1')
        expect(eliminar.status).toBe(204)

        // Al buscarlo de nuevo, ya no existe
        const buscar = await request(app).get('/vehiculos/1')
        expect(buscar.status).toBe(404)
    })
})
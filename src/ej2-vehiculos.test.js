import { describe, test, expect } from 'vitest'
import request from 'supertest'
import app from './ej2-vehiculos.js'

describe('Ejercicio 2: GET /vehiculos', () => {
    test('devuelve la lista de vehículos en JSON', async () => {
        const res = await request(app).get('/vehiculos')

        expect(res.status).toBe(200)

        // Comprobamos que la respuesta sea JSON (revisa el encabezado)
        expect(res.headers['content-type']).toMatch(/json/)

        // Debe ser una lista...
        expect(Array.isArray(res.body)).toBe(true)

        // ...con 2 vehículos...
        expect(res.body).toHaveLength(2)

        // ...y el primero debe ser el esperado
        expect(res.body[0].marca).toBe('Toyota')
    })
})
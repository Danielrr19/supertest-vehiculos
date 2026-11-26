import { describe, test, expect } from 'vitest'
import request from 'supertest'
import app from './ej4-errores.js'

describe('Ejercicio 4: errores 404', () => {
    // Caso 1: la ruta ni siquiera existe
    test('ruta que no existe', async () => {
        const res = await request(app).get('/ruta-inexistente')

        expect(res.status).toBe(404)
        expect(res.body.error).toBe('Ruta no encontrada')
    })

    // Caso 2: la ruta existe, pero el vehículo no
    test('vehículo que no existe', async () => {
        // El id 999 no está en la lista
        const res = await request(app).get('/vehiculos/999')

        expect(res.status).toBe(404)
        expect(res.body.error).toBe('Vehículo no encontrado')
    })
})
import { describe, test, expect } from 'vitest'

// "request" es el cliente de prueba de Supertest
import request from 'supertest'
import app from './ej1-hola.js'

describe('Ejercicio 1: GET /hola', () => {
    // async/await: esperamos a que la API responda antes de revisar
    test('responde 200 con un mensaje', async () => {
        // Supertest hace el pedido GET a la app, sin servidor real
        const res = await request(app).get('/hola')

        // res.status = código HTTP (200 = todo bien)
        expect(res.status).toBe(200)

        // res.body = el JSON que devolvió la API
        // toEqual compara objetos completos
        expect(res.body).toEqual({ mensaje: 'Hola mundo' })
    })
})
import { describe, test, expect, beforeEach } from 'vitest'
import request from 'supertest'
import app, { reiniciarDatos } from './ej3-crear.js'

describe('Ejercicio 3: POST /vehiculos', () => {
    // Antes de CADA prueba, los datos vuelven al estado original
    beforeEach(() => {
        reiniciarDatos()
    })

    test('crea un vehículo y responde 201', async () => {
        const nuevo = { placa: 'P555-111', marca: 'Nissan', anio: 2022 }

        // .send() manda el JSON en el body del pedido
        const res = await request(app).post('/vehiculos').send(nuevo)

        expect(res.status).toBe(201)

        // toMatchObject: la respuesta debe CONTENER estos datos
        // (puede tener más, como el id)
        expect(res.body).toMatchObject(nuevo)
        expect(res.body.id).toBeDefined() // el id fue generado

        // Comprobamos que realmente se guardó: ahora hay 3 vehículos
        const lista = await request(app).get('/vehiculos')
        expect(lista.body).toHaveLength(3)
    })

    test('responde 400 si faltan datos', async () => {
        // Enviamos solo la marca; faltan placa y año
        const res = await request(app).post('/vehiculos').send({ marca: 'Kia' })

        expect(res.status).toBe(400)
        expect(res.body.error).toBe('Faltan datos obligatorios')
    })
})
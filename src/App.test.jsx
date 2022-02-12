import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, beforeEach, vi } from 'vitest'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import App from './App';

const seedResponse = rest.get("seeds", (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json([
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
            { type: "oats", variety: "bronco"},
            { type: "barley", variety: "variety_not_stated"},
        ])
    )
})

const warehouseResponse = rest.get("warehouse", (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json([
            {
                id: 1,
                name: "warehouse_test",
                rows: 4, 
                columns: 4
            }
        ])
    )
})

const handlers = [warehouseResponse, seedResponse]

const server = new setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

it('test something', async () => {
    render(<App />)
    screen.debug()
})


 
 






// describe('App component tests', () => {
//     beforeEach(() => {
//         render(<App />)
//     })

//     it('shows palletPal heading', () => {
//         expect(screen.getByRole('heading', { name: 'Loading Warehouse List....' })).toBeInTheDocument()
//     })
// })




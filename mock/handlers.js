import {rest} from 'msw'

export const handlers = [

  rest.get('/https://obscure-bayou-76349.herokuapp.com/warehouses', (req, res, ctx) => {
    return res(
      ctx.status(200), 
      ctx.json([{"id":1,"name":"warehouse_01","rows":4,"columns":4}])
      )
  }),

  rest.post('/https://obscure-bayou-76349.herokuapp.com/warehouse/${state.warehouse.id}/locations', (req, res, ctx) => {
    
  })
]
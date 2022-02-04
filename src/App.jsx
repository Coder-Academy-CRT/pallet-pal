import React, { useEffect, useState, useReducer } from 'react'
import Warehouse from './components/warehouse_components/Warehouse'
import Sidebar from './components/sidebar_components/Sidebar'
import LandingPage from './components/landing_components/LandingPage'
import './style.scss'
import palletpalContext from './palletpalContext'
import reducer from './reducer'
import api from './api'

const initialState = {
    // warehouse: { id: 1, name: 'warehouse_01', rows: 4, columns: 4 },
    warehouse: {},
    products: [],
    locations: [],
    seeds: [],
    lots: [],
    clickedLocation: "", // location object contains all location info
    selectedMoveLocation: '', // these two values can be utilised to show where moved from and where moved to
    palletOption: '',
    selectedPallet: {}, // {pallet_id: #, products_on_pallet: []} 
    foundPallets: [],
    availableLocations: [], // for move
    metaMode: 'landing', // options include "landing" "build" "main" to cater for various levels
    microModes: [],

    // ***NOTE*** replace this list when warehouse list enpoint ready
    warehouseList: [
        { id: 1, name: 'warehouse_01', rows: 4, columns: 4 },
        { id: 2, name: 'warehouse_02', rows: 4, columns: 4 }
    ]
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(async () => {
        if (state.metaMode == 'main') {
            // location information into state

            const res_locations = await api.get(
                `warehouse/${state.warehouse.id}/locations`
            )
            dispatch({
                type: 'setLocationData',
                data: res_locations.data
            })
            //  product information into state
            const res_products = await api.get(
                `warehouse/${state.warehouse.id}/products`
            )
            dispatch({
                type: 'setProductData',
                data: res_products.data
            })

            //  lot information into state

            const res_lots = await api.get(
                `warehouse/${state.warehouse.id}/lots`
            )
            dispatch({
                type: 'setLotsInWarehouse',
                data: res_lots.data
            })
        }

        const res_seeds = await api.get('seeds')
        dispatch({
            type: 'setSeeds',
            data: res_seeds.data
        })
    }, [state.metaMode])

    if (state.metaMode == 'landing') {
        return (
            <palletpalContext.Provider value={{ state, dispatch }}>
                <LandingPage />
            </palletpalContext.Provider>
        )
    } else {
        // other two modes will only apply directly to Warehouse or Sidebar rendered components

        // should think of another option but this will suffice for now to allow content to load
        // Maybe check the status return from db? 304?
        return state.seeds.length == 22 ? (
            <palletpalContext.Provider value={{ state, dispatch }}>
                <Warehouse />
                <Sidebar></Sidebar>
            </palletpalContext.Provider>
        ) : (
            <h1 style={{ padding: '100px', color: 'green', fontSize: '3em' }}>
                palletPAL is loading....
            </h1>
        )
    }
}

import React, { useEffect, useReducer } from 'react'
import Warehouse from './components/warehouse_components/Warehouse'
import Sidebar from './components/sidebar_components/Sidebar'
import LandingPage from './components/landing_components/LandingPage'
import './style.scss'
import palletpalContext from './palletpalContext'
import reducer from './reducer'
import api from './api'

const initialState = {
    // warehouse: { id: 1, name: 'warehouse_01', rows: 4, columns: 4 },
    warehouse: null,
    tempWarehouse: null,
    products: [],
    locations: [],
    seeds: [],
    lots: [],
    clickedLocation: null, // location object contains all location info USE FOR LOCATION DETAILS RENDER ONLY
    // selectedMoveLocation: '', // these two values can be utilised to show where moved from and where moved to
    moveFromLocation: null, // this coordinates string is set on click of a palletcard Move button
    moveToLocation: null, // this coordinates string is set by location when clicked while microMode MOVE is true
    movingPalletId: null,
    selectedPallet: {}, // {pallet_id: #, products_on_pallet: []} // IS THIS REQUIRED?
    foundPallets: [],
    // availableLocations: [], // for move
    metaMode: 'landing', // options include "landing" "build" "main" to cater for various levels
    microModes: {
        SearchWindow: false,
        LotManager: false,
        LocationDetails: false,
        Edit: false,
        Move: false,
        Dispatch: false,
        AddPallet: false
    },

    // ***NOTE*** replace this list when warehouse list endpoint ready
    warehouseList: null
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
                data: {
                    allLocations: res_locations.data,
                    rows: state.warehouse.rows,
                    columns: state.warehouse.columns
                }
            })

            //  product information into state
            const res_products = await api.get(
                `warehouse/${state.warehouse.id}/products`
            )
            console.log(res_products)
            if (res_products.status == '200') {
                dispatch({
                    type: 'setProductData',
                    data: res_products.data
                })
            }

            //  lot information into state

            const res_lots = await api.get(
                `warehouse/${state.warehouse.id}/lots`
            )
            dispatch({
                type: 'setLotsInWarehouse',
                data: res_lots.data
            })
        }
        const wh_list = await api.get(`warehouses`)
        dispatch({
            type: 'setWarehouseList',
            data: wh_list.data
        })

        const res_seeds = await api.get('seeds')
        dispatch({
            type: 'setSeeds',
            data: res_seeds.data
        })
    }, [state.metaMode])

    console.log(JSON.stringify(state))
    if (state.metaMode == 'landing') {
        return state.warehouseList ? (
            <palletpalContext.Provider value={{ state, dispatch }}>
                <LandingPage />
            </palletpalContext.Provider>
        ) 
        : (
            <h1 style={{ padding: '100px', color: 'green', fontSize: '3em' }}>
                Loading Warehouse List....
            </h1>
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

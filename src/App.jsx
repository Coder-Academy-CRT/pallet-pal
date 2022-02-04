import React, { useEffect, useState, useReducer } from "react"
import Warehouse from "./components/warehouse_components/Warehouse"
import Sidebar from "./components/sidebar_components/Sidebar"
import "./style.scss"
import palletpalContext from "./palletpalContext"
import reducer from "./reducer"
import api from "./api"

const initialState = {
    warehouse: { id: 1, name: "warehouse_01", rows: 4, columns: 4 },
    products: [],
    locations: [],
    seeds: [],
    lots: [],
    clickedLocation: "", // coordinates
    selectedMoveLocation: "", // these two values can be utilised to show where moved from and where moved to
    palletOption: "",
    selectedPallet: "", // for edit, move, dispatch or we can replace it with logic if we don't want them to stay in store
    foundPallets: [],
    metaMode: "main", // options include "landing" "build" "main" to cater for various levels
    microModes: []
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(async () => {
        // location information into state

        const res_locations = await api.get(
            `warehouse/${state.warehouse.id}/locations`
        )
        dispatch({
            type: "setLocationData",
            data: res_locations.data
        })

        //  product information into state

        const res_products = await api.get(
            `warehouse/${state.warehouse.id}/products`
        )
        dispatch({
            type: "setProductData",
            data: res_products.data
        })

        //  product information into state

        const res_seeds = await api.get("seeds")
        dispatch({
            type: "setSeeds",
            data: res_seeds.data
        })

        //  lot information into state

        const res_lots = await api.get(`warehouse/${state.warehouse.id}/lots`)
        console.log(res_lots.data)
        dispatch({
            type: "setLotsInWarehouse",
            data: res_lots.data
        })
    }, [])

    if (state.metaMode == "landing") {
        return <h1>LandingPage</h1>
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
            <h1 style={{ padding: "100px", color: "green", fontSize: "3em" }}>
                palletPAL is loading....
            </h1>
        )
    }
}

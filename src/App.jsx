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
    clickedLocation: "",
    selectedMoveLocation: "" // these two values can be utilised to show where moved from and where moved to
}

export default function App() {
    //////////////////////// FOR THE SIDEBAR TO CONTINUE PARTIAL FUNCTION /////////////////////////////

    // still need to work on the Sidebar components to transition
    const [locationsInfo, setLocationsInfo] = useState([])
    const [clickedLocation, setClickedLocation] = useState("")

    useEffect(async () => {
        const res = await fetch(
            "https://glacial-bayou-38289.herokuapp.com/warehouse/1/location_info"
        )
        const data = await res.json()
        setLocationsInfo(data)
    }, [])

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////// REFACTORED CODE USING REDUCER AND CONTEXT //////////////////////////

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(async () => {
        // location information into state

        const res_locations = await api.get("warehouse/1/locations")
        dispatch({
            type: "setLocationData",
            data: res_locations.data
        })

        //  product information into state

        const res_products = await api.get("warehouse/1/products")
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

        //  lot information into state // REQUIRE A SEPARATE API REQUEST FOR ALL LOTS RECORDED

        //  const res_lots = await api.get("warehouse/1/lots")
        //  console.log(res_lots.data)
        //  dispatch({
        //      type: 'setLots',
        //      data: res_lots.data
        //  })
    }, [])

    // should think of another option but this will suffice for now to allow content to load
    return state.seeds.length == 22 ? (
        <palletpalContext.Provider value={{ state, dispatch }}>
            <Warehouse />
            <Sidebar
                locationsInfo={locationsInfo}
                clickedLocation={clickedLocation}></Sidebar>
        </palletpalContext.Provider>
    ) : (
        <h1 style={{ padding: "100px", color: "green", fontSize: "3em" }}>
            palletPAL is loading....
        </h1>
    )
}

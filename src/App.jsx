import React, { useEffect, useState, useReducer } from "react"
import Warehouse from "./components/warehouse_components/Warehouse"
import Sidebar from "./components/sidebar_components/Sidebar"
import "./style.scss"
import palletpalContext from "./palletpalContext"
import reducer from "./reducer"
import api from "./api"

// export default function App() {
//     const [locationsInfo, setLocationsInfo] = useState([])
//     const [clickedLocation, setClickedLocation] = useState("")

//     useEffect(async () => {
//         const res = await fetch('https://glacial-bayou-38289.herokuapp.com/warehouse/1/location_info')
//         const data = await res.json()
//         setLocationsInfo(data)
//     }, [])

//     return (
//         <>
//             <Warehouse rows='4' columns='4' locationsInfo={locationsInfo} setClickedLocation={setClickedLocation}></Warehouse>
//             <Sidebar locationsInfo={locationsInfo} clickedLocation={clickedLocation}></Sidebar>
//         </>
//     )
// }

const initialState = { 
    warehouse : { id : 1, name: "warehouse_01", rows : 4, columns : 5}, 
    products : [], 
    locations : [], 
    seeds : [],
    lots: [],
    clickedLocation : "",
    selectedMoveLocation : "" // these two values can be utilised to show where moved from and where moved to
}

// const initialState = { nam : "jane"}

export default function App() {

    const [state, dispatch] = useReducer(reducer, initialState)

    const [locationsInfo, setLocationsInfo] = useState([])
    const [clickedLocation, setClickedLocation] = useState("")

    useEffect(async () => {

        // location information into state

        const res_locations = await api.get("warehouse/1/locations")
        // console.log(res_locations.data)
        dispatch({
            type: 'setLocationData',
            data: res_locations.data
        })

        //  product information into state

         const res_products = await api.get("warehouse/1/products")
         console.log(res_products.data)
         dispatch({
             type: 'setProductData',
             data: res_products.data
         })
 
         //  product information into state

         const res_seeds = await api.get("seeds")
         console.log(res_seeds.data)
         dispatch({
             type: 'setSeeds',
             data: res_seeds.data
         })

         //  product information into state

        //  const res_lots = await api.get("warehouse/1/lots")
        //  console.log(res_lots.data)
        //  dispatch({
        //      type: 'setLots',
        //      data: res_lots.data
        //  })
         

    }, [])


    return (
        <>
            
            <palletpalContext.Provider value = { {state, dispatch}}>
                <Warehouse rows='4' columns='4' locationsInfo={locationsInfo} setClickedLocation={setClickedLocation}></Warehouse>
                <Sidebar locationsInfo={locationsInfo} clickedLocation={clickedLocation}></Sidebar>
            </palletpalContext.Provider>
        </>
    )
}


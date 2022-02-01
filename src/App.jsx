import React, { useEffect, useState } from "react"
import Warehouse from "./components/warehouse_components/Warehouse"
import Sidebar from "./components/sidebar_components/Sidebar"
import "./style.scss"

export default function App() {
    const [locationsInfo, setLocationsInfo] = useState([])
    const [clickedLocation, setClickedLocation] = useState("")

    useEffect(async () => {
        const res = await fetch('https://glacial-bayou-38289.herokuapp.com/warehouse/1/location_info')
        const data = await res.json()
        setLocationsInfo(data)
    }, [])

    return (
        <>
            <Warehouse rows='4' columns='4' locationsInfo={locationsInfo} setClickedLocation={setClickedLocation}></Warehouse>
            <Sidebar locationsInfo={locationsInfo} clickedLocation={clickedLocation}></Sidebar>
        </>
    )
}

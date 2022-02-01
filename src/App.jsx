import React from "react"
import Warehouse from "./components/warehouse_components/Warehouse"
import Sidebar from "./components/sidebar_components/Sidebar"
import "./style.scss"

export default function App() {
    return (
        <>
            <Warehouse rows='4' columns='4'></Warehouse>
            <Sidebar></Sidebar>
        </>
    )
}

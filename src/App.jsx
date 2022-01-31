import React from "react"
import Warehouse from "./components/Warehouse"
import Sidebar from "./components/Sidebar"
import "./style.scss"

export default function App() {
    return (
        <>
            <Warehouse rows='10' columns='10'></Warehouse>
            <Sidebar></Sidebar>
        </>
    )
}

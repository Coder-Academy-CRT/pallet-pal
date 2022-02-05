import { useState } from "react"
import LotList from "./LotList"

function LotManager() {
    const [active, setActive] = useState(true)

    function setOff() {
        setActive(false)
    }

    function setOn() {
        setActive(true)
    }

    if (active) {
        return (
            <div id='lotManager'>
                <button onClick={setOff}>close Lot Manager</button>
                <LotList />
            </div>
        )
    } else {
        return (
            <div id='lotManager'>
                <button onClick={setOn}>open Lot Manager</button>
            </div>
        )
    }
}

export default LotManager

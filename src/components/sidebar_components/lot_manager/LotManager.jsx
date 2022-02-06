import { useState } from "react"
import LotList from "./LotList"

export default function LotManager() {
    const [active, setActive] = useState(false)

    return (
        <div id='lotManager'>
            { active ? 
            <>
                <button onClick={ () => setActive(false) }>close Lot Manager</button>
                <LotList />
            </>
            :
            <button onClick={ () => setActive(true)}>open Lot Manager</button> }
        </div>
    )
}

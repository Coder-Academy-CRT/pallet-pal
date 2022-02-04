import React, { useEffect, useContext } from 'react'
import WarehouseCard from './WarehouseCard'
import palletpalContext from '../../palletpalContext'

function LandingPage() {
    const {
        state: { warehouseList, warehouse },
        dispatch
    } = useContext(palletpalContext)

    return (
        <div id='landingPage'>
            <h1>
                <span>pallet</span>
                <span className='accent'>PAL</span>
            </h1>

            <div id='warehouseList'>
                {warehouseList.map((obj, index) => (
                    <WarehouseCard info={obj} key={index} />
                ))}
            </div>
            <button id='newWarehouseButton'>build new warehouse</button>
        </div>
    )
}

export default LandingPage

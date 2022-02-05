import React, { useContext, useEffect } from 'react'
import palletpalContext from '../../palletpalContext'
import Location from './Location'

function Warehouse() {
    const {
        state: { warehouse, locations, metaMode, tempWarehouse }
    } = useContext(palletpalContext)

    // if there is a temp WH style from its rows and cols (for build mode)
    const currentWh = tempWarehouse ? tempWarehouse : warehouse
    const dynamicStyling = {
        gridTemplateRows: `repeat(${currentWh.rows}, calc(100% / ${currentWh.rows}))`,
        gridTemplateColumns: `repeat(${currentWh.columns}, calc(100% / ${currentWh.columns}))`
    }

    return (
        <div id='warehouse' style={dynamicStyling}>
            {locations.flat(1).map((location, index) => (
                <Location details={location} key={index} />
            ))}
        </div>
    )
}

export default Warehouse

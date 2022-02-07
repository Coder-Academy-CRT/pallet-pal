import React, { useContext, useEffect } from 'react'
import palletpalContext from '../../palletpalContext'
import Location from './Location'
import DispatchBox from '../sidebar_components/location_details/DispatchBox'

function Warehouse() {
    const {
        state: { warehouse, locations, metaMode, tempWarehouse, microModes }
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
            {microModes.includes('dispatchMode') ? (
                <div className='blockout-bg'>
                    <DispatchBox />
                </div>
            ) : null}
        </div>
    )
}

export default Warehouse

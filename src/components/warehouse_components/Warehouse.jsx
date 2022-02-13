import React, { useContext, useEffect } from 'react'
import palletpalContext from '../../palletpalContext'
import Location from './Location'
import DispatchPallet from '../sidebar_components/location_details/DispatchPallet'
import AddPallet from '../sidebar_components/location_details/AddPallet'
import EditPallet from '../sidebar_components/location_details/EditPallet'

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
    useEffect(() => {
        console.log('wh rendered')
    }, [locations])

    return (
        <div id='warehouse' style={dynamicStyling}>
            {locations.flat(1).map((location, index) => (
                <Location details={location} key={index} />
            ))}
            {/* {microModes.AddPallet ? (
                <div className='blockout-bg'>
                    <AddPallet />
                </div>
            ) : null} */}
            {microModes.Edit ? (
                <div className='blockout-bg'>
                    <EditPallet />
                </div>
            ) : null}
            {microModes.Dispatch ? (
                <div className='blockout-bg'>
                    <DispatchPallet />
                </div>
            ) : null}
        </div>
    )
}

export default Warehouse

import React, { useContext, useEffect } from 'react'
import palletpalContext from '../../palletpalContext'
import Location from './Location'

function Warehouse() {
    const {
        state: { warehouse, locations, metaMode }
    } = useContext(palletpalContext)

    const dynamicStyling = {
        gridTemplateRows: `repeat(${warehouse.rows}, calc(100% / ${warehouse.rows}))`,
        gridTemplateColumns: `repeat(${warehouse.columns}, calc(100% / ${warehouse.columns}))`
    }

    return (
        <div id='warehouse' style={dynamicStyling}>
            {locations.flat(1).map((location, index) => (
                <Location
                    arrOfPallet={location.pallets_on_location}
                    key={index}
                    id={location.coordinates}
                    details={location}
                />
            ))}
        </div>
    )
}

export default Warehouse

import React, { useContext } from 'react'
import palletpalContext from '../../palletpalContext'
import Location from "./Location"

function Warehouse() {

    const { state: { warehouse, locations, palletOption } } = useContext(palletpalContext)

    let rows = warehouse.rows
    let columns = warehouse.columns

    // const locations = []
    const locationCount = rows * columns
    // alt locations.length

    const dynamicStyling = {
        gridTemplateRows: `repeat(${rows}, calc(100% / ${rows}))`,
        gridTemplateColumns: `repeat(${columns}, calc(100% / ${columns}))`
    }

    return (
        <div id='warehouse' style={dynamicStyling}>
             {locations.flat(1).map((location, index) => (       
                <Location arrOfPallet={location.pallets_on_location} key={index} id={location.coordinates}/>
            ))}
        </div>
    ) 
}

export default Warehouse

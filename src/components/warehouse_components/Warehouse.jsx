import React, { useContext } from 'react'
import palletpalContext from '../../palletpalContext'
import Location from "./Location"


function Warehouse() {

    const { state: { warehouse, locations }, } = useContext(palletpalContext)

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
             {locations.map((location, index) => (       
                <Location info={location.pallets_on_location} key={index} id={index}/>
                // NOTING THAT THE INDEX THAT IS REPRESENTED ON THE PALLETS IS NOT NECESSARILY THE PALLET ID
            ))}
        </div>
    )
}

export default Warehouse

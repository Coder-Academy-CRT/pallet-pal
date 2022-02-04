
import React, { useContext } from "react"
import palletpalContext from "../../palletpalContext"
import Location from "./Location"
import DispatchBox from "../sidebar_components/location_details/DispatchBox"

function Warehouse() {

    const { state: { warehouse, locations, metaMode, palletOption } } = useContext(palletpalContext)

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
            {palletOption == 'dispatch' ? (
                <div className='blockout-bg'>
                    <DispatchBox />
                </div>
            ) : null}
        </div>
    )
}

export default Warehouse

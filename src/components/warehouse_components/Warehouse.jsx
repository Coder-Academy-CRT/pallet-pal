import React, { useContext } from "react"
import palletpalContext from "../../palletpalContext"
import Location from "./Location"

function Warehouse() {
    const {
        state: { warehouse, locations, metaMode, palletOption }
    } = useContext(palletpalContext)

    const dynamicStyling = {
        gridTemplateRows: `repeat(${warehouse.rows}, calc(100% / ${warehouse.rows}))`,
        gridTemplateColumns: `repeat(${warehouse.columns}, calc(100% / ${warehouse.columns}))`
    }

    if (metaMode == "build") {
        return <h1>BUILD WAREHOUSE SIDEBAR</h1>
    } else {
        return (
            <div id='warehouse' style={dynamicStyling}>
                {locations.map((location, index) => (
                    <Location
                        arrOfPallet={location.pallets_on_location}
                        key={index}
                        id={location.coordinates}
                    />
                ))}
            </div>
        )
    }
}

export default Warehouse

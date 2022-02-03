import React, { useContext } from "react"
import PalletCard from "./PalletCard"
import palletpalContext from "../../../palletpalContext"

function LocationDetails() {
    const {
        state: { locations, clickedLocation }
    } = useContext(palletpalContext)

    // this function retrieves the location object directly from the array of arrays of location objects
    function getLocation(coordString) {
        // split coordinate into x and y coords
        const coords = coordString.split("_")
        // convert to numbers
        let x = Number(coords[0])
        let y = Number(coords[1])
        // index and return location object
        return locations[x][y]
    }

    // prepare pallet cards
    const palletCards = []
    // get location object
    const locationDisplayed = getLocation(clickedLocation)
    // if a location object is found...
    if (locationDisplayed) {
        // prepare array of pallet ids at location id
        const palletIds = locationDisplayed.pallets_on_location
        // if the first element of array is NOT null there IS pallets at this location
        if (palletIds[0] != null) {
            // for every pallet id prepare a pallet card
            palletIds.map((palletId, index) =>
                palletCards.push(<PalletCard palletId={palletId} key={index} />)
            )
        }
    }

    // if there are pallet cards then render pallet cards
    return palletCards.length > 0 ? (
        <div id='locationDetails'>{palletCards}</div>
    ) : (
        // else render location details with no pallet cards but with information
        <div id='locationDetails'>no pallets in selected location</div>
    )
}

export default LocationDetails

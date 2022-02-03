import React, { useContext } from 'react'
import PalletCard from "./PalletCard"
import palletpalContext from "../../../palletpalContext"

function LocationDetails() {
    const { state: { locations, clickedLocation } } = useContext(palletpalContext)

    const palletCards = []

    if (clickedLocation) {
        // Found location base on coordinates
        const filtered = locations.filter(location => location.coordinates == clickedLocation)
        const palletInfo = filtered[0].pallets_on_location

        if (palletInfo[0] !== null) {
            palletInfo.map((pallet, index) => palletCards.push(<PalletCard palletId={pallet} palletExist={true} key={index}/>))
        } else {
            palletCards.push(<PalletCard palletExist={false} />)
        }
    }
    
    return clickedLocation ? <div id='locationDetails'>{palletCards}</div> : null
}

export default LocationDetails

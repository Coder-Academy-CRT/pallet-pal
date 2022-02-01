import PalletCard from "./PalletCard"

function LocationDetails({ locationsInfo, clickedLocation }) {
    const palletCards = []

    if (clickedLocation) {
        if (locationsInfo[clickedLocation].pallets_on_location[0] !== null) {
            const numberOfPallets = locationsInfo[clickedLocation].pallets_on_location.length
            for (let i = 0; i < numberOfPallets; i++) {
                palletCards.push(<PalletCard />)
            }
        }
    }
    return clickedLocation ? <div id='locationDetails'>{palletCards}</div> : null
}

export default LocationDetails

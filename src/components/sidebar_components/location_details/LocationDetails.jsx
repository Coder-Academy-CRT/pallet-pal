import PalletCard from "./PalletCard"

function LocationDetails({ locationsInfo, clickedLocation }) {
    const palletCards = []

    if (clickedLocation) {
        const palletInfo = locationsInfo[clickedLocation].pallets_on_location
        if (palletInfo[0] !== null) {
            // const numberOfPallets = palletInfo.length
            // for (let i = 0; i < numberOfPallets; i++) {
            //     palletCards.push(<PalletCard />)
            // }
            palletInfo.map(pallet => palletCards.push(<PalletCard palletId={pallet}/>))
            
        }
    }
    return clickedLocation ? <div id='locationDetails'>{palletCards}</div> : null
}

export default LocationDetails

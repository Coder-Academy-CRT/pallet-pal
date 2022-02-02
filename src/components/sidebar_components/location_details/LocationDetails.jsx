import PalletCard from "./PalletCard"

function LocationDetails({ locationsInfo, clickedLocation }) {
    const palletCards = []


    if (clickedLocation) {
        const palletInfo = locationsInfo[clickedLocation].pallets_on_location
        if (palletInfo[0] !== null) {
            palletInfo.map((pallet, index) => palletCards.push(<PalletCard palletId={pallet} palletExist={true} key={index}/>))
        } else {
            palletCards.push(<PalletCard palletExist={false} />)
        }
    }
    
    return clickedLocation ? <div id='locationDetails'>{palletCards}</div> : null
}

export default LocationDetails

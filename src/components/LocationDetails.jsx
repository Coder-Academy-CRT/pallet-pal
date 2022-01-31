import PalletCard from "./PalletCard"

function LocationDetails({ numberOfPallets }) {
    const palletCards = []
    for (let i = 0; i < numberOfPallets; i++) {
        palletCards.push(<PalletCard />)
    }
    return <div id='locationDetails'>{palletCards}</div>
}

export default LocationDetails

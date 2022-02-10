import React, { useContext } from 'react'
import PalletCard from './PalletCard'
import palletpalContext from '../../../palletpalContext'

function LocationDetails() {
    const {
        state: { clickedLocation, microModes },
        dispatch
    } = useContext(palletpalContext)

    // prepare pallet cards
    const palletCards = []
    // get location object
    const locationDisplayed = clickedLocation ? clickedLocation : null
    // if a location object is found...
    if (locationDisplayed) {
        // prepare array of pallet ids at location id
        const palletIds = locationDisplayed.pallets_on_location
        // if the first element of array is NOT null there IS pallets at this location
        if (palletIds[0] != null) {
            // for every pallet id prepare a pallet card
            palletIds.map((palletId, index) =>
                palletCards.push(
                    <PalletCard
                        palletId={palletId}
                        key={index}
                        locationId={locationDisplayed.coordinates}
                    />
                )
            )
        }
    }
    // Open add pallet option
    const handleClick = () => {
        dispatch({
            type: 'setMicroMode',
            data: { mode: 'AddPallet', bool: true }
        })
    }

    if (microModes.LocationDetails) {
        if (clickedLocation?.category != 'inaccessible') {
            if (palletCards.length == 0) {
                return clickedLocation?.category == 'allocated_storage' ? (
                    <div>
                        <button
                            style={{ padding: '5px', margin: '5px' }}
                            onClick={handleClick}>
                            +
                        </button>
                        <div id='locationDetails'>
                            <p>No pallets in this locations at the moment. You can click the + button to add new pallet.</p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button
                            style={{ padding: '5px', margin: '5px' }}
                            onClick={handleClick}>
                            +
                        </button>
                        <div id='locationDetails'>
                            <p>BEWARE - This location is a spare floor. Don't recommend to put pallet here, but you can still add new pallet by clicking the + button.</p> 
                        </div>
                    </div>
                )
            } else {
                return (
                <div>
                    <button
                        style={{ padding: '5px', margin: '5px' }}
                        onClick={handleClick}>
                        +
                    </button>
                    <div id='locationDetails'>{palletCards}</div>
                </div>
                )
            }
        } else {
            dispatch({
                type: 'setMicroMode',
                data: { mode: 'LocationDetails', bool: false }
            })
            return <></>
        }
    } else {
        return <></>
    }
}

export default LocationDetails

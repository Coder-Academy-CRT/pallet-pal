import React, { useContext } from 'react'
import PalletCard from './PalletCard'
import palletpalContext from '../../../palletpalContext'
import AddPallet from './AddPallet'
import { useEffect } from 'react'

function LocationDetails() {
    const {
        state: { clickedLocation, microModes, lots },
        dispatch
    } = useContext(palletpalContext)
    console.log(lots)
    // if location changes, reset add pallet mode
    useEffect(() => {
        if (microModes.AddPallet) {
            dispatch({
                type: 'setMicroMode',
                data: { mode: 'AddPallet', bool: false }
            })
        }
    }, [clickedLocation])
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
            // if there are pallet cards then render pallet cards
            return (
                <div id='locationDetails'>
                    <header>
                        <h2>Location Details</h2>
                        <p>Add Pallet</p>
                        <button onClick={handleClick}>+</button>
                    </header>

                    {microModes.AddPallet ? <AddPallet /> : null}
                    {palletCards.length > 0 ? (
                        <div id='palletList'>{palletCards}</div>
                    ) : null}
                </div>
            )
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

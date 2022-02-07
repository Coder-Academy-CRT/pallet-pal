import React, { useContext, useEffect } from 'react';
import palletpalContext from '../../../palletpalContext';

export default function MoveOption() {
    const { state: { selectedPallet, clickedLocation, locations, selectedMoveLocation, products }, dispatch } = useContext(palletpalContext)

    // Add locations that are "allocated_storage" minus clickedLocation
    const avaLocations = locations.flat(1)
        .filter(location => location.category == "allocated_storage")
        .filter(location => location.coordinates != clickedLocation.coordinates)

    useEffect(() => {
        dispatch({
            type: 'setAvailableLocations',
            data: avaLocations
        })
    }, [])

    return (
        <>
        </>
    );
}

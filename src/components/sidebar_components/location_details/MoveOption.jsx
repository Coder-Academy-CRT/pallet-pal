import React, { useContext, useEffect } from 'react';
import palletpalContext from '../../../palletpalContext';

export default function MoveOption() {
    const { state: { selectedPallet, locations }, dispatch } = useContext(palletpalContext)
    // Add location that are under allocated storage
    const avaLocations = locations.flat(1).filter(location => location.category == "allocated_storage")
    useEffect(() => {
        dispatch({
            type: 'setAvailableLocations',
            data: avaLocations
        })
    }, [])




    return (
        <>
        <h1>Move option is on! # {selectedPallet.pallet_id}</h1>
        </>
    );
}

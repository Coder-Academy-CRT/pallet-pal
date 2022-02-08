import React, { useContext, useEffect, useState, useReducer } from 'react'
import palletpalContext from '../../palletpalContext'

// passing the whole location object in rather than bits
function Location({ details }) {
    const {
        state: {
            metaMode,
            microModes,
            locations,
            foundPallets,
            availableLocations,
            selectedMoveLocation,
            moveFromLocation,
            moveToLocation,
            movingPalletId,
            clickedLocation
        },
        dispatch
    } = useContext(palletpalContext)

    // set initial category
    const [category, setCategory] = useState(details.category)
    const [classes, setClasses] = useState([category, 'location'])

    // store all available categories
    const categories = ['spare_floor', 'allocated_storage', 'inaccessible']

    useEffect(() => {
        setClasses([category, 'location'])
        details.pallets_on_location.forEach((palletId) => {
            if (foundPallets.includes(palletId)) {
                setClasses([...classes, 'found'])
            }
        })

        // Light up available locations during 'Move' mode
        if (
            microModes.Move &&
            ['spare_floor', 'allocated_storage'].includes(category)
        ) {
            setClasses([...classes, 'moveActive'])
        }
        // Set selected class when location selected
        clickedLocation?.coordinates == details.coordinates &&
        metaMode == 'main'
            ? setClasses([...classes, 'selected'])
            : null
    }, [
        foundPallets,
        category,
        availableLocations,
        clickedLocation,
        microModes
    ])

    const handleClickOnBox = (e) => {
        e.stopPropagation()
        dispatch({
            type: 'setClickedLocation',
            data: e.target.parentNode.id
        })
    }

    // manage cleanup when category changes
    function incrementCategory() {
        // set new category
        setCategory(
            categories[(categories.indexOf(category) + 1) % categories.length]
        )
        // cleanup classes
        setClasses([category, 'location'])
    }

    function updateLocation(coordString) {
        // increment category and class cleanup
        incrementCategory()
        // split coordinate into x and y coords, example ["01","02"]
        const coords = coordString.split('_')
        // convert to numbers
        let x = Number(coords[0])
        let y = Number(coords[1])
        // prepare new locations object
        const newLocations = locations
        //update global locations object
        newLocations[x][y].category = category
    }

    // when location clicked do different things in different modes.
    const handleClick = (e) => {
        // if in build mode location click is different than in if in main mode
        switch (metaMode) {
            case 'build':
                // get location object and set its new category
                updateLocation(details.coordinates, category)
            case 'main':
                // if in move mode
                if (microModes.Move) {
                    switch (details.category) {
                        case 'inaccessible':
                            alert(
                                'You may not move pallets here, try allocated storage or spare floor.'
                            )
                            break
                        default:
                            confirm('You want to move to this location?')
                            if (confirm) {
                                alert('Pallet has been moved.')
                                dispatch({
                                    type: 'movePallet',
                                    data: {
                                        palletId: movingPalletId,
                                        moveFromLocation: moveFromLocation,
                                        moveToLocation: details.coordinates
                                    }
                                })
                                dispatch({
                                    type: 'setMicroMode',
                                    data: { mode: 'Move', bool: false }
                                })
                            } else {
                                alert('move cancelled')
                                break
                            }
                    }
                } else {
                    dispatch({
                        type: 'setClickedLocation',
                        data: e.target.id
                    })
                    if (!microModes.LocationDetails) {
                        dispatch({
                            type: 'toggleMicroMode',
                            data: 'LocationDetails'
                        })
                    } else {
                        dispatch({
                            type: 'setClickedLocation',
                            data: e.target.id
                        })
                    }
                }
        }
    }

    const boxes = []

    if (details.pallets_on_location[0] != null) {
        details.pallets_on_location.forEach((pallet) => {
            boxes.push(
                <div
                    className='palletBox'
                    key={pallet}
                    onClick={handleClickOnBox}>
                    # {pallet}
                </div>
            )
        })
    }

    return (
        <div
            className={classes.join(' ')}
            onClick={handleClick}
            id={details.coordinates}>
            {boxes}
        </div>
    )
}

export default Location

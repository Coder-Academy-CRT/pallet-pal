import React, { useContext, useEffect, useState, useReducer } from 'react'
import api from '../../api'
import palletpalContext from '../../palletpalContext'

// passing the whole location object in rather than bits
function Location({ details }) {
    const {
        state: {
            warehouse,
            metaMode,
            microModes,
            locations,
            foundPallets,
            availableLocations,
            moveFromLocation,
            movingPalletId,
            clickedLocation
        },
        dispatch
    } = useContext(palletpalContext)

    // set initial category
    const [category, setCategory] = useState(details.category)
    const [classes, setClasses] = useState([category, 'location'])
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([
        'spare_floor',
        'allocated_storage',
        'inaccessible'
    ])

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
        category,
        foundPallets,
        availableLocations,
        clickedLocation,
        microModes
    ])

    const handleClickOnBox = (e) => {
        e.stopPropagation()
        dispatch({
            type: 'setClickedLocation',
            data: e.target.parentElement.id
        })
    }

    function updateLocation(coordString) {
        // increment category and class cleanup
        const nextCat =
            categories[(categories.indexOf(category) + 1) % categories.length]
        // set new category
        setCategory(nextCat)
        // cleanup classes
        setClasses([category, 'location'])
        // split coordinate into x and y coords, example ["01","02"]
        const coords = coordString.split('_')
        // convert to numbers
        let x = Number(coords[0])
        let y = Number(coords[1])
        // prepare new locations object
        const newLocations = [...locations]
        // update global locations object
        newLocations[y][x].category = nextCat

        dispatch({
            type: 'setLocations',
            data: newLocations
        })
    }

    // when location clicked do different things in different modes.
    const handleClick = async (e) => {
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
                            const resolved = confirm(
                                'You want to move to this location?'
                            )
                            if (resolved) {
                                setLoading(true)
                                try {
                                    const response = await api.put(
                                        `pallet/${movingPalletId}/location/${details.coordinates}`
                                    )
                                    if (
                                        response.data ==
                                        `pallet #${movingPalletId} moved to location ${details.coordinates}`
                                    ) {
                                        dispatch({
                                            type: 'updateProductsAfterMoved',
                                            data: details.coordinates
                                        })
                                        dispatch({
                                            type: 'updateLocationsAfterMoved',
                                            data: {
                                                palletId: movingPalletId,
                                                coord: details.coordinates
                                            }
                                        })
                                        setLoading(false)
                                        dispatch({
                                            type: 'setMicroMode',
                                            data: { mode: 'Move', bool: false }
                                        })
                                    } else {
                                    }
                                } catch (err) {
                                    alert(
                                        'Pallet could not be moved. Please close and try again later'
                                    )
                                    setLoading(false)
                                }
                                // const moveResponse = await api.put(
                                //     `pallet/${movingPalletId}/location/${details.coordinates}`
                                // )
                                // // const locationsResponse = await api.get(
                                // //     `warehouse/${warehouse.id}/locations`
                                // // )
                                // if (
                                //     moveResponse.data ==
                                //         `pallet #${movingPalletId} moved to location ${details.coordinates}` &&
                                //     locationsResponse.status == 200
                                // ) {
                                //     dispatch({
                                //         type: 'setLocationData',
                                //         data: {
                                //             allLocations:
                                //                 locationsResponse.data,
                                //             rows: warehouse.rows,
                                //             columns: warehouse.columns
                                //         }
                                //     })
                                //     console.log(locationsResponse.data)
                                //     console.log(moveResponse)
                                //     console.log(warehouse.rows)
                                //     console.log(warehouse.columns)
                                //     setLoading(false)
                                // } else {
                                //     setLoading(false)
                                // }

                                // // dispatch({
                                // //     type: 'movePallet',
                                // //     data: {
                                // //         palletId: movingPalletId,
                                // //         moveFromLocation: moveFromLocation,
                                // //         moveToLocation: details.coordinates
                                // //     }
                                // // })
                                // alert('Pallet has been moved.')
                                // dispatch({
                                //     type: 'setMicroMode',
                                //     data: { mode: 'Move', bool: false }
                                // })
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
            {!loading ? boxes : <h1>Moving..</h1>}
        </div>
    )
}

export default Location

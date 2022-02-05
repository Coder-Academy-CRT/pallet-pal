import React, { useContext, useEffect, useState, useReducer } from 'react'
import palletpalContext from '../../palletpalContext'

// passing the whole location object in rather than bits
function Location({ details }) {
    const {
        state: { foundPallets, metaMode, locations },
        dispatch
    } = useContext(palletpalContext)
    // set initial category
    const [category, setCategory] = useState(details.category)
    const [classes, setClasses] = useState([category, 'location'])
    // all available categories
    const categories = ['spare_floor', 'allocated_storage', 'inaccessible']

    useEffect(() => {
        setClasses([category, 'location'])
        details.pallets_on_location.forEach((palletId) => {
            if (foundPallets.includes(palletId)) {
                setClasses([...classes, 'found'])
            }
        })
    }, [foundPallets, category])

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
        dispatch({
            type: 'setLocations',
            data: newLocations
        })
    }

    const handleClick = (e) => {
        // if in build mode location click is different than in if in main mode
        switch (metaMode) {
            case 'build':
                // get location object and set its new category
                updateLocation(details.coordinate, category)
            case 'main':
                dispatch({
                    type: 'setClickedLocation',
                    data: e.target.id
                })
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

import React, { useContext, useEffect, useState } from "react"
import palletpalContext from "../../palletpalContext"

function Location({ arrOfPallet, id }) {
    const {
        state: { foundPallets, availableLocations, palletOption, locations },
        dispatch
    } = useContext(palletpalContext)
    const [classes, setClasses] = useState("location")

    useEffect(() => {
        setClasses("location")
        arrOfPallet.forEach((palletId) => {
            if (foundPallets.includes(palletId)) {
                setClasses("location found")
                console.log(`found on pallet ${palletId}`)
            }
        })
    }, [foundPallets])

    // Light up available location during 'move' 
    useEffect(() => {
        setClasses("location")
        availableLocations.forEach(location => {
            setClasses("location found")
        })
    }, [availableLocations])
    

    const handleClickOnBox = (e) => {
        e.stopPropagation()
        dispatch({
            type: "setClickedLocation",
            data: e.target.parentNode.id
        })
    }

    const handleClick = (e) => {
        dispatch({
            type: "setClickedLocation",
            data: e.target.id
        })
        if (palletOption == "move") {
            dispatch({
                type: "setSelectedMoveLocation",
                data: e.target.id
            })
            confirm("You want to move to this location?")
            if (true) {
                dispatch({
                    type: "updateLocationAfterMove",
                    data: e.target.id
                })
            }
            console.log(e.target.id)
            dispatch({
                type: "setAvailableLocations",
                data: []
            })

        }
    }

    const boxes = []

    if (arrOfPallet[0]) {
        arrOfPallet.forEach((pallet) => {
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
        <div className={classes} onClick={handleClick} id={id}>
            {boxes}
        </div>
    )
}

export default Location

import React, { useContext, useEffect, useState } from 'react'
import palletpalContext from '../../palletpalContext'

function Location({ arrOfPallet, id, details }) {
    const {
        state: { foundPallets },
        dispatch
    } = useContext(palletpalContext)
    const [classes, setClasses] = useState([details.category, 'location'])

    useEffect(() => {
        setClasses([details.category, 'location'])
        arrOfPallet.forEach((palletId) => {
            if (foundPallets.includes(palletId)) {
                setClasses([...classes, 'found'])
            }
        })
    }, [foundPallets])

    const handleClickOnBox = (e) => {
        e.stopPropagation()
        dispatch({
            type: 'setClickedLocation',
            data: e.target.parentNode.id
        })
    }

    const handleClick = (e) => {
        dispatch({
            type: 'setClickedLocation',
            data: e.target.id
        })
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
        <div className={classes.join(' ')} onClick={handleClick} id={id}>
            {boxes}
        </div>
    )
}

export default Location

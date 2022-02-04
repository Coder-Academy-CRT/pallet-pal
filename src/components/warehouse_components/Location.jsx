import React, { useContext, useEffect, useState } from 'react'
import palletpalContext from '../../palletpalContext'

function Location({ arrOfPallet, id }) {
    const {
        state: { foundPallets },
        dispatch
    } = useContext(palletpalContext)
    const [classes, setClasses] = useState('location')

    useEffect(() => {
        setClasses('location')
        arrOfPallet.forEach((palletId) => {
            if (foundPallets.includes(palletId)) {
                setClasses('location found')
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
        <div className={classes} onClick={handleClick} id={id}>
            {boxes}
        </div>
    )
}

export default Location

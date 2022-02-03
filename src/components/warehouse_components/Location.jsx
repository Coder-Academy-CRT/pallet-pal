import React, { useContext } from 'react'
import palletpalContext from '../../palletpalContext'

function Location({ arrOfPallet, id }) {

    const { state: { }, dispatch } = useContext(palletpalContext)

    const style = {
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const handleClickOnBox = (e) => {
        e.stopPropagation()
        dispatch({
            type: 'setClickedLocation',
            data: e.target.parentNode.id
        })
    }

    const boxes = []
    // Only create box when palletNum[0] != null
    if (arrOfPallet[0]) {
        for (let i = 0; i < arrOfPallet.length; i++) {
            boxes.push(<div className='palletBox' key={arrOfPallet[i]} style={style} onClick={handleClickOnBox} ># {arrOfPallet[i]}</div>)
        }
    } 

    const handleClick = (e) => {
        dispatch({
            type: 'setClickedLocation',
            data: e.target.id
        })
    }

    return <div className='location' onClick={handleClick} id={id}>{boxes}</div>
}

export default Location



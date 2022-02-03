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

    const handleClick = (e) => {
        dispatch({
            type: 'setClickedLocation',
            data: e.target.id
        })
    }

    const boxes = []

    if (arrOfPallet[0]) {
        arrOfPallet.forEach( (pallet) => { 
            boxes.push(<div className='palletBox' key={pallet} style={style} onClick={handleClickOnBox}># {pallet}</div>) }
    )}

    return <div 
        className='location' 
        onClick={handleClick} 
        id={id}>
        {boxes}
    </div>
    
}

export default Location



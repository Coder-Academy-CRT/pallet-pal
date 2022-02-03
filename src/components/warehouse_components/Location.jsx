import React, { useContext } from 'react'
import palletpalContext from '../../palletpalContext'
function Location({ info, id }) {

    const { state: { }, dispatch } = useContext(palletpalContext)

    const style = {
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const handleClickOnBox = (e) => {
        e.stopPropagation()
        // setClickedLocation(e.target.parentNode.id)
        // REPLACED WITH
        dispatch({
            type: 'setClickedLocation',
            data: e.target.parentNode.id
        })
        
    }

    const boxes = []
    // Only create box when info[0] != null
    if (info[0]) {
        for (let i = 0; i < info.length; i++) {
            boxes.push(<div className='palletBox' key={i} style={style} onClick={handleClickOnBox} ># {info[i]}</div>)
        }
    } 

    const handleClick = (e) => {
        // setClickedLocation(e.target.id)
        // REPLACED WITH
        dispatch({
            type: 'setClickedLocation',
            data: e.target.id
        })
    }

    return <div className='location' onClick={handleClick} id={id}>{boxes}</div>
}

export default Location



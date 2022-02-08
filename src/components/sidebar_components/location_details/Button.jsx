import React, { useContext } from 'react'
import palletpalContext from '../../../palletpalContext'

export default function Button({ text }) {
    const {
        state: {},
        dispatch
    } = useContext(palletpalContext)

    const handleClick = (e) => {
        e.stopPropagation()
        dispatch({
            type: 'toggleMicroMode',
            data: text
        })
    }

    return (
        <>
            <button onClick={handleClick}>{text}</button>
        </>
    )
}

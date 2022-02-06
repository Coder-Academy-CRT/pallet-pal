import React, { useEffect, useContext } from 'react'
import palletpalContext from '../../palletpalContext'

function WarehouseCard({ info }) {
    const {
        state: { warehouse, metaMode },
        dispatch
    } = useContext(palletpalContext)

    useEffect(() => {}, [])

    function loadWarehouse() {
        console.log('loading warehouse')
        dispatch({ type: 'setWarehouse', data: info })
        dispatch({ type: 'setMetaMode', data: 'Main' })
        console.log(warehouse)
    }

    return (
        <>
            <div className='warehouseCard'>
                <div className='whInfo'>{info.name}</div>
                <button
                    className='loadButton'
                    onClick={loadWarehouse}>{`>>`}</button>
            </div>
        </>
    )
}

export default WarehouseCard

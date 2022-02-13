import React, { useEffect, useContext, useState } from 'react'
import palletpalContext from '../../palletpalContext'
import api from '../../api'

function WarehouseCard({ info }) {
    const {
        state: { warehouse },
        dispatch
    } = useContext(palletpalContext)
    const [warehouseInfo, setWarehouseInfo] = useState(info)

    async function loadWarehouse() {
        dispatch({ type: 'setWarehouse', data: info })
        dispatch({ type: 'setMetaMode', data: 'main' })
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

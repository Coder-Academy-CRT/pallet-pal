import React, { useEffect, useContext } from 'react'
import WarehouseCard from './WarehouseCard'
import palletpalContext from '../../palletpalContext'

function LandingPage() {
    const {
        state: { warehouseList, warehouse },
        dispatch
    } = useContext(palletpalContext)

    function buildNewWarehouse(rows, columns) {
        // prepare a list to store built location objects
        const newLocationList = []
        // for every row on the Y AXIS
        for (let y = 0; y < rows; y++) {
            // create a row of locations X AXIS
            const currentList = []
            for (let x = 0; x < columns; x++) {
                currentList.push({
                    coordinates: `0${x}_0${y}`,
                    category: 'spare_floor',
                    pallets_on_location: []
                })
            }
            newLocationList.push(currentList)
        }
        dispatch({
            type: 'setLocations',
            data: newLocationList
        })
        dispatch({
            type: 'setMetaMode',
            data: 'build'
        })
        dispatch({
            type: 'setTempWarehouse',
            data: {
                id: 0,
                name: 'new warehouse',
                rows: rows,
                columns: columns
            }
        })
    }

    return (
        <div id='landingPage'>
            <h1>
                <span>pallet</span>
                <span className='accent'>PAL</span>
            </h1>

            <div id='warehouseList'>
                {warehouseList.map((obj, index) => (
                    <WarehouseCard info={obj} key={index} />
                ))}
            </div>
            <button
                id='newWarehouseButton'
                // set rows cols to 4, 4 but this can be altered without breaking new warehouse
                onClick={() => buildNewWarehouse(5, 5)}>
                build new warehouse
            </button>
        </div>
    )
}

export default LandingPage

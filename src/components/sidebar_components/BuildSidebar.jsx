import React, { useContext, useState } from 'react'
import palletpalContext from '../../palletpalContext'
import api from '../../api'

function BuildSidebar() {
    const {
        state: { warehouseList, tempWarehouse, locations },
        dispatch
    } = useContext(palletpalContext)
    const [warehouseName, setWarehouseName] = useState('')

    function validateWarehouseName(string) {
        if (Object.keys(warehouseList).includes(string)) {
            alert('name already taken')
            return false
        } else {
            // do more validation with regex
            // /^[a-z ,.'-{1-30}]+$/i

            // then set new temp warehouse
            dispatch({
                type: 'setTempWarehouse',
                data: {
                    id: 0,
                    name: string,
                    rows: tempWarehouse.rows,
                    columns: tempWarehouse.columns
                }
            })
            return true
        }
    }

    function locationRequest() {
        // prep location request
        // return three lists of coordinates assigned by category
        // [[inaccessible], [allocated_storage], [spare_floor]]
        const locationLists = [[], [], []]
        locations.flat(1).forEach((loc) => {
            switch (loc.category) {
                case 'allocated_storage':
                    locationLists[1].push(loc.coordinates)
                    break
                case 'inaccessible':
                    locationLists[0].push(loc.coordinates)
                    break
                default:
                    locationLists[2].push(loc.coordinates)
            }
        })
        return {
            location_type: [1, 2, 3],
            coordinates: locationLists
        }
    }

    function testLocationRequest() {
        console.log(locationRequest())
    }

    async function saveWarehouse(whName) {
        // check if warehouse name is already taken
        if (!validateWarehouseName(whName)) {
            alert('Warehouse name already exists choose another')
        } else {
            // ADD NEW WAREHOUSE TO DB AND ON STATUS OK
            const whResponse = await api.post(`warehouse`, {
                warehouse_name: whName,
                rows: tempWarehouse.rows,
                columns: tempWarehouse.columns
            })

            if (!whResponse.data.hasOwnProperty('id')) {
                // warehouse not created
                console.log('WAREHOUSE DB CREATE FAILURE')
                alert('Warehouse failed to save to database.')
            } else {
                // if warehouse successfully created
                // update locations
                const locResponse = await api.post(
                    `warehouse/${whResponse.data.id}/locations`,
                    locationRequest()
                )

                if (
                    locResponse.data !=
                    `Warehouse ${whResponse.data.id} locations updated`
                ) {
                    // fail message
                    console.log('LOCATIONS DB UPDATE FAILURE')
                    alert('warehouse locations failed to update')
                } else {
                    // locations saved to database update state
                    const newWarehouse = { ...tempWarehouse }
                    newWarehouse.id = whResponse.data.id
                    // add warehouse to global list of warehouses
                    dispatch({
                        type: 'addWarehouse',
                        data: { newWarehouse }
                    })
                    // set global warehouse to new warehouse
                    dispatch({
                        type: 'setWarehouse',
                        data: { newWarehouse }
                    })
                    // set to main mode which will load this new wh
                    dispatch({
                        type: 'setMetaMode',
                        data: 'main'
                    })
                    message.push('success')
                }
            }
        }
    }

    function handleChange(event) {
        setWarehouseName(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(e.target.whName.value)
        saveWarehouse(e.target.whName.value)
    }

    return (
        <div id='buildSidebar'>
            <section id='instructions'>
                <h1>Instructions</h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eligendi officia aspernatur excepturi iusto voluptatem
                    dolore fugit natus maxime inventore sapiente mollitia ex
                    debitis voluptas ipsa modi at, illum expedita? Sequi minus
                    illo aliquid maxime accusamus quos explicabo voluptatem
                    atque soluta tempore, possimus expedita excepturi ipsa ex
                    accusantium deleniti, iusto natus.
                </p>
            </section>
            <section id='legend'>
                <div className='spare_floor legendBox'>spare floor</div>
                <div className='allocated_storage legendBox'>
                    allocated storage
                </div>
                <div className='inaccessible legendBox'>inaccessible</div>
            </section>
            <section id='buildActions'>
                <h1>Warehouse Name:</h1>
                <form action='saveWarehouse' onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type='text'
                        id='whName'
                        name='whName'
                        placeholder='enter warehouse name here...'
                        value={warehouseName}
                        onChange={handleChange}
                    />
                    <input type='submit' value='save warehouse' id='whSubmit' />
                </form>
                <button onClick={testLocationRequest}>test location req</button>
            </section>
        </div>
    )
}

export default BuildSidebar

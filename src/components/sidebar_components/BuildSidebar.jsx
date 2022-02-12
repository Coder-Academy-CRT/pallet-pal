import React, { useContext, useState } from 'react'
import palletpalContext from '../../palletpalContext'
import api from '../../api'

function BuildSidebar() {
    const {
        state: { warehouseList, tempWarehouse, locations },
        dispatch
    } = useContext(palletpalContext)

    const [warehouseName, setWarehouseName] = useState('')
    const [regexAlert, setRegexAlert] = useState("")

    function checkWarehouseName(warehouseName) {

        const regex1 = /^[a-z]+.*$/i
        const regex2 = /^.{3,30}$/
        const regex3 = /^[\w#@&\.\- ]*$/
        
        const startTest = regex1.test(warehouseName)
        const lengthTest = regex2.test(warehouseName)
        const characterTest = regex3.test(warehouseName)
        
        if (startTest && lengthTest && characterTest) {
          return "Pass"
        }
        else if (!startTest) {
          return "Warehouse name must begin with a letter"
        }
        else if (!lengthTest) {
          return "Please ensure length of warehouse name is between 3 - 30 characters"
        }
        else {
          return "Please use only letters, numbers, and symbols @, &, #. Full stops and hyphens are acceptable, as are spaces."
        }
    }


    function validateWarehouseName(string) {
        if (Object.keys(warehouseList).includes(string)) {
            alert('name already taken')
            return false
        } else {
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
        // regex validation 
        let regexTest = checkWarehouseName(whName)
        if (regexTest == "Pass") {

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
                    console.log(whResponse)
                    console.log('WAREHOUSE DB CREATE FAILURE')
                    alert('Warehouse failed to save to database.')
                } else {
                    console.log(whResponse.data.id)
                    // if warehouse successfully created
                    // update locations
                    const locResponse = await api.put(
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
                        // set temp warehouse to null to force warehouse build instead of temp warehouse in Warehouse.jsx
                        dispatch({
                            type: 'setTempWarehouse',
                            data: null
                        })
                        // set to main mode which will load this new wh
                        dispatch({
                            type: 'setMetaMode',
                            data: 'main'
                        })
                        console.log('LOCATIONS SAVED')
                    }
                }
            }
        
        } else {
            setRegexAlert(regexTest)
        }
    }

    function handleChange(event) {
        setWarehouseName(event.target.value)
        if (checkWarehouseName(event.target.value) != regexAlert) { // state warehouse has delay, so use target
            setRegexAlert('') // when warehouse name input value changes away from that regex block, resets and removes the alert
        }  
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
                    <br></br>
                    This grid represents your floor space, each being slightly larger than a pallet. 
                    x1 click changes to allocated storage, x2 clicks to inaccessible spaces, 
                    & the third click starts over with spare floor.
                    <br></br>
                    <br></br>
                    When choosing a name:
                </p>
                <br></br>
                <ul>
                    <li>
                        it must begin with a letter & be between 3-30 characters
                    </li>
                    <li>
                        it can include numbers, spaces, underscores or the following symbols "@, &, #"
                    </li>
                    <li>
                        full stops and hyphens are acceptable, as are spaces
                    </li>
                </ul>        
            </section>

            { regexAlert ?
                <section>
                    <p id='regexAlertPara'>{ regexAlert }</p>
                </section>
            : 
                <section id='legend'>
                    <div className='spare_floor legendBox'>spare floor</div>
                    <div className='allocated_storage legendBox'>
                        allocated storage
                    </div>
                    <div className='inaccessible legendBox'>inaccessible</div>
                </section>
            }

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
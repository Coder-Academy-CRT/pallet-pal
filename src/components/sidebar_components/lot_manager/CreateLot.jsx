import React, { useState, useContext } from 'react'
import palletpalContext from '../../../palletpalContext'
import api from '../../../api'

export default function AddLot({ setCreateLotForm }) {
    const {
        state: { warehouse, seeds, lots },
        dispatch
    } = useContext(palletpalContext)
    const [newLot, setNewLot] = useState({
        lot_code: '',
        seed_type: 'none declared',
        seed_variety: ''
    })
    const [alertMessage, setAlertMessage] = useState('')

    /// SEED TYPES and VARIETIES for adding to select options
    let seedTypes = new Set([])
    let seedVarieties = []

    seeds.forEach((seed) => {
        seedTypes.add(seed.type)
        seedVarieties.push({
            type: seed.type,
            value: seed.variety,
            label: seed.variety
        })
    })

    let uniqueSeedTypes = Array.from(seedTypes).map((seed) => {
        return { value: seed, label: seed }
    })

    let filteredSeedVarieties = seedVarieties.map((variety, index) => {
        if (variety.type == newLot.seed_type) {
            return (
                <option value={variety.value} key={index}>
                    {variety.label}
                </option>
            )
        }
    })

    // all lots in warehouse to ensure that no duplicate lot codes are created
    const existing_lots = lots.map((lot) => lot.lot_code)

    async function createNewLot(e) {
        e.preventDefault()

        if (existing_lots.includes(newLot.lot_code)) {
            setAlertMessage('Lot already exists')
        } else if (newLot.lot_code == '') {
            setAlertMessage('Please write in a lot code')
        } else if (newLot.seed_type == 'none declared') {
            setAlertMessage('Please select a seed type')
        } else if (alertMessage == '... connecting to database ...') {
            console.log('Guarding against additional clicks')
        } else {
            setAlertMessage('... connecting to database ...')

            try {
                const response = await api.post(
                    `warehouse/${warehouse.id}/lot/${newLot.lot_code}`,
                    {
                        seed_type: newLot.seed_type,
                        seed_variety: newLot.seed_variety
                    }
                )
                // only want the reducer to update state if we have a success
                if (
                    response.data ==
                    `lot code ${newLot.lot_code} added to warehouse database`
                ) {
                    dispatch({
                        type: 'addNewLot',
                        data: newLot
                    })

                    // provide the message for 3 seconds and then close lot manager
                    setAlertMessage('Lot successfully added')
                    setTimeout(() => {
                        setCreateLotForm(false)
                        setAlertMessage('')
                        clearTimeout(self)
                    }, 3000)
                }
            } catch (err) {
                setAlertMessage(
                    'Lot could not be added. Please close and try again later'
                )
                console.log(err)
            }
        }
    }

    // duplicate code in the seed type and seed variety select menus
    let conditional_grey =
        newLot.seed_type == 'none declared' ? { color: 'grey' } : {}
    const select_seed_value = (state) => {
        return newLot.seed_type == 'none declared' ? 'to be selected' : state
    }

    return (
        <div id='createNewLotCard'>
            <h3>Create Lot</h3>

            <form className='lotForm'>
                <label htmlFor='lotCode'>Please enter new lot code :</label>
                <input
                    className='lotInputs'
                    id='lotCode'
                    value={newLot.lot_code}
                    placeholder={'Add a new lot code'}
                    style={newLot.lot_code == '' ? { color: 'grey' } : {}}
                    onChange={(event) =>
                        setNewLot({ ...newLot, lot_code: event.target.value })
                    }></input>

                <label htmlFor='lotSeedType'>Please select seed type:</label>
                <select
                    className='lotInputs lotSelect'
                    id='lotSeedType'
                    value={select_seed_value(newLot.seed_type)}
                    style={conditional_grey}
                    onChange={(event) =>
                        setNewLot({
                            ...newLot,
                            seed_type: event.target.value,
                            seed_variety: 'variety not stated'
                        })
                    }>
                    <option value='to be selected' disabled>
                        Select a seed type
                    </option>

                    {uniqueSeedTypes.map((seed, index) => (
                        <option value={seed.value} key={index}>
                            {seed.label}
                        </option>
                    ))}
                </select>

                <label htmlFor='lotSeedVariety'>
                    Please select seed variety :
                </label>

                <select
                    className='lotInputs lotSelect'
                    id='lotVarietyType'
                    value={select_seed_value(newLot.seed_variety)}
                    onChange={(event) =>
                        setNewLot({
                            ...newLot,
                            seed_variety: event.target.value
                        })
                    }
                    style={conditional_grey}>
                    <option value='to be selected' disabled>
                        {newLot.seed_type == 'none declared'
                            ? 'Select a seed type first'
                            : 'Select variety'}
                    </option>
                    {filteredSeedVarieties}
                </select>
            </form>

            <div id='footerNewLot'>
                <button onClick={(e) => createNewLot(e)} id='addLotButton'>
                    add lot
                </button>
                {alertMessage ? <p>{alertMessage}</p> : <></>}
            </div>
        </div>
    )
}

import React, {useState, useContext, useEffect} from 'react';
import palletpalContext from '../../../palletpalContext';
import api from '../../../api';
import { unstable_batchedUpdates } from 'react-dom';

export default function UpdateLot( {lot, lot_stocks, setEditMode } ) {

    const { state: { warehouse, seeds, lots }, dispatch } = useContext(palletpalContext)
    // const [updatedLot, setUpdatedLot] = useState( { lot_code : lot.lot_code, seed_type: lot.seed_type, seed_variety: lot.seed_variety } )
    const [updatedLot, setUpdatedLot] = useState(lot)
    const [confirmation, setConfirmation] = useState("no")
    const [alertMessage, setAlertMessage] = useState("")


    // all lots in warehouse to ensure that no duplicate lot codes are created
    const existing_lots = lots.map(lot => lot.lot_code)

     /////////////////////// SEED TYPE AND VARIETY FORM SELECT INPUT OPTIONS ////////////////////

    let seedTypes = new Set([])
    let seedVarieties = []

    seeds.forEach( (seed) => {
        seedTypes.add( seed.type)
        seedVarieties.push( {type: seed.type, value: seed.variety, label: seed.variety } )
    })
    
    let uniqueSeedTypes = Array.from(seedTypes).map( (seed) => {
        return { value: seed, label: seed }
    })

    let filteredSeedVarieties = seedVarieties.map( (variety, index) => {
        if (variety.type == updatedLot.seed_type) {
            return (
                <option value={variety.value} key={index}>
                {variety.label}
                </option> 
            )
        }
    })


    /////////////////////// PUT REQUEST TO API => DATABASE  ////////////////////

    async function updateLot(e) {
        e.preventDefault()
        setAlertMessage("")

        if (existing_lots.includes(updatedLot.lot_code) && updatedLot.lot_code != lot.lot_code) {
            
            setAlertMessage(`${updatedLot.lot_code} already exists ! Please select a new lot code`)

        } else if (
            updatedLot.lot_code == lot.lot_code 
            && updatedLot.seed_type == lot.seed_type 
            && updatedLot.seed_variety == lot.seed_variety ) {
                setAlertMessage(`details are the same as existing lot - no changes made`)

        } else {
            setAlertMessage("... connecting to database ...")
            try {
                const original_lot_code = lot.lot_code
                const response = await api.put(
                    `warehouse/${warehouse.id}/lot/${lot.lot_code}`, 
                    { 
                        lot_code: updatedLot.lot_code,
                        seed_type: updatedLot.seed_type,
                        seed_variety: updatedLot.seed_variety
                    } )

                if (response.data == `lot ${lot.lot_code} updated to ${updatedLot.lot_code}: ${updatedLot.seed_type} - ${updatedLot.seed_variety}`) {
                    dispatch({
                        type: "updateLot",
                        original_lot_code: lot.lot_code,
                        new_lot_code: updatedLot.lot_code,
                        new_seed_type: updatedLot.seed_type,
                        new_seed_variety: updatedLot.seed_variety
                    })

                    if (original_lot_code == updatedLot.lot_code) {
                        setAlertMessage(`Success! Lot ${lot.lot_code} updated`)
                    } else {
                        setAlertMessage(`Success! Lot ${lot.lot_code} updated to ${updatedLot.lot_code}`)
                    }
                }
            } catch (err) {
                setAlertMessage("Lot could not be updated. Please close and try again later")
                console.log(err)
            }
        }
    }


    /////////////////////// DELETE REQUEST TO API => DATABASE  ////////////////////

    function checkDeleteLot(e) {
        e.preventDefault()
        if (lot_stocks[lot.lot_code] > 0 ) {
            setConfirmation("check")
            setAlertMessage(`${lot_stocks[lot.lot_code]}kg in stock. If you delete the lot, products will also be removed from warehouse`)
        } else if (lot_stocks[lot.lot_code] == 0) {
            setConfirmation("check")
            setAlertMessage(`${lot_stocks[lot.lot_code]}kg in stock. Do you wish to delete this lot ?`)
        } else {
            deleteLot() // this is optional if the (else if == 0) check is removed.
        }
    }

    async function deleteLot() {
        setAlertMessage("... deleting ...")
        try {
            const response = await api.delete(
                `warehouse/${warehouse.id}/lot/${lot.lot_code}`
            )
            // only want the reducer to delete from state if we have a success
            if (response.data == `lot ${lot.lot_code} deleted`) {
                dispatch({
                    type: "deleteLot",
                    data: lot.lot_code
                })

                // on success, close EditMode, which prevents another lot card from automatically opening
                setEditMode(false)

            }
        } catch (err) {
            setAlertMessage("Lot could not be updated. Please close and try again later")
            console.log(err)
        }
    }


    useEffect( () => {
        if (confirmation != "check") {
            setAlertMessage("") }
    }, [updatedLot.lot_code, updatedLot.seed_type, updatedLot.seed_variety])


    function handleChangedLot(event) {
        setUpdatedLot( {...updatedLot, lot_code : event.target.value})
    }

    function handleChangedSeedType(event) {
        setUpdatedLot( { ... updatedLot, seed_type: event.target.value, seed_variety: "variety not stated" })
    }

    function handleChangedSeedVariety(event) {
        setUpdatedLot( { ... updatedLot, seed_variety: event.target.value })
    }

    function handleCancelDelete(event) {
        setAlertMessage("")
        setConfirmation("no")
        setUpdatedLot(lot)
    }

    // this function largely stops accidental modification of lot details when checking on a delete action
    function formValue(input_type) {
        if (confirmation == "check") {
            return lot[input_type]
        } else {
            return updatedLot[input_type]
        }
    }

    return (          
        <div className='editLotCard'>
            <div id="editLotHeader">
                <h3 id="editLot-Heading">Edit Lot</h3>
                <h3 id="editLot-LotCode">{lot.lot_code}</h3>
            </div>
            

            <form className="lotForm">

                <label htmlFor="lotCode">Please enter new lot code :</label>
                <input
                    className="lotInputs"
                    id="lotCode"
                    // value={updatedLot.lot_code}
                    value={ formValue('lot_code') }
                    onChange={ handleChangedLot }
                ></input> 

                <label htmlFor="lotSeedType">Please select seed type:</label>
                <select
                    className="lotInputs lotSelect"
                    id="lotSeedType"
                    // value={updatedLot.seed_type}
                    value={ formValue('seed_type')}
                    onChange={ handleChangedSeedType }

                >
                    { uniqueSeedTypes.map( (seed, index) => (
                        <option value={seed.value} key={index}>
                            {seed.label}
                        </option>
                    ))}
                </select>

                <label htmlFor="lotSeedVariety">Please select seed variety :</label>

                <select
                    className="lotInputs lotSelect"
                    id="lotVarietyType"
                    // value={ updatedLot.seed_variety }
                    value={ formValue('seed_variety')}
                    onChange={ handleChangedSeedVariety }
                >
                    {filteredSeedVarieties}
                </select>                        

            </form>


            {confirmation == "check" ? 
            <>
            <div id='buttonContainer'>
                <p>{ alertMessage }</p>
                <button style={{width:"200px"}} onClick={ () => deleteLot()}>continue</button>
                <button style={{width:"200px"}} onClick={ handleCancelDelete }>cancel</button>
            </div>
            </>
            :
            null }

            {alertMessage && confirmation !="check" ? // if alert message, give only the option to exit, not save or delete
             <div id='buttonContainer'>
                <p>{alertMessage}</p>
                <button onClick={ () => setEditMode(false)} id="exitLotButton">exit</button>
    
            </div>
            :
            null}


            {(confirmation != "check" && alertMessage == "") ?
            <div id='buttonContainer'>
                
            <button onClick={ (e) => updateLot(e) } id="saveLotButton">save</button>
            <button onClick={ () => setEditMode(false)} id="exitLotButton">exit</button>
            <button onClick={ (e) => checkDeleteLot(e)} id="deleteLotButton">delete</button>

            </div> :
            null}

            
           
        </div>
    )
}

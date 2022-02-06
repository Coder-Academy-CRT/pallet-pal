import React, {useState, useContext} from 'react';
import palletpalContext from '../../../palletpalContext';
import api from '../../../api';

export default function UpdateLot( {lot, lot_stocks, setEditMode } ) {

    const { state: { warehouse, seeds, lots }, dispatch } = useContext(palletpalContext)
    const [updatedLot, setUpdatedLot] = useState( { lot_code : lot.lot_code, seed_type: lot.seed_type, seed_variety: lot.seed_variety } )
    const [confirmation, setConfirmation] = useState("no")

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

    async function submit(event) {
    event.preventDefault()

    // const res = await api.put(
    //     `/${warehouse.id}/lot/${lot.lot_code}`, 
    //     { 
    //         lot_code: updatedLot.lot_code,
    //         seed_type: updatedLot.seed_type,
    //         seed_variety: updatedLot.seed_variety
    //      } )

    // dispatch({
    //     type: "",
    //     data: ""
    // })

    }

    /////////////////////// DELETE REQUEST TO API => DATABASE  ////////////////////

    function checkDeleteLot(e) {
        e.preventDefault()

        if (lot_stocks[lot.lot_code] > -1 ) {
            setConfirmation("check") 
        } else {
            deleteLot()
        }
    }

  
    async function deleteLot() {
  
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
                window.alert(`Success ! Lot ${lot.lot_code} deleted`)
                setEditMode(false)
            }
        } catch (err) {
            window.alert("Lot could not be deleted. Please close and try again later")
            console.log(err)
        }
    }

    return (          
        <div className='editLotCard'>
            <h2>{lot.lot_code}</h2>
            <div>
                <form onSubmit={submit}>
                    <div id="lotForm">
                        <label htmlFor="lotCode">Please enter new lot code :</label>
                        <input
                            className="lotInputs"
                            id="lotCode"
                            value={updatedLot.lot_code}
                            onChange={(event) => 
                                setUpdatedLot( {...updatedLot, lot_code : event.target.value})}
                        ></input> 

                        <label htmlFor="lotSeedType">Please select seed type:</label>
                        <select
                            className="lotInputs lotSelect"
                            id="lotSeedType"
                            value={updatedLot.seed_type}
                            onChange={(event) => setUpdatedLot( { ... updatedLot, seed_type: event.target.value, seed_variety: "variety not stated" })}

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
                            value={ updatedLot.seed_variety == lot.seed_variety ? lot.seed_variety : updatedLot.seed_variety}
                            onChange={(event) => setUpdatedLot( { ... updatedLot, seed_variety: event.target.value })}
                        >
                            {filteredSeedVarieties}
                        </select>                        
                    </div>
                </form>
            </div>

            {confirmation == "check" ? 
            <>
            <div id='buttonContainer'>
                <p style={{color:"red"}}>{`${lot_stocks[lot.lot_code]}kg in stock. If you delete the lot, products will also be removed from warehouse`}</p>
                <button style={{width:"200px"}} onClick={ () => deleteLot()}>continue</button>
                <button style={{width:"200px"}} onClick={ () => setConfirmation("no")}>cancel</button>
            </div>
            </>
            :
            <div id='buttonContainer'>
                <button onClick={ () => setEditMode(true)} id="saveLotButton">save</button>
                <button onClick={ () => setEditMode(false)} id="exitLotButton">exit</button>
                <button onClick={ (e) => checkDeleteLot(e)} id="deleteLotButton">delete</button>
            </div> }
           
        </div>
    )
}

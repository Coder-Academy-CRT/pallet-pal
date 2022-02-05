import React, { useState, useContext } from "react"
import api from "../../../api"
import palletpalContext from "../../../palletpalContext"

function LotCard( {lot} ) {

    const { state: { warehouse, seeds }, dispatch } = useContext(palletpalContext)

    const [editMode, setEditMode] = useState(false)
    const [updatedLot, setUpdatedLot] = useState( { lot_code : lot.lot_code, seed_type: lot.seed_type, seed_variety: lot.seed_variety } )

    function setEditOn() {
        setEditMode(true)
    }

    function setEditOff() {
        setEditMode(false)
    }

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

   /////////////////////// SEED BAG SIZE & AMOUNTS OF EACH PLUS TOTAL ////////////////////

    let bag_sizes = []  // collection of <li> with both bag_size and cumulative total 
    let total_amount = 0 // cumulative total of each lot by bag_size
    let count = -1  // for providing a key prop in li children

    for (let property in lot) {
        if (property != "lot_code" && property != "seed_variety" && property != "seed_type") {
            count++
            bag_sizes.push(
                <li key={count}>
                    {(`${property}kg bags:    `) + `${lot[property]}kg`}    
                </li>
            )
            total_amount += lot[property]
        }   
    }

    bag_sizes.push( total_amount== "0" ? null : <li key={bag_sizes.length}><hr></hr></li>)
    bag_sizes.push( <li key={bag_sizes.length}><h3>{total_amount == "0" ? "no stock" : `${total_amount} kg`}</h3></li>)


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


    if (editMode) {

        return (
            
            <div className='editLotCard'>

                <h2>{lot.lot_code}</h2>
                <h1>{updatedLot.lot_code}</h1>
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
                        <button>Submit</button>
                    </form>
                </div>

                <div id='buttonContainer'>
                    <button onClick={setEditOff}>save</button>
                    <button onClick={setEditOff}>exit</button>
                </div>
               
            </div>
        )

    } else {
        
        return (
            <>
                <div className='lotCard'>

                    <div id="lotCardLhs">
                        <button onClick={setEditOn}>edit</button>
                    </div>

                    <div id="lotCardMid">
                        <h2>{lot.lot_code}</h2>
                        <p>{`${lot.seed_type} - ${lot.seed_variety}`}</p>
                    </div>

                    <div id="lotCardRhs">
                        <ul>
                            { bag_sizes }
                        </ul>
                    </div>  

                </div>
             
            </>
        )
    }
}

export default LotCard

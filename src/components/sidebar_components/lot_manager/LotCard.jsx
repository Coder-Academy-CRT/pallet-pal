import React, { useState, useContext } from "react"
import api from "../../../api"
import palletpalContext from "../../../palletpalContext"
import UpdateLot from "./UpdateLot"

function LotCard( {lot} ) {

    const { state: { seeds } } = useContext(palletpalContext)

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

    ///////////// VOLUME SECTION OF LotCard => SEED BAG SIZE & AMOUNTS OF EACH PLUS TOTAL ////////////////////
    // this is not modifying the lots, it is collecting the bag details of every lot to assign alongside it in the LotCard

    let bag_sizes = []  // collection of <li> with both bag_size and cumulative total 
    let total_amount = 0 // cumulative total of each lot by bag_size
    let count = -1  // for providing a key prop in li children

    let lot_stocks = {}

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
        lot_stocks[lot.lot_code] = total_amount // summary of total amounts against stock, to pass as prop when deleting lots
    }

    // a "no stock" or total amount is then added to the end of each summary, after an optional horizontal line
    bag_sizes.push( total_amount== "0" ? null : <li key={bag_sizes.length}><hr></hr></li>)
    bag_sizes.push( <li key={bag_sizes.length}><h3>{total_amount == "0" ? "no stock" : `${total_amount} kg`}</h3></li>)


    


    if (editMode) {
        return (
            <UpdateLot lot={lot} lot_stocks={lot_stocks} setEditMode={setEditMode} ></UpdateLot> 
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

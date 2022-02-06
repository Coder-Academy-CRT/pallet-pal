import React, { useState, useContext } from "react"
import UpdateLot from "./UpdateLot"

function LotCard( {lot} ) {

    const [editMode, setEditMode] = useState(false)
 
    ///////////// VOLUME SECTION OF LotCard => SEED BAG SIZE & AMOUNTS OF EACH PLUS TOTAL ////////////////////
    // this is not modifying the lots, it is collecting the bag details of every lot to assign alongside it in the LotCard

    let bag_sizes = []  // collection of <li> with both bag_size and cumulative total 
    let total_amount = 0 // cumulative total of each lot by bag_size
    let count = -1  // for providing a key prop in li children
    let lot_stocks = {} // summary of total amounts against stock, to pass as prop when deleting lots 

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
        lot_stocks[lot.lot_code] = total_amount 
    }

    // a "no stock" or total amount is then added to the end of each summary, after an optional horizontal line
    bag_sizes.push( total_amount== "0" ? null : <li key={bag_sizes.length}><hr></hr></li>)
    bag_sizes.push( <li key={bag_sizes.length}><h3>{total_amount == "0" ? "no stock" : `${total_amount} kg`}</h3></li>)


    return (editMode ? 
        <UpdateLot lot={lot} lot_stocks={lot_stocks} setEditMode={setEditMode} ></UpdateLot> 
        :
        <>
            <div className='lotCard'>
                <div id="lotCardLhs">
                    <button onClick={ () => setEditMode(true) }>edit</button>
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

export default LotCard

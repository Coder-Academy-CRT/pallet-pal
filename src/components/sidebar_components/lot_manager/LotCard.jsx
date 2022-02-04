import { useState } from "react"

function LotCard( {lot} ) {
    const [editMode, setEditMode] = useState(false)

    function setEditOn() {
        setEditMode(true)
    }

    function setEditOff() {
        setEditMode(false)
    }

    const button_style = { 
        backgroundColor: "lightblue",
        width: "45px",
        height: "30px",
        borderRadius: "60px"
    }

    console.log("BYE")
    console.log(lot)

    let bag_sizes = []
    let total_amount = 0

    for (let property in lot) {
        
        if (property != "lot_code" && property != "seed_variety" && property != "seed_type") {
            bag_sizes.push(
                <li>
                    {(`- - - - - - - - ${property}kg bags :`) + `${lot[property]}kg`}    
                </li>
            )
            total_amount += lot[property]
        }
        
    }


    if (editMode) {
        return (
            <div className='lotCard'>
                
                <h3>insert lot</h3>
                <h3>dropdown</h3>
                <button onClick={setEditOff}>save</button>
            </div>
        )
    } else {
        return (
            <div className='lotCard'>

                <h2>{lot.lot_code}</h2>
                <ul>
                    { bag_sizes }
                </ul>
        
                <h3>{ total_amount = "0" ? "no stock" : `Total : ${total_amount} kg` }</h3>

                <button onClick={setEditOn} style={button_style}>edit</button>

            </div>
        )
    }
}

export default LotCard

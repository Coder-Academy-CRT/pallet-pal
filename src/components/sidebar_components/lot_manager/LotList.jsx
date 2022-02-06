import React, { useState, useContext} from "react"
import palletpalContext from "../../../palletpalContext"
import LotCard from "./LotCard"
import CreateLot from "./CreateLot"


function LotList() {

    const { state: { lots, products } } = useContext(palletpalContext)
    const [createLotForm, setCreateLotForm] = useState(false)
    

    let all_lots = []
    
    {lots.forEach( (lot, index) => {

        products.forEach( (product) => {
            if (product.lot_code == lot.lot_code) {
                
                let product_amount = Number(product.bag_size) * Number(product.number_of_bags)
                
                switch (lot[product.bag_size]) {
                    case undefined:
                        lot[product.bag_size] = 0
                        lot[product.bag_size] += product_amount
                        break
                    case true:
                        lot[product.bag_size] += product_amount
                        break
                }        
            }
        })

        all_lots.push( <LotCard key={index} lot={lot}/> )
    })}   

    // rotation and color change for button display
    const newLotButton = (color, degrees) => {
        return {
            color: color,
            transform: `rotate(${degrees}deg)`,
            transitionDuration: "0.5s"
        }
    }

    return (
        <>
            <div id="lotManagerHeader">
                <div>
                    <h2>Lot Manager</h2>
                </div>

                <div id="addLotFormButton">
                    { createLotForm ? 
                    <button onClick={() => setCreateLotForm(false)}><h1 style={ newLotButton("red", 45) }>+</h1></button>
                    :
                    <button onClick={() => setCreateLotForm(true)}><h1 style={ newLotButton("black", 0) }>+</h1></button> }
                </div>
            </div>
            {createLotForm ? <CreateLot/> : null}
            <div id='lotList'>
                {all_lots.sort( (a,b) => (a.props.lot.lot_code > b.props.lot.lot_code) ? 1 : -1)}
            </div>
        </>
    )
}

export default LotList

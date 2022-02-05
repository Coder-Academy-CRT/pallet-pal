import React, { useState, useContext} from "react"
import palletpalContext from "../../../palletpalContext"
import LotCard from "./LotCard"
import AddLot from "./AddLot"


function LotList() {

    const { state: { lots, products } } = useContext(palletpalContext)
    const [openAddLot, setOpenAddLot] = useState(false)
    

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

  
   
    return (
        <>
            <div id="lotManagerHeader">
                <div>
                    <h2>Lot Manager</h2>
                </div>

                <div id="addLotFormButton">
                    {openAddLot ? 
                    <button onClick={setOpenAddLot}><h1>+</h1></button>
                    :
                    <button onClick={setOpenAddLot}><h1>+</h1></button> }
                </div>
            </div>
            {openAddLot ? <AddLot setOpenAddLot={ setOpenAddLot }/> : null}
            <div id='lotList'>
                {all_lots.sort( (a,b) => (a.props.lot.lot_code > b.props.lot.lot_code) ? 1 : -1)}
            </div>
        </>
    )
}

export default LotList

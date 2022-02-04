import React, { useContext} from "react"
import palletpalContext from "../../../palletpalContext"
import LotCard from "./LotCard"


function LotList() {

    const { state: { lots, products } } = useContext(palletpalContext)

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
        <div id='lotList'>
            {all_lots}
        </div>
    )
}

export default LotList

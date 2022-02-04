import React, { useState, useContext } from "react"
import Button from "./Button"
import ProductCard from "./ProductCard"
import palletpalContext from "../../../palletpalContext"

function PalletCard({ palletId }) {
    const {
        state: { products },
        dispatch
    } = useContext(palletpalContext)
    // state to manage pallet card mode
    const [palletCardClicked, setPalletCardClicked] = useState(false)
    // pallet products is an arry of product objects which are on this pallet
    const palletProducts = products.filter(
        (product) => product.pallet_id == palletId
    )

    // prepare all the product card components to be rendered
    const productCards = palletProducts.map((product, index) => (
        <ProductCard
            seedType={product.seed_type}
            bagSize={product.bag_size}
            numOfBags={product.number_of_bags}
            lotCode={product.lot_code}
            key={index}
        />
    ))

    // change mode on click faciliating option button display
    const handleClick = () => {
        setPalletCardClicked(!palletCardClicked)
        dispatch({
            type: "setSelectedPallet",
            data: palletId
        })
    }

    // no conditional required, simply render all product cards.
    // ****NOTE**** removed the outer fragment and now conditionally rendering options WITHIN pallet card
    return (
        <div className='palletCard' palletid={palletId} onClick={handleClick}>
            <span style={{ color: "white", fontWeight: "bold" }}>
                Pallet #{palletId}
            </span>
            {productCards}
            {palletCardClicked ? (
                <div className='buttons'>
                    <Button text='Edit' />
                    <Button text='Move' />
                    <Button text='Dispatch' />
                </div>
            ) : null}
        </div>
    )
}

export default PalletCard

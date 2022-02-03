import React, { useEffect, useState, useContext } from 'react'
import Button from './Button'
import ProductCard from "./ProductCard"
import palletpalContext from '../../../palletpalContext'

function PalletCard({ palletId, palletExist }) {

    const { state: { products } } = useContext(palletpalContext)

    const [palletCardClicked, setPalletCardClicked] = useState(false)
    const [clickedButton, setClickedButton] = useState("")

    const foundProducts = products.filter(product => product.pallet_id == palletId)

    const productCards = []

    if (foundProducts) {
        foundProducts.map(
            (product, index) => productCards.push(
                <ProductCard 
                    seedType={product.seed_type} 
                    bagSize={product.bag_size} 
                    numOfBags={product.number_of_bags}
                    lotCode={product.lot_code}
                    key={index} />
        ))
    } 

    const handleClick = () => {
        setPalletCardClicked(!palletCardClicked)
    }

    return palletExist ? (
        <>
            <div className='palletCard' 
                palletid={palletId} 
                onClick={handleClick}>
                    <span style={{color: "white", fontWeight: "bold"}}>Pallet #{palletId}</span>
                {productCards}
            </div>
            {palletCardClicked ? 
                <div className="buttons">
                    <Button text="Edit" setClickedButton={setClickedButton}/>
                    <Button text="Move" setClickedButton={setClickedButton} />
                    <Button text="Dispatch" setClickedButton={setClickedButton} />
                </div> : null}
        </>
    ) : (
        <div className='palletCard'>
            <p style={{ color: "white" }}>No pallets in this location.</p>
        </div>
    )

}

export default PalletCard

import React, { useEffect, useState } from 'react'
import Button from './Button'
import ProductCard from "./ProductCard"

function PalletCard({ palletId }) {
    const [palletInfo, setPalletInfo] = useState([])
    const [palletCardClicked, setPalletCardClicked] = useState(false)
    const [clickedButton, setClickedButton] = useState("")


    useEffect(async () => {
        const res = await fetch('https://glacial-bayou-38289.herokuapp.com/warehouse/1/populate')
        const data = await res.json()
        setPalletInfo(data)
    }, [])


    const foundProducts = palletInfo.filter(pallet => pallet.pallet_id == palletId)
    // console.log(palletInfo)
    // console.log(sorted[0].number_of_bags) // Array [{seed_type, bag_size * number of bags}, {}, {}]

    const productCards = []

    if (palletId) {
        foundProducts.map(
            product => productCards.push(
                <ProductCard seedType={product.seed_type} 
                    bagSize={product.bag_size} 
                    numOfBags={product.number_of_bags}
                    lotCode={product.lot_code} />
        ))
    }

    const handleClick = () => {
        setPalletCardClicked(!palletCardClicked)
    }

    
    return (
        <>
        <div className='palletCard' 
            palletid={palletId} onClick={handleClick}><span style={{color: "white", fontWeight: "bold"}}>Pallet #{palletId}</span>
            {productCards}
        </div>
        {palletCardClicked ? 
            <div className="buttons">
                <Button text="Edit" setClickedButton={setClickedButton}/>
                <Button text="Move" setClickedButton={setClickedButton} />
                <Button text="Dispatch" setClickedButton={setClickedButton} />
            </div> : null}
        </>
    )

}

export default PalletCard

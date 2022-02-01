import React, { useEffect, useState } from 'react'
import ProductCard from "./ProductCard"

function PalletCard({ palletId }) {
    const [palletInfo, setPalletInfo] = useState([])

    useEffect(async () => {
        const res = await fetch('https://glacial-bayou-38289.herokuapp.com/warehouse/1/populate')
        const data = await res.json()
        setPalletInfo(data)
    }, [])


    const foundProducts = palletInfo.filter(pallet => pallet.pallet_id == palletId)
    // console.log(palletInfo)
    // console.log(sorted[0].number_of_bags) // Array [{seed_type, bag_size * number of bags}, {}, {}]

    const productCards = []
    // for (let i = 0; i < foundProducts.length; i++) {
    //     productCards.push(<ProductCard />)
    // }

    if (palletId) {
        foundProducts.map(
            product => productCards.push(
                <ProductCard seedType={product.seed_type} 
                    bagSize={product.bag_size} 
                    numOfBags={product.number_of_bags}
                    lotCode={product.lot_code} />
        ))
    }

    
    return (
        <div className='palletCard' 
            palletid={palletId}><span style={{color: "white", fontWeight: "bold"}}>Pallet #{palletId}</span>
            {productCards}
        </div>
    )

}

export default PalletCard

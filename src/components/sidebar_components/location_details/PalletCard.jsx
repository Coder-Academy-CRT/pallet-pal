import React, { useState, useContext, useEffect } from 'react'
import Button from './Button'
import ProductCard from './ProductCard'
import palletpalContext from '../../../palletpalContext'

function PalletCard({ palletId }) {
    const {
        state: { products, foundPallets, clickedLocation },
        dispatch
    } = useContext(palletpalContext)
    // state to manage pallet card mode
    const [palletCardClicked, setPalletCardClicked] = useState(false)
    // set classes to style when found/not found
    const [classes, setClasses] = useState('palletCard')
    // pallet products is an arry of product objects which are on this pallet
    const palletProducts = products.filter(
        (product) => product.pallet_id == palletId
    )

    useEffect(() => {
        // set class to normal value
        setClasses('palletCard')
        if (foundPallets.includes(palletId)) {
            // set classes to include found if pallet is a found product
            setClasses('palletCard found')
        }
        // re-rendering every time clicked location changes or when found pallets changes.
    }, [clickedLocation, foundPallets])

    // change mode on click faciliating option button display
    const handleClick = () => {
        setPalletCardClicked(!palletCardClicked)
        dispatch({
            type: 'setSelectedPallet',
            data: palletId
        })
    }

    // no conditional required, simply render all product cards with a map().
    // ****NOTE**** removed the outer fragment and now conditionally rendering options WITHIN pallet card
    return (
        <div className={classes} palletid={palletId} onClick={handleClick}>
            <span style={{ color: 'white', fontWeight: 'bold' }}>
                Pallet #{palletId}
            </span>
            {palletProducts.map((product, index) => (
                <ProductCard
                    seedType={product.seed_type}
                    bagSize={product.bag_size}
                    numOfBags={product.number_of_bags}
                    lotCode={product.lot_code}
                    key={index}
                />
            ))}
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

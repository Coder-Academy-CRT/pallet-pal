import React, { useState, useContext, useEffect } from 'react'
import ProductCard from './ProductCard'
import palletpalContext from '../../../palletpalContext'

function PalletCard({ palletId, locationId }) {
    const {
        state: {
            products,
            foundPallets,
            clickedLocation,
            moveToLocation,
            moveFromLocation
        },
        dispatch
    } = useContext(palletpalContext)

    // to check if palletCard has been clicked, toggle buttons showing or not
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

    // IDEA HOW TO HANDLE MOVE OPERATION
    function handleMoveClick() {
        // set move mode to true
        dispatch({ type: 'setMicroMode', data: { mode: 'Move', bool: true } })
        // set pallet moving
        dispatch({
            type: 'setMovingPalletId',
            data: palletId
        })
        // set the location coordinates of moveFromLocation
        dispatch({ type: 'setMoveFromLocation', data: locationId })
        console.log('clicked')
        console.log(moveFromLocation)
    }

    function setDispatchMode() {
        // set dispatch mode to true
        dispatch({ type: 'setMicroMode', data: { mode: 'Dispatch', bool: true } })
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
                    <button onClick={() => console.log('edit')}>Edit</button>
                    <button onClick={() => handleMoveClick()}>Move</button>
                    <button onClick={() => setDispatchMode()}>Dispatch</button>

                </div>
            ) : null}
        </div>
    )
}

export default PalletCard

import React, { useState, useContext, useEffect } from 'react'
import ProductCard from './ProductCard'
import palletpalContext from '../../../palletpalContext'

function PalletCard({ palletId, locationId }) {
    const {
        state: {
            locations,
            products,
            foundPallets,
            clickedLocation,
            moveToLocation,
            moveFromLocation,
            microModes
        },
        dispatch
    } = useContext(palletpalContext)

    // set classes to style when found/not found
    const [classes, setClasses] = useState('palletCard')
    const [optionsActive, setOptionsActive] = useState(false)
    // pallet products is an arry of product objects which are on this pallet
    const palletProducts = products.filter(
        (product) => product.pallet_id == palletId
    )

    useEffect(() => {
        setOptionsActive(false)
        // set class to normal value
        setClasses('palletCard')
        if (foundPallets.includes(palletId)) {
            // set classes to include found if pallet is a found product
            setClasses('palletCard found')
        }
        // re-rendering every time clicked location changes or when found pallets changes.
    }, [clickedLocation, foundPallets, locations])

    // handle whether to show pallet option or not
    const handleClick = (e) => {
        if (
            e.target.parentElement?.classList.contains('palletCard') ||
            e.target.parentElement.parentElement?.classList.contains(
                'productCard'
            )
        ) {
            // manage pallet active state locally
            setOptionsActive(!optionsActive)
            dispatch({
                type: 'setMicroMode',
                data: { mode: 'PalletOption', bool: !microModes.PalletOption }
            })
        }
        dispatch({
            type: 'setSelectedPallet',
            data: palletId
        })
    }

    function setEditMode() {
        // set edit mode to true
        dispatch({ type: 'setMicroMode', data: { mode: 'Edit', bool: true } })
    }

    // HANDLE MOVE OPERATION
    function handleMoveClick() {
        // INITIATING MOVE SEQUENCE (completed by the Location component's onClick)
        // set move mode to true
        dispatch({ type: 'setMicroMode', data: { mode: 'Move', bool: true } })
        // set pallet moving
        dispatch({
            type: 'setMovingPalletId',
            data: palletId
        })
        // set the location coordinates of moveFromLocation
        dispatch({ type: 'setMoveFromLocation', data: locationId })
    }

    function setDispatchMode() {
        // set dispatch mode to true
        dispatch({
            type: 'setMicroMode',
            data: { mode: 'Dispatch', bool: true }
        })
    }

    // no conditional required, simply render all product cards with a map().
    // ****NOTE**** removed the outer fragment and now conditionally rendering options WITHIN pallet card
    return (
        <div className={classes} palletid={palletId} onClick={handleClick}>
            <span>Pallet #{palletId}</span>
            {palletProducts.map((product, index) => (
                <ProductCard
                    seedType={product.seed_type}
                    seedVariety={product.seed_variety}
                    bagSize={product.bag_size}
                    numOfBags={product.number_of_bags}
                    lotCode={product.lot_code}
                    key={index}
                />
            ))}
            {optionsActive ? (
                <div className='buttons'>
                    <button onClick={() => setEditMode()}>Edit</button>
                    <button onClick={() => handleMoveClick()}>Move</button>
                    <button onClick={() => setDispatchMode()}>Dispatch</button>
                </div>
            ) : null}
        </div>
    )
}

export default PalletCard

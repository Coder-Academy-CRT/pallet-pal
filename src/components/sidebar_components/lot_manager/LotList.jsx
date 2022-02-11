import React, { useState, useContext } from 'react'
import palletpalContext from '../../../palletpalContext'
import LotCard from './LotCard'
import CreateLot from './CreateLot'

function LotList() {
    const {
        state: { lots, products }
    } = useContext(palletpalContext)
    const [createLotForm, setCreateLotForm] = useState(false)

    let all_lots = []

    {
        lots.forEach((lot, index) => {
            // for every lot, go through the products and find matches in the products
            // need to reset the lot otherwise every render performs this again
            lot = {
                lot_code: lot.lot_code,
                seed_type: lot.seed_type,
                seed_variety: lot.seed_variety
            }
            products.forEach((product) => {
                if (product.lot_code == lot.lot_code) {
                    let product_amount =
                        Number(product.bag_size) *
                        Number(product.number_of_bags)
                    // for any matches, take the total volume of the product, and add it to a new property in the lot

                    switch (!!lot[product.bag_size]) {
                        case false: // covers "undefined"
                            lot[product.bag_size] = 0
                            lot[product.bag_size] += product_amount
                            break
                        case true:
                            lot[product.bag_size] += product_amount
                            break
                    }
                }
            })
            // once each lot matches with every product, push the Lotcard, sending the updated lot details as a prop
            all_lots.push(<LotCard key={index} lot={lot} />)
        })
    }

    // rotation and color change for button display
    const rotateButton = (color, degrees, time) => {
        return {
            color: 'white',
            transform: `rotate(${degrees}deg)`,
            transitionDuration: time
        }
    }

    // translation into the menu and back to header
    const moveButton = (pixels, time) => {
        return {
            transform: `translateY(${pixels})`,
            transitionDuration: time
        }
    }

    return (
        <>
            <div id='lotManagerHeader'>
                <h2>Lot Manager</h2>

                <div id='lotManagerHeaderRhs'>
                    {createLotForm ? null : <p>Add Lot</p>}
                    {createLotForm ? (
                        <button
                            style={moveButton('40px', '1s')}
                            onClick={() => setCreateLotForm(false)}>
                            <h1 style={rotateButton('red', 45, '1s')}>+</h1>
                        </button>
                    ) : (
                        <button
                            style={moveButton('0px', '0.5s')}
                            onClick={() => setCreateLotForm(true)}>
                            <h1 style={rotateButton('black', 0, '0.5s')}>+</h1>
                        </button>
                    )}
                </div>
            </div>
            {createLotForm ? (
                <CreateLot setCreateLotForm={setCreateLotForm} />
            ) : null}
            <div id='lotList'>
                {all_lots.sort((a, b) =>
                    a.props.lot.lot_code > b.props.lot.lot_code ? 1 : -1
                )}
            </div>
        </>
    )
}

export default LotList

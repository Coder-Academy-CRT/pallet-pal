import React, { useContext, useState, useEffect } from 'react';
import api from '../../../api';
import palletpalContext from '../../../palletpalContext';

export default function EditPallet() {
    const { state: { products, microModes, selectedPallet, lots }, dispatch } = useContext(palletpalContext)
    // keep track local change before send to db
    const [productList, setProductList] = useState(selectedPallet.products_on_pallet)
    const [lotsData, setLotsData] = useState([])

    const style = {
        position: "absolute",
        top: "calc(100vh/2 - 200px)",
        left: "calc(100vw/2 - 500px)",
        width: "500px",
        height: "300px",
        borderRadius: "10px",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    const styleButton = {
		padding: "5px 20px",
		margin: "20px 50px"
	}

    const productListStyle = {
        display: "flex",
        justifyContent: "center",
    }

    // Create drop down list for lot_code
    useEffect(() => {
        // declare temp lists for working
        let lotList = new Set([])
        let lotOptions = []

        // get every current lot and seed and push to temp lists
        products.forEach((element) => {
            lotList.add(`${element.lot_code}`)
        })

        // build options lists
        lotList.forEach((lot) => {
            lotOptions.push({ value: lot, label: lot })
        })

        // set state from option lists
        setLotsData(lotOptions)
    }, [products])

    // Create dropdown list for lot code, 2x input for bag size and number of bags
    function createField() {
        return (
            <></>
        )
    }
    // handle user input
    function handleChange(e) {
        const productId = e.target.parentElement.parentElement.id
        const index = productList.findIndex(product => product.product_id == productId)
        setProductList(prevState => {
            if (e.target.name == 'lot_code') {
                return [...prevState, prevState[index].lot_code = e.target.value ]
            } else if (e.target.name == 'bag_size') {
                return [...prevState, prevState[index].bag_size = e.target.value ]
            } else if (e.target.name == 'number_of_bags') {
                return [...prevState, prevState[index].number_of_bags = e.target.value ]
            } else {
                return prevState
            }
        })
    }


	// Cancel button
	const handleClose = () => {
        dispatch({ type: 'setMicroMode', data: { mode: 'Edit', bool: false } })
	}


    // API call
    async function handleAPICall () {
        const message = []
        const filteredList = productList.filter(element => typeof element != 'string')

        filteredList.forEach(async (product) => {
            // Find the new seed type and seed variety after user change the lot code
            const seedData = lots.filter(lot => lot.lot_code == product.lot_code)

            try {
                const response = await api.put(
                    `product/${product.product_id}`, 
                    {
                        lot_code: product.lot_code,
                        bag_size: product.bag_size,
                        number_of_bags: product.number_of_bags
                    })
                    if (response.data == `product ${product.product_id} updated`) {
                        dispatch({
                            type: 'editProductsAfterEdit',
                            payload: { product: product, product_id: product.product_id, seed_type: seedData[0].seed_type, seed_variety: seedData[0].seed_variety }
                        })
                        message.push('success')
                        console.log("success")
                    }
            } catch (err) {
                alert("Product could not be updated. Please close and try again later")
                message.push('error')
            }
        })
        if (!message.includes('error')) {
            alert("All updated!")
        }
    }

    // confirm button
    const handleSubmit = (e) => {
        e.preventDefault()
        confirm("Confirm?")
        if (confirm) {
            handleAPICall()
            dispatch({ type: 'setMicroMode', data: { mode: 'Edit', bool: false } })
        }
    }

    return (
        <div style={style}>
              <div className='text-wrapper'>
                  <h1>Edit Pallet #{selectedPallet.pallet_id}</h1>
                  <form>
                    {selectedPallet.products_on_pallet.map((product, index) => (
                        <div key={product.product_id} id={product.product_id} pos={index} style={productListStyle}>
                            <div>
                                <select
                                    name="lot_code"
                                    value={productList[index].lot_code}
                                    onChange={handleChange}>
                                    <option value="" disabled>Please select lot code</option>
                                    {lotsData ? (
                                        <>
                                            {lotsData.map((element, index) => (
                                                <option value={element.value} key={index}>
                                                    {element.label}
                                                </option>
                                            ))}
                                        </>
                                    ) : null}
                                </select>
                            </div>
                            <div>
                                <input 
                                    type="number"
                                    min="0"
                                    value={productList[index].bag_size}
                                    onChange={handleChange}
                                    name="bag_size"
                                    size="10"
                                />
                            </div>
                            <div>
                                <input 
                                    type="number"
                                    min="0"
                                    value={productList[index].number_of_bags}
                                    onChange={handleChange}
                                    name="number_of_bags"
                                    size="10"
                                />
                            </div>
                        </div>
                    ))}
                    <div>
                        <button style={styleButton} type="button" onClick={handleClose}>Cancel</button>
                        <button style={styleButton} onClick={handleSubmit}>Confirm</button>
                    </div>
                  </form>
              </div>
        </div>
    ) 
}   


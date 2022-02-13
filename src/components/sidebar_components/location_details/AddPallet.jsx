import React, { useContext, useState, useEffect } from 'react'
import api from '../../../api'
import palletpalContext from '../../../palletpalContext'

export default function AddPallet() {
    const {
        state: { products, microModes, clickedLocation, warehouse, lots },
        dispatch
    } = useContext(palletpalContext)
    const [currentLots, setCurrentLots] = useState([])
    const [newProduct, setNewProduct] = useState({
        lot_code: '',
        bag_size: '',
        number_of_bags: ''
    })
    const [newProductList, setNewProductList] = useState([])

    // Create drop down list for lot_code
    useEffect(() => {
        const newList = []
        lots.forEach((lot) =>
            newList.push({ value: lot.lot_code, label: lot.lot_code })
        )
        // set state from option lists
        setCurrentLots(newList)
    }, [products])

    // Create dropdown list for lot code, 2x input for bag size and number of bags
    const createField = () => {
        return (
            <div className='inputWrapper'>
                <select
                    name='lot_code'
                    value={newProduct.lot_code}
                    onChange={handleChange}
                    required='true'>
                    <option value='' disabled>
                        Please select lot code
                    </option>
                    {currentLots ? (
                        <>
                            {currentLots.map((element, index) => (
                                <option value={element.value} key={index}>
                                    {element.label}
                                </option>
                            ))}
                        </>
                    ) : null}
                </select>
                <input
                    type='number'
                    min='0'
                    placeholder='size(kg)'
                    onChange={handleChange}
                    name='bag_size'
                    size='10'
                    value={newProduct.bag_size}
                />
                <input
                    type='number'
                    min='0'
                    placeholder='# bags'
                    onChange={handleChange}
                    name='number_of_bags'
                    size='10'
                    value={newProduct.number_of_bags}
                />
                <button type='button' onClick={createProduct}>
                    +
                </button>
            </div>
        )
    }

    const createProduct = (e) => {
        e.preventDefault()

        if (
            newProduct.lot_code == '' ||
            newProduct.bag_size == '' ||
            newProduct.number_of_bags == ''
        ) {
            alert('fill all fields')
            return
        }
        // store the 'new' product in newProductList temporarily, and send request to db when user click 'confirm' button
        setNewProductList([...newProductList, newProduct])
        // reset input field placeholder value

        setNewProduct({
            lot_code: '',
            bag_size: '',
            number_of_bags: ''
        })
    }

    // handle user input (includes currentLots_code, bag size and number of bags)
    const handleChange = (e) => {
        setNewProduct((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    // handle when user delete individual product before they click confirm
    const handleRemove = (e) => {
        e.preventDefault()
        const filteredList = newProductList.filter(
            (product, index) => index != e.target.parentElement.id
        )
        setNewProductList(filteredList)
    }

    // close button
    const handleClose = () => {
        if (newProductList.length != 0) {
            const resolved = confirm(
                'You sure? Product has not been created yet.'
            )
            if (resolved) {
                dispatch({
                    type: 'setMicroMode',
                    data: { mode: 'AddPallet', bool: false }
                })
            }
        } else {
            dispatch({
                type: 'setMicroMode',
                data: { mode: 'AddPallet', bool: false }
            })
        }
    }

    async function handleAPICall(dataArray) {
        // for pop up window when all products have been added into db successfully
        const message = []
        let newPalletId = ''

        // Create pallet with the first product
        try {
            const response = await api.post(
                `warehouse/${warehouse.id}/location/${clickedLocation.coordinates}/products`,
                dataArray[0]
            )
            if (response.data.hasOwnProperty('product_id')) {
                newPalletId = response.data.pallet_id

                // use response object to update Products as it returns the whole object
                dispatch({
                    type: 'addNewProductToProducts',
                    data: response.data
                })
                message.push('success')
            }
        } catch (err) {
            setAlertMessage(
                'Product could not be created. Please close and try again later'
            )
            message.push('error')
        }

        // Add the rest of the products to the just created pallet
        // Remove the first product as it has been created in db
        if (message[0] == 'success') {
            dataArray.splice(0, 1)
            dataArray.forEach(async (product) => {
                try {
                    const response2 = await api.post(
                        `pallet/${newPalletId}/products`,
                        product
                    )
                    if (response2.data.hasOwnProperty('product_id')) {
                        // use response object to update Products as it should be a whole object
                        dispatch({
                            type: 'addNewProductToProducts',
                            data: response2.data
                        })
                        message.push('success')
                    }
                } catch (err) {
                    alert(
                        'Product could not be created. Please close and try again later'
                    )
                    message.push('error')
                }
            })

            if (!message[0].includes('error')) {
                alert('All done!')
            }
            // Add new pallet id to Locations
            dispatch({
                type: 'addNewPalletToLocations',
                data: newPalletId
            })
            // Close the addPallet option
            dispatch({
                type: 'setMicroMode',
                data: { mode: 'AddPallet', bool: false }
            })
        }
    }

    // confirm button
    async function handleSubmit(e) {
        e.preventDefault()
        // Find products that have the same lot code and bag size
        var duplicateProducts = Object.values(
            newProductList.reduce((c, v) => {
                let k = v.lot_code + '-' + v.bag_size
                c[k] = c[k] || []
                c[k].push(v)
                return c
            }, {})
        ).reduce((c, v) => (v.length > 1 ? c.concat(v) : c), [])

        if (duplicateProducts.length != 0) {
            const resolved = confirm(
                'Some products are having same lot code and bag size, do you want to merge them together? Alternatively you can go back to edit your products.'
            )
            if (resolved) {
                // Merge objects with same lot code and sum the number of bags
                const merged = newProductList.reduce((a, c) => {
                    let x = a.find(
                        (e) =>
                            e.lot_code === c.lot_code &&
                            e.bag_size === c.bag_size
                    )
                    if (!x) {
                        a.push(Object.assign({}, c))
                    } else {
                        Number(
                            (x.number_of_bags =
                                Number(x.number_of_bags) + +c.number_of_bags)
                        )
                    }
                    return a
                }, [])
                setNewProductList(merged)
                handleAPICall(merged)
            } else {
                alert('Please edit your products.')
            }
        } else {
            handleAPICall(newProductList)
        }
    }

    return (
        <div className='lockout'>
            <div id='addPallet'>
                <header>
                    <h1>Create Pallet</h1>
                    <div>
                        <p>
                            Add products by selecting the lot code, bag size and
                            number of bags.
                        </p>
                        <p>Remove unwanted items by clicking the X.</p>
                        <p>Confirm to finalize pallet creation</p>
                    </div>
                </header>
                <div>
                    <form>
                        {newProductList.length != 0 ? (
                            <div>
                                {createField()}
                                <div id='productContainer'>
                                    {newProductList.map((product, index) => (
                                        <div
                                            id={index}
                                            key={index}
                                            className='productField'>
                                            <div className='info'>
                                                {product.lot_code}
                                            </div>
                                            <div className='info'>
                                                {product.bag_size} kg
                                            </div>
                                            <div className='info'>
                                                {product.number_of_bags} bags
                                            </div>
                                            <button
                                                type='button'
                                                onClick={handleRemove}>
                                                x
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            createField()
                        )}
                        {newProductList.length != 0 ? (
                            <div className='buttonWrapper'>
                                <button type='button' onClick={handleClose}>
                                    Cancel
                                </button>
                                <button onClick={handleSubmit}>Confirm</button>
                            </div>
                        ) : (
                            <div className='buttonWrapper'>
                                <button type='button' onClick={handleClose}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

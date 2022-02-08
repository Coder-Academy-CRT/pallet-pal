import React, { useContext, useState, useEffect } from 'react';
import api from '../../../api';
import palletpalContext from '../../../palletpalContext';

export default function AddPallet() {
    const { state: { products, microModes, clickedLocation, warehouse }, dispatch } = useContext(palletpalContext)
    const [lots, setLots] = useState([])
    const [newProduct, setNewProduct] = useState({
        lot_code: '',
        bag_size: '',
        number_of_bags: ''
    })
    const [newProductList, setNewProductList] = useState([])

    const style = {
        color: "white",
        display: "flex",
        justifyContent: "space-around",
    }

    const styleBox = {
        width: "100%",
        border: "solid 1px white",
        display: "flex",
        justifyContent: "center"
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
        setLots(lotOptions)
    }, [products])

    // Create dropdown list for lot code, 2x input for bag size and number of bags
    function createField() {
        return (
            <>
                    <select
                        name="lot_code"
                        value={newProduct.lot_code}
                        onChange={handleChange}>
                        <option value="" disabled>Please select lot code</option>
                        {lots ? (
                            <>
                                {lots.map((element, index) => (
                                    <option value={element.value} key={index}>
                                        {element.label}
                                    </option>
                                ))}
                            </>
                        ) : null}
                    </select>
                    <input 
                        type="number"
                        min="0"
                        placeholder="bag size"
                        onChange={handleChange}
                        name="bag_size"
                        value={newProduct.bag_size}
                        size="10"
                    />
                    <input 
                        type="number"
                        min="0"
                        placeholder="num of bags"
                        onChange={handleChange}
                        name="number_of_bags"
                        value={newProduct.number_of_bags}
                        size="10"
                    />
                    <button style={{ padding: "3px", fontSize: "1em"}} onClick={createProduct}>+</button>
            </>
        )
    }

    const createProduct = (e) => {
        e.preventDefault()
        // store the 'new' product in newProductList temporarily, and send request to db when user click 'confirm' button 
        setNewProductList([...newProductList, newProduct])
        // reset input field placeholder value
        setNewProduct({
            lot_code: '',
            bag_size: '',
            number_of_bags: ''
        })
    }

    // handle user input (includes lots_code, bag size and number of bags)
    const handleChange = (e) => {
        setNewProduct(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }
    // ------------------ NEED TEST OUT ------------------ //
    const handleRemove = (e) => {
        e.preventDefault()
        newProductList.filter(product => product.id == e.target.ParentElement.id)
    }
    // ------------------ NEED TEST OUT ------------------ //

    // close button
    const handleClose = () => {
        if (newProductList.length != 0) {
            confirm("You sure? Product has not been created yet.")
            if(confirm) {
                dispatch({ type: 'setMicroMode', data: { mode: 'AddPallet', bool: false } })
            }
        } else {
            dispatch({ type: 'setMicroMode', data: { mode: 'AddPallet', bool: false } })
        }
    }

    // confirm button
    async function handleSubmit(e) {
        const message = []
        e.preventDefault()
        // Create pallet with the first product 
        try {
            const response = await api.post(
                `warehouse/${warehouse.id}/location/${clickedLocation.coordinates}/products`, newProductList[0]
            )
            if (response.data.hasOwnProperty('product_id')){
                const newPalletId = response.data.pallet_id
                // use response object to update Products as it should be a whole object
                // dispatch({
                //     type: "addNewProductToProducts",
                //     data: response.data
                // })
                // dispatch({
                //     type: "addNewPalletToLocations",
                //     data: newPalletId
                // })
                message.push('success')
                console.log("Success")
            }
        } catch (err) {
            setAlertMessage("Product could not be created. Please close and try again later")
            message.push('error')
            console.log(err)
        }
        // Add the rest of the products to the just created pallet
        // Remove the first product as it has been created in db
        if (message[0] == 'success') {
            newProductList.splice(0, 1)
            newProductList.forEach(async (product) => {
                try {
                    const response2 = await api.post(
                        `pallet/${newPalletId}/products`, product
                    )
                    if (response2.data.hasOwnProperty('product_id')){
                        // use response object to update Products as it should be a whole object
                        // dispatch({
                        //     type: "addNewProductToProducts",
                        //     data: response.data
                        // })
                        // dispatch({
                        //     type: "addNewPalletToLocations",
                        //     data: newPalletId
                        // })
                        const newPalletId = response.data.pallet_id
                        message.push('success')
                        console.log("Success")
                    }
                } catch (err) {
                    message.push('error')
                    console.log(err)
                }
            })
            if (!message[0].includes('error')) {
                alert("All done!")
            }
        }
    }

    


    return (
        <div>
            <form onClick={handleSubmit}>
                {newProductList.length != 0 ? (
                        <div>
                            {newProductList.map((product, index) => (
                                <div style={style} id={index}>
                                    <div style={styleBox} key={index}>{product.lot_code}</div>
                                    <div style={styleBox} key={index}>{product.number_of_bags} bags</div>
                                    <div style={styleBox} key={index}>{product.bag_size} kg each</div>
                                    <button onClick={handleRemove}>x</button>
                                </div>
                            ))}
                            {createField()}
                        </div>
                ) : createField()}
                {newProductList.length != 0 ? (
                    <div>
                        <button onClick={handleClose}>Cancel</button>
                        <button>Confirm</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={handleClose}>Cancel</button>
                    </div>
                )}
            </form>
        </div>
    ) 
}


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

    // --------------------------------------------------- //
    // ----------------------STYLE------------------------ //
 
    const cardWrapper = {
        position: "absolute",
        top: "calc(100vh/2 - 300px)",
        left: "calc(100vw/2 - 500px)",
        width: "900px",
        height: "500px",
        borderRadius: "10px",
        backgroundColor: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }   

    const title = {
        marginBottom: "1rem"
    }

    const instruction = {
		background: "lightGrey",
		width: "85%",
		fontSize: "0.8rem",
		marginBottom: "2rem",
		padding: "10px 8px",
		lineHeight: "1.5"
	}

    const inputWrapper = {
        display: "flex",
        alignItems: "center"
    }

    const productDiv = {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "5px"
    }

    const fieldDiv = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }

    const smlBtn = {
        fontSize: "1.2rem",
        padding: "0px 2px",
        border: "none",
        background: "none",
        marginLeft: "10px"
    }

    const buttonWrapper = {
        marginTop: "1rem"
    }

    const buttonStyle = {
		padding: "5px 20px",
		margin: "20px 50px"
	}

    // ----------------------STYLE------------------------ //
    // --------------------------------------------------- //

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
    const createField = () => {
        return (
            <div style={inputWrapper}>
                <div>
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
                </div>
                <div>
                    <input 
                        type="number"
                        min="0"
                        placeholder="bag size"
                        onChange={handleChange}
                        name="bag_size"
                        size="10"
                        value={newProduct.bag_size}
                    />
                </div>
                <div>
                    <input 
                        type="number"
                        min="0"
                        placeholder="num of bags"
                        onChange={handleChange}
                        name="number_of_bags"
                        size="10"
                        value={newProduct.number_of_bags}
                    />
                </div>
                <button style={smlBtn} type="button" onClick={createProduct}>+</button>
            </div>
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
    // handle when user delete individual product before they click confirm
    const handleRemove = (e) => {
        e.preventDefault()
        const filteredList = newProductList.filter((product, index) => index != e.target.parentElement.id)
        setNewProductList(filteredList)
    }

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

    async function handleAPICall (dataArray) {
            // for pop up window when all products have been added into db successfully
            const message = []
            let newPalletId = ''
            // Create pallet with the first product 
            try {
                const response = await api.post(
                    `warehouse/${warehouse.id}/location/${clickedLocation.coordinates}/products`, dataArray[0]
                )
                if (response.data.hasOwnProperty('product_id')){
                    newPalletId = response.data.pallet_id
                    // use response object to update Products as it returns the whole object
                    dispatch({
                        type: "addNewProductToProducts",
                        data: response.data
                    })
                    message.push('success')
                }
            } catch (err) {
                setAlertMessage("Product could not be created. Please close and try again later")
                message.push('error')
            }
            // Add the rest of the products to the just created pallet
            // Remove the first product as it has been created in db
            if (message[0] == 'success') {
                dataArray.splice(0, 1)
                dataArray.forEach(async (product) => {
                    try {
                        const response2 = await api.post(
                            `pallet/${newPalletId}/products`, product
                        )
                        if (response2.data.hasOwnProperty('product_id')){
                            // use response object to update Products as it should be a whole object
                            dispatch({
                                type: "addNewProductToProducts",
                                data: response2.data
                            })

                            message.push('success')
                        }
                    } catch (err) {
                        setAlertMessage("Product could not be created. Please close and try again later")
                        message.push('error')
                    }
                })
                if (!message[0].includes('error')) {
                    alert("All done!")
                }
                // Add new pallet id to Locations
                dispatch({
                    type: "addNewPalletToLocations",
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
        var duplicateProducts = Object.values(newProductList.reduce((c, v) => {
            let k = v.lot_code + '-' + v.bag_size;
            c[k] = c[k] || [];
            c[k].push(v);
            return c;
          }, {})).reduce((c, v) => v.length > 1 ? c.concat(v) : c, []);
        
        if (duplicateProducts.length != 0) {
            confirm("Some products are having same lot code and bag size, do you want to merge them together? Alternatively you can go back to edit your products.")
            if (confirm) {
                // Merge objects with same lot code and sum the number of bags
                const merged =  newProductList.reduce((a,c)=>{
                    let x = a.find(e => e.lot_code===c.lot_code && e.bag_size===c.bag_size)
                    if(!x) {
                        a.push(Object.assign({},c))
                    } else {
                        Number(x.number_of_bags = Number(x.number_of_bags) + + c.number_of_bags)
                    }
                    return a
                },[])
                setNewProductList(merged)
                handleAPICall(merged)

            } else {
                alert("Please edit your products.")
            }
        } else {
            handleAPICall(newProductList)
        }
    }

    return (
        <div style={cardWrapper}>
            <div style={title}>
                <h1>Create Pallet</h1>
            </div>
            <div style={instruction}>
					<p>* You can add a product by selecting the lot code and enter bag size and the number of bags.</p>
					<p>* Then click the + button to add a product.</p>
					<p>* You can click the x button to remove the product.</p>
                    <p>* Please click confirm to create your new pallet.</p>
				</div>
            <div>
                <form>
                    {newProductList.length != 0 ? (
                            <div>
                                {createField()}
                                {newProductList.map((product, index) => (
                                    <div style={productDiv} id={index} key={index}>
                                        <div style={fieldDiv}>{product.lot_code}</div>
                                        <div style={fieldDiv}>{product.bag_size} kg</div>
                                        <div style={fieldDiv}>{product.number_of_bags} bags</div>
                                        <button style={smlBtn} type="button" onClick={handleRemove}>x</button>
                                    </div>
                                ))}
                            </div>
                    ) : createField()}
                    {newProductList.length != 0 ? (
                        <div style={buttonWrapper}>
                            <button style={buttonStyle} type="button" onClick={handleClose}>Cancel</button>
                            <button style={buttonStyle} onClick={handleSubmit}>Confirm</button>
                        </div>
                    ) : (
                        <div style={buttonWrapper}>
                            <button style={buttonStyle} type="button" onClick={handleClose}>Cancel</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    ) 
}


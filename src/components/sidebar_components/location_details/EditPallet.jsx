import React, { useContext, useState, useEffect } from 'react';
import api from '../../../api';
import palletpalContext from '../../../palletpalContext';

export default function EditPallet() {
    const { state: { products, microModes, selectedPallet, warehouse }, dispatch } = useContext(palletpalContext)
    // keep track local change before send to db
    const [productList, setProductList] = useState(selectedPallet.products_on_pallet)
    const [lots, setLots] = useState([])

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
        setLots(lotOptions)
    }, [products])

    // Create dropdown list for lot code, 2x input for bag size and number of bags
    function createField() {
        return (
            <></>
        )
    }

    function handleChange() {
        console.log("hello")
    }

    // close button
    const handleClose = () => {
        console.log("hello")

    }

    // submit button
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("hello")

    }

    return (
        <div style={style}>
              <div className='text-wrapper'>
                  <h1>Edit Pallet #{selectedPallet.pallet_id}</h1>
                  <form>
                    {selectedPallet.products_on_pallet.map((product, index) => (
                        <div key={product.product_id} id={product.product_id} style={productListStyle}>
                            <div>
                                <select
                                    name="lot_code"
                                    value={productList[index].lot_code}
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
                                {productList[index].seed_type}
                            </div>
                            <div>
                                <input 
                                    type="number"
                                    min="0"
                                    placeholder="bag size"
                                    onChange={handleChange}
                                    name="bag_size"
                                    size="10"
                                    value={productList[index].bag_size}
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
                                    value={productList[index].number_of_bags}
                                />
                            </div>
                        </div>
                    ))}
                    <div>
                        <button type="button" onClick={handleClose}>Cancel</button>
                        <button onClick={handleSubmit}>Confirm</button>
                    </div>
                  </form>
              </div>
        </div>
    ) 
}   

export function prepLotCodes (products, lotList, lotOptions) {
    // get every current lot and seed and push to temp lists
    products.forEach((element) => {
        lotList.add(`${element.lot_code}`)
    })

    // build options lists
    lotList.forEach((lot) => {
        lotOptions.push({ value: lot, label: lot })
    })
}


export function handleAddProductAPICall(productList, pallet, dispatch, api, message) {
    productList.forEach(async (product) => {
        try {
            const response2 = await api.post(
                `pallet/${pallet.pallet_id}/products`, product
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
            alert("Product could not be created. Please close and try again later")
            message.push('error')
        }
    })
}

import React, { useContext, useState } from 'react'
import api from '../../../api'
import palletpalContext from '../../../palletpalContext'

export default function DispatchPallet() {
	const { state: { selectedPallet }, dispatch } = useContext(palletpalContext)

	// This state is for the delete button next to each product (when user want to dispatch the whole product)
	const [productList, setProductList] = useState(selectedPallet.products_on_pallet)
	// Use to store form data and update it to productList once user hit dispatch
	const [copyProductList, setCopyProductList] = useState(productList)

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
        alignItems: "center",
		zIndex: "5"

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

	const textWrapper = {
		marginBottom: "10px"
	}

    const productDiv = {
        display: "flex",
        justifyContent: "space-around",
    }

    const fieldDiv = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
		marginBottom: "10px"
    }

    const smlBtn = {
        fontSize: "1rem",
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
	// Update the number of bags that user want to dispatch
	const handleChange = (e) => {
		// product id of that product
		const productId = e.target.parentElement.parentElement.id

		const updatedProductInfo = copyProductList.map(product => {
			if (product.product_id == productId) {
				// e.target.value is the number of bags that user want to dispatch
				return { ...product, number_of_bags: e.target.value }
			}
			return product
		})
		setCopyProductList(updatedProductInfo)
	}


	// Delete(dispatch) button next to each product
	const handleDelete = (e) => {
		const isConfirmed = confirm("You want to dispatch this product?")
		if (isConfirmed) {
			const productId = e.target.parentElement.id
			const updatedProductInfo = productList.map((product, index) => {
				if (product.product_id == productId) {
					// dispatched: true use for rendering <div>Product has been dispatched</div> in dispatch box after user click the close button
					return { ...product, number_of_bags: product.number_of_bags, dispatched: true }
				}
				return product
			})
			setCopyProductList(updatedProductInfo)
			setProductList(updatedProductInfo)
		}
		e.preventDefault()
	}

	// Cancel button
	const handleClose = () => {
        dispatch({ type: 'setMicroMode', data: { mode: 'Dispatch', bool: false } })
	}

	// Dispatch button
	async function handleSubmit(e) {
		e.preventDefault()
		const isConfirmed = confirm("Confirm?")
		if (isConfirmed) {
			// Update productList.number_of_bags with the dispatched number of bags
			for ( let i = 0; i < productList.length; i++ ) {
				for ( let k = 0; k < copyProductList.length; k++) {
				  if (copyProductList[k].product_id == productList[i].product_id) {
					productList[i].number_of_bags = (productList[i].number_of_bags - copyProductList[k].number_of_bags)
				}
			  }
			}
			const message = []
			productList.forEach(async (product) => {
				try {
					const response = await api.put(
						`product/${product.product_id}`,
						{
							lot_code: product.lot_code,
							bag_size: product.bag_size,
							number_of_bags: product.number_of_bags
						}
					)
					if (response.data == `product ${product.product_id} updated`) {
						message.push('success')
						// Update selectedPallet data
						dispatch({
							type: "updatePalletDataAfterDispatch",
							data: productList
						}),
						// Update products data with the updated selectedPallet data
						dispatch({
							type: 'updateProducts', 
							data: productList
						})
					} 
				} catch (err) {
					setAlertMessage("Sorry, something goes wrong. Please close and try again later")
					message.push('fail')

				}
			})
		}
		// If no product left on the pallet, remove the pallet
		const filteredList = productList.filter(
			(product) => product.number_of_bags != 0
		)
		if (filteredList.length == 0) {
			alert(`No product left on pallet#${selectedPallet.pallet_id}, this pallet will be removed.`)
			dispatch({
				type: 'removePalletFromLocation',
				data: selectedPallet.pallet_id
			})
			dispatch({
				type: 'setSelectedPallet',
				data: ''
			})
		}
		dispatch({ type: 'setMicroMode', data: { mode: 'Dispatch', bool: false } })
	}


  return (
			<div style={cardWrapper}>
				<div style={title}>
					<h1>Dispatch - Pallet #{selectedPallet.pallet_id}</h1>
				</div>
				<div style={instruction}>
					<p>* Please enter the number of bags you want to dispatch.</p>
					<p>* If you do not want to dispatch certain product, please enter 0.</p>
					<p>* If you wish to dispatch the whole product, please click the x button next to that product.</p>
					<p>* Please click confirm to confirm your pallet.</p>
					<p>* Pallet will be removed if there is no products exist.</p>
				</div>
				{productList.length > 0 ? 
					<form onSubmit={handleSubmit}>
						{productList.map(product => (
							product.number_of_bags > 0 ? 
								product.dispatched ? 
									<div style={textWrapper}>
										<p>Product has been dispatched</p>
									</div> :
										<div style={productDiv} id={product.product_id} key={product.id}>
											<div style={fieldDiv}>{product.seed_type.toUpperCase()}</div>
											<div style={fieldDiv}>{product.lot_code}</div>
											<div style={fieldDiv}>{parseInt(product.bag_size)} kg</div>
											<div>
												<input
													style={fieldDiv} 
													type="number"
													min="0"
													max={product.number_of_bags}
													size="25"
													name={product.id}
													placeholder={product.number_of_bags}
													onChange={handleChange}
													onInput={handleChange}
												/>
											</div>
											<button style={smlBtn} onClick={handleDelete}>X</button>
										</div>
							: (
								<div style={textWrapper}>
									<p>Product has been dispatched</p>
								</div>
							)
						))}
							<div style={buttonWrapper}>
								<button style={buttonStyle} onClick={handleClose}>Cancel</button>
								<button style={buttonStyle} type="submit" onClick={(e) => handleSubmit(e)}>Confirm</button>
							</div>
					</form>
					: (
						<div style={title}>
							<h3>No product exist on this pallet, this pallet will be removed.</h3>
							<button style={buttonStyle} onClick={handleClose}>Confirm</button>
						</div>
					)}
			</div>
  ) 
}

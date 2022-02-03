import React, { useContext, useState } from 'react'
import palletpalContext from '../../../palletpalContext'

export default function DispatchBox() {
	const { state: { selectedPallet, products }, dispatch } = useContext(palletpalContext)
	const filteredProduct = products.filter(product => product.pallet_id == selectedPallet)
	// This state is for the delete button next to each product (when user want to dispatch the whole product)
	const [productList, setProductList] = useState(filteredProduct)
	// To keep track the change of the form
	const initialChangeOfProduct = productList.map(product => ({ productId: product.product_id, numberOfBag: product.number_of_bags}))
	const [formData, setFormData] = useState({
		changeOfProduct: initialChangeOfProduct.flat()
	})

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

	const styleWrapper = {
		display: "flex",
		justifyContent: "space-between",
	}

	// Update the number of bags with user input
	const handleChange = (e) => {
		// product id of that product
		const productId = e.target.parentElement.parentElement.id
		setFormData(prevState => {
			return {
				...prevState,
				changeOfProduct : [...formData.changeOfProduct, { productId: parseInt(productId), numberOfBag: e.target.value }]
			}
		})
	}

	// Delete(dispatch) button next to each product
	const handleDelete = (e) => {
		const isConfirmed = confirm("You want to dispatch this whole product?")
		if (isConfirmed) {
			setProductList(prevState => prevState.filter(product => product.product_id != e.target.parentElement.id))
		}
	}

	// Close button
	const handleClose = () => {
		dispatch({
			type: 'setPalletOption',
			data: ''
		})
	}

	// Helper Method - Filter out duplicate by productId, only keep the latest change
	function uniqByKeepLast(data, key) {
		return [
			...new Map(
				data.map(x => [key(x), x])
			).values()
		]
	}

	// Dispatch button
	const handleSubmit = (e) => {
		e.preventDefault()
		// Filter out duplicate by productId, only keep the latest change
		const uniq = uniqByKeepLast(formData.changeOfProduct, it => it.productId)
		setFormData(prevState => ({
			...prevState, 
			changeOfProduct: uniq
		}))
		// Update product //

		// //
		alert("Products have been dispatched")
		// To close the dispatch box
		dispatch({
			type: 'setPalletOption',
			data: ""
		  })
	}


  return (
      <div style={style}>
			<div className='text-wrapper'>
				<h1 style={{ textAlign: "center"}}>Pallet #{selectedPallet}</h1>
				{productList.length > 0 ? 
				<form onSubmit={handleSubmit}>
				{productList.map(product => (
					<div id={product.product_id} key={product.id} style={styleWrapper} >
						<div>
							<p>{product.seed_type.toUpperCase()}</p>
						</div>
						<div>
							<p>Bag Size: {parseInt(product.bag_size)}</p>
						</div>
						<div style={{ display: "flex"}}>
							<input 
								type="text"
								size="5"
								name={product.id}
								placeholder={parseInt(product.number_of_bags)}
								onBlur={handleChange}
							/>
							<p style={{marginLeft: "5px"}}>BAG</p>
						</div>
						<button style={{ padding: "0 3px"}} onClick={handleDelete}>X</button>
					</div>
					))}
					<div className='button-wrapper'>
						<button style={styleButton} onClick={handleClose}>Cancel</button>
						<button type="submit" style={styleButton} onClick={handleSubmit}>Dispatch</button>
					</div>
				</form>
				: (
					<div style={{ textAlign: "center"}}>
						<h3>No product exist on this pallet, this pallet will be removed.</h3>
						<button style={styleButton} onClick={handleClose}>Confirm</button>
					</div>
				)}
				
			</div>

      </div>
  ) 
}

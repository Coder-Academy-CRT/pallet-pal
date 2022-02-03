import React, { useContext, useState } from 'react'
import palletpalContext from '../../../palletpalContext'

export default function DispatchBox() {
	const { state: { selectedPallet, products }, dispatch } = useContext(palletpalContext)

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

	const handleClose = () => {
		dispatch({
			type: 'setPalletOption',
			data: ''
		})
	}

	const handleDispatch = () => {
		console.log("Dispatch")
	}

	const filteredProduct = products.filter(product => product.pallet_id == selectedPallet)

  return (
      <div style={style}>
			<div className='text-wrapper'>
				<h1>Dispatch #{selectedPallet}</h1>
				<ul>
					{filteredProduct.map(product => (
						<li key={product.id}>{product.lot_code} | {product.seed_type} | {product.number_of_bags} bag | {product.bag_size}</li>
					))}
				</ul>
			</div>
			<div className='button-wrapper'>
				<button style={styleButton} onClick={handleClose}>Cancel</button>
				<button style={styleButton} onClick={handleDispatch}>Dispatch</button>
			</div>
      </div>
  ) 
}

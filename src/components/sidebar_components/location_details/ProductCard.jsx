function ProductCard({ seedType, bagSize, numOfBags, lotCode}) {
    return (
        <div className='productCard'>
            <p>Seed type: {seedType}</p>
            <p>Lot_code: {lotCode}</p>
            <p>Total: {numOfBags * bagSize}kg</p>
        </div>
    )
}

export default ProductCard

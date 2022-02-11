function ProductCard({ seedType, bagSize, numOfBags, lotCode }) {
    return (
        <div className='productCard'>
            <p>
                {`${lotCode}: ${seedType} ${numOfBags} bags ${
                    numOfBags * bagSize
                }kg`}
            </p>
        </div>
    )
}

export default ProductCard

function ProductCard({ seedType, bagSize, numOfBags, lotCode, seedVariety }) {
    const round = (num) => {
        return num % 1 == 0 ? Math.round(num) : num
    }
    return (
        <div className='productCard'>
            <section className='details'>
                <p>{`${lotCode}: ${seedType} - ${seedVariety} `}</p>
                <p>{`${round(numOfBags)} x ${round(bagSize)}kg bag${
                    numOfBags == 1 ? '' : 's'
                }`}</p>
            </section>
            <section className='total'>
                <h3>{`${numOfBags * bagSize}kg`}</h3>
            </section>
        </div>
    )
}

export default ProductCard

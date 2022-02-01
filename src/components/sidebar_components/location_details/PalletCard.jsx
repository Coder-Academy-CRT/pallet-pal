import ProductCard from "./ProductCard"

function PalletCard() {
    const num = Math.floor(Math.random() * 5) + 1
    const productCards = []
    for (let i = 0; i < num; i++) {
        productCards.push(<ProductCard />)
    }
    return <div className='palletCard'>{productCards}</div>
}

export default PalletCard

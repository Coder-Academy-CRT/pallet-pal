import ProductCard from "./ProductCard"

function PalletCard({ palletId }) {
    const num = Math.floor(Math.random() * 5) + 1
    const productCards = []
    for (let i = 0; i < num; i++) {
        productCards.push(<ProductCard />)
    }
    return (
        <div className='palletCard' 
            palletId={palletId}><span style={{color: "white", fontWeight: "bold"}}>Pallet #{palletId}</span>
            {productCards}
        </div>
    )

}

export default PalletCard

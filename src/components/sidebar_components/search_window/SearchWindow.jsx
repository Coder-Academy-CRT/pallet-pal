import { useState, useEffect, useContext } from 'react'
import palletpalContext from '../../../palletpalContext'
import CustomSelect from './CustomSelect'
import Summary from './Summary'

function SearchWindow() {
    const [seeds, setSeeds] = useState([])
    const [lots, setLots] = useState([])
    const [options, setOptions] = useState(null)
    const [summary, setSummary] = useState(null)
    const {
        dispatch,
        state: { products, microModes }
    } = useContext(palletpalContext)

    useEffect(() => {
        // declare temp lists for working
        let seedList = new Set([])
        let seedOptions = []
        let lotList = new Set([])
        let lotOptions = []

        // get every current lot and seed and push to temp lists
        products.forEach((element) => {
            seedList.add(
                `${element.seed_type} - ${element.seed_variety}`.toLowerCase()
            )
            lotList.add(`${element.lot_code}`)
        })

        // build options lists
        seedList.forEach((seed) => {
            seedOptions.push({ value: seed, label: seed })
        })
        lotList.forEach((lot) => {
            lotOptions.push({ value: lot, label: lot })
        })

        // set state from option lists
        setSeeds(seedOptions)
        setLots(lotOptions)
    }, [products])

    function search(event) {
        setSummary(null)
        const searchValue = event.target.value
        let bags = 0
        let totalWeight = 0
        const foundPalletIds = new Set([])
        let matchingProducts = products.filter(
            (product) =>
                product.lot_code == searchValue ||
                `${product.seed_type} - ${product.seed_variety}` == searchValue
        )

        matchingProducts.forEach((product) => {
            bags += Number(product.number_of_bags)
            totalWeight +=
                Number(product.number_of_bags, 2) * Number(product.bag_size, 2)
            foundPalletIds.add(product.pallet_id)
        })
        setSummary({
            kind: searchValue,
            bags: bags,
            totalWeight: totalWeight
        })
        dispatch({
            type: 'setFoundPallets',
            data: Array.from(foundPalletIds)
        })
    }

    function handleLotsClick() {
        setOptions(lots)
        setSummary(null)
        dispatch({
            type: 'setFoundPallets',
            data: []
        })
    }

    // only render while active
    if (microModes.SearchWindow) {
        return (
            <div id='searchWindow'>
                <h2>Search</h2>
                <section id='searchContainer'>
                    <section id='searchModes'>
                        <button
                            className={options == lots ? 'active' : ''}
                            onClick={() => handleLotsClick()}>
                            LOTS
                        </button>
                        <button
                            className={options == seeds ? 'active' : ''}
                            onClick={() => {
                                setOptions(seeds)
                                setSummary(null)
                            }}>
                            SEEDS
                        </button>
                    </section>
                    <CustomSelect
                        options={options}
                        name='searchDropdown'
                        watching={options}
                        change={(e) => search(e)}
                    />
                    <Summary summary={summary} />
                </section>
            </div>
        )
    } else {
        return <></>
    }
}

export default SearchWindow

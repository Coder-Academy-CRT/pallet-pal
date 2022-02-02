import { useState, useEffect } from "react"
import CustomSelect from "./CustomSelect"
import Summary from "./Summary"

function SearchWindow() {
    const [active, setActive] = useState(true)
    const [searchMode, setSearchMode] = useState(null)
    const [seeds, setSeeds] = useState([])
    const [lots, setLots] = useState([])
    const [options, setOptions] = useState(null)
    const [products, setProducts] = useState([])
    const [summary, setSummary] = useState(null)
    const [searchValue, setSearchValue] = useState(null)
    const [foundPallets, setFoundPallets] = useState([])

    useEffect(async () => {
        // query products api
        const res = await fetch(
            "https://glacial-bayou-38289.herokuapp.com/warehouse/1/populate"
        )
        const data = await res.json()
        // set product list
        setProducts(data)

        // declare temp lists for working
        let seedList = []
        let seedOptions = []
        let lotList = []
        let lotOptions = []

        // get every current lot and seed (including duplicates) and push to temp lists
        data.forEach((element) => {
            seedList.push(
                `${element.seed_type} - ${element.seed_variety}`.toLowerCase()
            )
            lotList.push(`${element.lot_code}`)
        })

        // remove duplicates and sort
        seedList = new Set(seedList.sort())
        lotList = new Set(lotList.sort())

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
    }, [])

    function setOff() {
        setActive(false)
    }

    function setOn() {
        setActive(true)
    }

    function setDropDown(event) {
        // console.log(event)
        switch (event.target.value) {
            case "lots":
                setOptions(lots)
                console.log("set to lots")
                break
            case "seeds":
                setOptions(seeds)
                console.log("set to seeds")
                break
            default:
                break
        }
    }

    function search() {
        setFoundPallets([])
        let bags = 0
        let totalWeight = 0
        let matchingProducts = []
        switch (searchMode) {
            // if searching by LOT_CODE
            case "lots":
                // get all product objects with lot code
                matchingProducts = products.filter(
                    (product) => product.lot_code == searchValue
                )
                break
            // if searching by SEED_TYPE + VARITEY
            case "seeds":
                matchingProducts = products.filter(
                    (product) =>
                        `${product.seed_type} - ${product.seed_variety}` ==
                        searchValue
                )
                break
            default:
                break
        }
        matchingProducts.forEach((product) => {
            bags += product.number_of_bags
            totalWeight += product.number_of_bags * product.bag_size
        })
        setSummary({
            kind: searchValue,
            bags: bags,
            totalWeight: totalWeight
        })
    }

    // only render while active
    if (active) {
        return (
            <div id='searchWindow'>
                <button onClick={setOff}>close Search</button>
                <h3>Search</h3>
                <section id='searchModes'>
                    <button
                        className='searchOption'
                        onClick={() => {
                            setOptions(lots)
                            setSearchMode("lots")
                        }}>
                        LOTS
                    </button>
                    <button
                        className='searchOption'
                        onClick={() => {
                            setOptions(seeds)
                            setSearchMode("seeds")
                        }}>
                        SEEDS
                    </button>
                </section>
                <CustomSelect
                    options={options}
                    name='searchDropdown'
                    watching={options}
                    change={(e) => setSearchValue(e.target.value)}
                />
                <button onClick={(e) => search(e)}>search</button>
                <Summary summary={summary} watching={searchValue} />
            </div>
        )
    } else {
        return (
            <div id='searchWindow'>
                <button onClick={setOn}>open Search</button>
            </div>
        )
    }
}

export default SearchWindow

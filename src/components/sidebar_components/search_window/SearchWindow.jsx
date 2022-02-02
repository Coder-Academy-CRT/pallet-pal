import { useState, useEffect } from "react"
import Select from "react-select"

function SearchWindow() {
    const [active, setActive] = useState(true)
    const [searchValue, setSearchValue] = useState(null)
    const [seeds, setSeeds] = useState([])
    const [lots, setLots] = useState([])
    const [options, setOptions] = useState(null)

    useEffect(async () => {
        // query products api
        const res = await fetch(
            "https://glacial-bayou-38289.herokuapp.com/warehouse/1/populate"
        )
        const data = await res.json()

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
        console.log(event)
        setOptions(event.value)
    }

    // only render while active
    if (active) {
        return (
            <div id='searchWindow'>
                <button onClick={setOff}>close Search</button>
                SEARCH
                <Select
                    id='searchByDropdown'
                    name='searchBy'
                    defaultValue={null}
                    placeholder='Search by?'
                    options={[
                        { value: lots, label: "lot" },
                        { value: seeds, label: "seed type" }
                    ]}
                    onChange={setDropDown}
                />
                <Select
                    className='thing'
                    id='searchDropdown'
                    name='searchDropdown'
                    defaultValue={null}
                    options={options}
                    onChange={(e) => {
                        setSearchValue(e.value)
                    }}
                />
                <p>searching for {searchValue}</p>
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

import React, {useState, useContext} from 'react';
import palletpalContext from "../../../palletpalContext"

export default function AddLot( {setOpenAddLot}) {

    const { state: { warehouse, seeds, lots }, dispatch } = useContext(palletpalContext)
    const [newLot, setNewLot] = useState( { lot_code : "", seed_type: "none declared", seed_variety: ''} )
    const [alertMessage, setAlertMessage] = useState("alertMessage")


    /// SEED

    let seedTypes = new Set([])
    let seedVarieties = []

    seeds.forEach( (seed) => {
        seedTypes.add( seed.type)
        seedVarieties.push( {type: seed.type, value: seed.variety, label: seed.variety } )
    })
    
    let uniqueSeedTypes = Array.from(seedTypes).map( (seed) => {
        return { value: seed, label: seed }
    })

    let filteredSeedVarieties = seedVarieties.map( (variety, index) => {
        if (variety.type == newLot.seed_type) {
            return (
                <option value={variety.value} key={index}>
                {variety.label}
                </option> 
            )
        }
    })

  /// make sure none of the existing lot

    console.log(newLot)

    // duplicate code in the seed type and seed variety select menus
    let conditional_grey = newLot.seed_type == "none declared" ? {color:"grey"} : {}
    const select_seed_value = (state) => {
        return newLot.seed_type == "none declared" ? "to be selected" : state
    }

    return (
      
        <div className='addLotCard'>

            <div>

                <form>
                    <div id="lotForm">
                        <label htmlFor="lotCode">Please enter new lot code :</label>
                        <input
                            className="lotInputs"
                            id="lotCode"
                            value={ newLot.lot_code }
                            placeholder={"Add a new lot code"}
                            style={newLot.lot_code == "" ? {color:"grey"} : {} }
                            onChange={(event) => 
                                setNewLot( {...newLot, lot_code : event.target.value})}
                        ></input> 

                        <label htmlFor="lotSeedType">Please select seed type:</label>
                        <select
                            className="lotInputs lotSelect"
                            id="lotSeedType"
                            value={ select_seed_value(newLot.seed_type) }
                            style={ conditional_grey }
                            onChange={(event) => setNewLot( { ... newLot, seed_type: event.target.value, seed_variety: "variety not stated" })}
                        >
                            <option value="to be selected" disabled>
                                Select a seed type
                            </option>

                            { uniqueSeedTypes.map( (seed, index) => (
                                <option value={seed.value} key={index}>
                                    {seed.label}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="lotSeedVariety">Please select seed variety :</label>

                        <select
                            className="lotInputs lotSelect"
                            id="lotVarietyType"
                            value={ select_seed_value(newLot.seed_variety) }
                            onChange={(event) => setNewLot( { ... newLot, seed_variety: event.target.value })}
                            style={ conditional_grey }
                        >
                        <option value="to be selected" disabled>
                            { newLot.seed_type == "none declared" ? "Select a seed type first" : "Select variety"}
                         </option>
                            {filteredSeedVarieties}
                        </select>
                        
                    </div>
                    {/* <button>Submit</button> */}
                </form>
            </div>

            <div id='footerNewLot'>
                <button onClick={null} id="addLotButton">save</button>
                <br></br><p>{alertMessage}</p>
            </div>
        
        </div>
    )
}



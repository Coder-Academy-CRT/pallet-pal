import React, {useState, useContext} from 'react';
import palletpalContext from "../../../palletpalContext"



export default function AddLot( {setOpenAddLot}) {

    const { state: { warehouse, seeds, lots }, dispatch } = useContext(palletpalContext)
    const [updatedLot, setUpdatedLot] = useState( { lot_code : "", seed_type: "none declared", seed_variety: ''} )


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
        if (variety.type == updatedLot.seed_type) {
            return (
                <option value={variety.value} key={index}>
                {variety.label}
                </option> 
            )
        }
    })

  /// make sure none of the existing lot

    const submit = () => {
      console.log("Submit")
    }

    console.log(updatedLot)

    let conditional_grey = updatedLot.seed_type == "none declared" ? {color:"grey"} : {}

    const select_seed_value = (state) => {
        return updatedLot.seed_type == "none declared" ? "to be selected" : state
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
                            value={ updatedLot.lot_code }
                            placeholder={"Add a new lot code"}
                            style={updatedLot.lot_code == "" ? {color:"grey"} : {} }
                            onChange={(event) => 
                                setUpdatedLot( {...updatedLot, lot_code : event.target.value})}
                        ></input> 

                        <label htmlFor="lotSeedType">Please select seed type:</label>
                        <select
                            className="lotInputs lotSelect"
                            id="lotSeedType"
                            value={ select_seed_value(updatedLot.seed_type) }
                            style={ conditional_grey }
                            onChange={(event) => setUpdatedLot( { ... updatedLot, seed_type: event.target.value, seed_variety: "variety not stated" })}

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
                            value={ select_seed_value(updatedLot.seed_variety) }
                            onChange={(event) => setUpdatedLot( { ... updatedLot, seed_variety: event.target.value })}
                            style={ conditional_grey }
                        >
                        <option value="to be selected" disabled>
                            { updatedLot.seed_type == "none declared" ? "Select a seed type first" : "Select variety"}
                         </option>
                            {filteredSeedVarieties}
                        </select>
                        
                    </div>
                    {/* <button>Submit</button> */}
                </form>
            </div>

            <div id='buttonContainerAddLot'>
                <button onClick={null} id="addLotButton">save</button>
                {/* <button onClick={setOpenAddLot(false)} id="exitAddLotButton">exit</button> */}
            </div>
        
        </div>
    )
}



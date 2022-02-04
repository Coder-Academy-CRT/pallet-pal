export default function reducer (state, action) {

    switch (action.type) {

        case 'setLocationData':

            let final_list = []
            let index = 0

            for (let y = 0; y < 4; y++) {
                let current_list = []

                for (let x = 0; x < 4; x++) {
                    current_list.push(action.data[index])
                    index++
                }

                final_list.push(current_list)      
            }

            return { 
                ...state,
                locations : final_list
            }

        case 'setLotsInWarehouse' :
            return {
                ...state,
                lots : action.data
            }

        case 'setProductData' :
            return {
                ...state,
                products: action.data
            }

        case 'setSeeds' :
            return {
                ...state,
                seeds: action.data
            }

        case 'setClickedLocation' :
            let foundLocation = {}
            state.locations.flat(1).forEach(location => {
                if (location.coordinates == action.data) {
                    foundLocation = location
                }
            })

            return {
            ... state,
            clickedLocation : foundLocation
            }

        case 'setSelectedMoveLocation' :
            return {
            ... state,
            selectedMoveLocation : action.data
            }
            
        case 'setPalletOption' :
            return {
                ...state, 
                palletOption : action.data
            }

        case 'setSelectedPallet' :
            return {
                ...state, 
                selectedPallet : action.data
            }

        case 'setFoundPallets' :
            return {
                ...state, 
                foundPallets : action.data
            }

        case 'setMetaMode' :
            return {
                ...state, 
                metaMode : action.data
            }

        case 'addMicroMode' :
            return state.microModes.includes(action.data) ? 
            state
            : 
            { ... state, microModes : [action.data, ...state.microModes] }

            
        case 'removeMicroMode' :
            index = state.microModes.indexOf(action.data)
            if (index > -1) {
                state.microModes.splice(index, 1)
            }
            return state


        default:
        // return state // this is an optional default, however this alternative provides more feedback
        throw new Error(`action.type: ${action.type} is not recognised. Switch statement defaulted to throw Error`)
    }
}



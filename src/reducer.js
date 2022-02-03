export default function reducer (state, action) {

    switch (action.type) {

        case 'setLocationData':
            return { 
                ...state,
                locations : action.data
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
            return {
            ... state,
            clickedLocation : action.data
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



export default function reducer(state, action) {
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
                locations: final_list
            }

        case 'setLotsInWarehouse':
            return {
                ...state,
                lots: action.data
            }


        case 'addNewLot' :
            return {
                ...state,
                lots : [ ...state.lots, action.data ] // payload is another lot object
            }

        case 'deleteLot' :
            state.lots.splice(
                state.lots.findIndex( (lot) =>
                lot.lot_code == action.data
            ), 1)
            return { ...state }

        case 'updateLot' :
            state.lots[
                state.lots.findIndex( (lot) =>
                lot.lot_code == action.original_lot_code )
                ] = {
                        lot_code : action.new_lot_code,
                        seed_type : action.new_seed_type,
                        seed_variety : action.new_seed_variety
                    }
            return { ...state }
            
        case 'setProductData' :
            return {
                ...state,
                products: action.data
            }

        case 'setSeeds':
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

        case 'setSelectedMoveLocation':
            return {
                ...state,
                selectedMoveLocation: action.data
            }

        case 'setPalletOption':
            return {
                ...state,
                palletOption: action.data
            }


        case 'updateLocationAfterMove' :
            const loc = state.locations
            for (let i = 0; i < loc.length; i++) {
                if (loc[i].coordinates == action.data) {
                    loc[i].pallets_on_locations.push(action.data)
                    break
                }
            }

            return {
                ...state,
                locations : loc
            }
            
        case 'setPalletOption' :
            return {
                ...state, 
                palletOption : action.data
            }

        case 'setSelectedPallet' :
            const palletInfo = state.products.filter(product => product.pallet_id == action.data)
            return {
                ...state, 
                selectedPallet : { pallet_id: action.data, products_on_pallet: palletInfo}
            }

        case 'updatePalletDataAfterDispatch' :
            return {
                ...state,
                selectedPallet : { ...state.selectedPallet,  products_on_pallet: action.data }
            }

        // Specific for dispatch button in the dispatch box
        case 'updateProducts' :
            // Merge two array together and only keep the one from seletedPallet if there is duplicate
            const array1 = state.selectedPallet.products_on_pallet
            const array2 = state.products
            for (var i = 0; i < array2.length; i++) {
                for (var k = 0; k < array1.length; k++) {
                if (array2[i].product_id == array1[k].product_id) {
                    array2[i].number_of_bags = array1[k].number_of_bags;
                    break;
                }}
            }
            // filtered out products that has no bags left
            // only product that still has bag of product will be updated to state.products
            const filteredList = array2.filter(product => product.number_of_bags != 0)

            return {
                ...state, 
                products : filteredList, 
                // this trigger re-rendering of that pallet card so it will show the updated details on the sidebar
                clickedLocation: { ...state.clickedLocation, coordinates: state.clickedLocation.coordinates}
              
        case 'setFoundPallets':
            return {
                ...state,
                foundPallets: action.data
            }

        case 'setWarehouse':
            console.log(action.data)
            return {
                ...state,
                warehouse: action.data
            }

        case 'setAvailableLocations' :
            return {
                ...state, 
                availableLocations : action.data
            }

        case 'setMetaMode':
            return {
                ...state,
                metaMode: action.data
            }

        case 'addMicroMode':
            return state.microModes.includes(action.data)
                ? state
                : { ...state, microModes: [action.data, ...state.microModes] }

        case 'removeMicroMode':
            index = state.microModes.indexOf(action.data)
            if (index > -1) {
                state.microModes.splice(index, 1)
            }
            return state

        default:
            // return state // this is an optional default, however this alternative provides more feedback
            throw new Error(
                `action.type: ${action.type} is not recognised. Switch statement defaulted to throw Error`
            )
    }
}

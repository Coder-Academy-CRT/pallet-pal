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

        case 'addNewLot':
            return {
                ...state,
                lots: [...state.lots, action.data] // payload is another lot object
            }

        case 'deleteLot':
            state.lots.splice(
                state.lots.findIndex((lot) => lot.lot_code == action.data),
                1
            )
            return { ...state }

        case 'updateLot':
            state.lots[
                state.lots.findIndex(
                    (lot) => lot.lot_code == action.original_lot_code
                )
            ] = {
                lot_code: action.new_lot_code,
                seed_type: action.new_seed_type,
                seed_variety: action.new_seed_variety
            }
            return { ...state }

        case 'setProductData':
            return {
                ...state,
                products: action.data
            }

        case 'setSeeds':
            return {
                ...state,
                seeds: action.data
            }

        // ****NOTE**** returning and empty object {} is still truthy and thus you can not do ternary on it. Must return null if no location clicked.
        case 'setClickedLocation':
            let foundLocation = null // << changed this to null.
            state.locations.flat(1).forEach((location) => {
                if (location.coordinates == action.data) {
                    foundLocation = location
                }
            })

            return {
                ...state,
                clickedLocation: foundLocation
            }

        case 'setSelectedMoveLocation':
            return {
                ...state,
                selectedMoveLocation: action.data
            }

        case 'updateProductsAfterMoved':
            state.products.forEach((product) => {
                if (product.pallet_id == state.selectedPallet.pallet_id) {
                    product.coordinates = action.data
                }
            })
            return { ...state }

        case 'updateLocationsAfterMoved':
            // Remove pallet_id from corresponding location
            state.locations.forEach((row) => {
                row.forEach((location) => {
                    if (location.pallets_on_location.includes(action.data)) {
                        const i = location.pallets_on_location.indexOf(
                            action.data
                        )
                        location.pallets_on_location.splice(i, 1)
                    }
                })
            })
            // Add pallet_id back to corresponding location
            state.locations.forEach((row) => {
                row.forEach((location) => {
                    if (location.coordinates == state.selectedMoveLocation) {
                        if (location.pallets_on_location[0] == null) {
                            location.pallets_on_location.splice(
                                0,
                                1,
                                action.data
                            )
                        } else {
                            location.pallets_on_location.push(action.data)
                        }
                    }
                })
            })
            return { ...state }

        case 'setMovingPalletId':
            return {
                ...state,
                movingPalletId: action.data
            }

        case 'setSelectedPallet':
            const palletInfo = state.products.filter(
                (product) => product.pallet_id == action.data
            )
            return {
                ...state,
                selectedPallet: {
                    pallet_id: action.data,
                    products_on_pallet: palletInfo
                }
            }

        case 'updatePalletDataAfterDispatch':
            return {
                ...state,
                selectedPallet: {
                    ...state.selectedPallet,
                    products_on_pallet: action.data
                }
            }

        // Specific for dispatch button in the dispatch box
        case 'updateProducts':
            // Merge two array together and only keep the one from seletedPallet if there is duplicate
            const array1 = state.selectedPallet.products_on_pallet
            const array2 = state.products
            for (var i = 0; i < array2.length; i++) {
                for (var k = 0; k < array1.length; k++) {
                    if (array2[i].product_id == array1[k].product_id) {
                        array2[i].number_of_bags = array1[k].number_of_bags
                        break
                    }
                }
            }
            // filtered out products that has no bags left
            // only product that still has bag of product will be updated to state.products
            const filteredList = array2.filter(
                (product) => product.number_of_bags != 0
            )

            return {
                ...state,
                products: filteredList,
                // this trigger re-rendering of that pallet card so it will show the updated details on the sidebar
                clickedLocation: {
                    ...state.clickedLocation,
                    coordinates: state.clickedLocation.coordinates
                }
            }

        case 'movePallet':
            // helper function
            const parseCoords = (string) => {
                return string.split('_')
            }
            const data = {
                palletId: '1',
                moveFromLocation: '00_01',
                moveToLocation: '00_03'
            }
            // UPDATE LOCATIONS
            // get coords for location indexing
            const [fx, fy] = parseCoords(action.data.moveFromLocation)
            const [tx, ty] = parseCoords(action.data.moveToLocation)
            // get location object from coords
            const fromLocation = state.locations[fx][fy]
            const toLocation = state.locations[tx][ty]
            // remove pallet from fromLocation
            const palletIdIndex =
                fromLocation.pallets_on_location.indexOf(palletId)
            fromLocation.pallets_on_location.splice(palletIdIndex, 1)
            // push palletId to toLocation
            toLocation.pallets_on_location.push(palletId)

            //UPDATE PRODUCTS LOCATIONS
            // for every product if pallet id matches moved pallet update coordinates
            state.products.forEach((product) =>
                product.pallet_id == action.data.palletId
                    ? (product.coordinates = action.data.moveToLocation)
                    : null
            )

            return { ...state }

        case 'removePalletFromLocation':
            // Remove pallet_id from corresponding location
            state.locations.forEach((row) => {
                row.forEach((location) => {
                    if (location.pallets_on_location.includes(action.data)) {
                        const i = location.pallets_on_location.indexOf(
                            action.data
                        )
                        location.pallets_on_location.splice(i, 1)
                    }
                })
            })
            return { ...state }

        case 'setFoundPallets':
            return {
                ...state,
                foundPallets: action.data
            }

        case 'setLocations':
            return {
                ...state,
                locations: action.data
            }

        case 'setMoveFromLocation':
            return {
                ...state,
                moveFromLocation: action.data
            }
        // NEW
        case 'setWarehouse':
            return {
                ...state,
                warehouse: action.data
            }
        // NEW
        case 'addWarehouse':
            return {
                ...state,
                warehouseList: [...state.warehouseList, action.data]
            }
        // NEW
        case 'setTempWarehouse':
            return {
                ...state,
                tempWarehouse: action.data
            }

        case 'setAvailableLocations':
            return {
                ...state,
                availableLocations: action.data
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
            const indexOfMicroMode = state.microModes.indexOf(action.data)
            if (indexOfMicroMode > -1) {
                state.microModes.splice(indexOfMicroMode, 1)
            }
            return { ...state }

        // NEW
        case 'setMicroMode':
            // receive an object of {mode: "a_string", bool: true/false} and sets new key value
            const newModes = { ...state.microModes }
            newModes[action.data.mode] = action.data.bool
            return {
                ...state,
                microModes: newModes
            }
        // NEW
        case 'toggleMicroMode':
            const newObject = { ...state.microModes }
            newObject[action.data] = !state.microModes[action.data]
            return {
                ...state,
                microModes: newObject
            }

        default:
            // return state // this is an optional default, however this alternative provides more feedback
            throw new Error(
                `action.type: ${action.type} is not recognised. Switch statement defaulted to throw Error`
            )
    }
}

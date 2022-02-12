export default function reducer(state, action) {
    switch (action.type) {
        // edited this for dynamic rows and columns note it requires MORE than just locations
        case 'setLocationData':
            let final_list = []

            // push a list for every row where the y coord matches the loop counter
            for (let y = 0; y < action.data.rows; y++) {
                final_list.push(
                    action.data.allLocations.filter(
                        (loc) => Number(loc.coordinates.split('_')[1]) == y
                    )
                )
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
                    if (location.pallets_on_location.includes(action.data.palletId)) {
                        const i = location.pallets_on_location.indexOf(
                            action.data.palletId
                        )
                        location.pallets_on_location.splice(i, 1)
                    }
                })
            })
            // Add pallet_id back to corresponding location
            state.locations.forEach((row) => {
                console.log(row)
                row.forEach((location) => {
                    console.log(location)    
                    console.log(state.selectedMoveLocation)                
                    if (location.coordinates == action.data.coord) {
                        if (location.pallets_on_location[0] == null) {
                            location.pallets_on_location.splice(
                                0,
                                1,
                                action.data.palletId
                            )
                        } else {
                            location.pallets_on_location.push(action.data.palletId)
                        }
                    }
                })
            })
            return { ...state }

        case 'initiateMove':
            return {
                ...state
            }
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

        case 'editProductsAfterEdit' :
            const copyOfProducts = [...state.products]
            copyOfProducts.forEach((product, index) => {
                if (product.product_id == action.payload.product_id) {
                    copyOfProducts[index] = action.payload.product
                    copyOfProducts[index].seed_type = action.payload.seed_type
                    copyOfProducts[index].seed_variety = action.payload.seed_variety
                }
            })
            // filtered out products that has no bags left
            // only product that still has bag of product will be updated to state.products
            const filteredProducts = copyOfProducts.filter(
                (product) => product.number_of_bags != 0
            )
            return {
                ...state, 
                products: filteredProducts
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
                products: filteredList
            }

        case 'addNewProductToProducts':
            return {
                ...state,
                products: [...state.products, action.data]
            }

        case 'addNewPalletToLocations':
            const updatedLocations = [...state.locations]
            // helper function
            const parseCoord = (string) => {
                let [x, y] = string.split('_')
                x = Number(x)
                y = Number(y)
                return [x, y]
            }

            const [x, y] = parseCoord(state.clickedLocation.coordinates)

            updatedLocations[y][x].pallets_on_location[0]
                ? updatedLocations[y][x].pallets_on_location.push(action.data)
                : (updatedLocations[y][x].pallets_on_location = [action.data])

            return {
                ...state,
                locations: updatedLocations
            }

        // case 'movePallet':
        //     // payload = {
        //     //     palletId: '1',
        //     //     moveFromLocation: '00_01',
        //     //     moveToLocation: '00_03'
        //     // }
        //     const newLocations = [...state.locations]
        //     // helper function
        //     const parseCoords = (string) => {
        //         return string.split('_')
        //     }
        //     // UPDATE LOCATIONS
        //     // get coords for location indexing
        //     const [fx, fy] = parseCoords(action.data.moveFromLocation)
        //     const [tx, ty] = parseCoords(action.data.moveToLocation)
        //     // get location object from coords
        //     const fromLocation = newLocations[Number(fy)][Number(fx)]
        //     const toLocation = newLocations[Number(ty)][Number(tx)]
        //     console.log(toLocation.pallets_on_location)
        //     // remove pallet from fromLocation - get index - splice out
        //     const palletIdIndex = fromLocation.pallets_on_location.indexOf(
        //         action.data.palletId
        //     )
        //     fromLocation.pallets_on_location.splice(palletIdIndex, 1)
        //     // push palletId to new location - the toLocation
        //     toLocation.pallets_on_location[0]
        //         ? toLocation.pallets_on_location.push(action.data.palletId)
        //         : (toLocation.pallets_on_location = [action.data.palletId])

        //     const newProducts = [...state.products]
        //     //UPDATE PRODUCTS LOCATIONS
        //     // for every product if pallet id matches moved pallet - update coordinates
        //     newProducts.forEach((product) =>
        //         product.pallet_id == action.data.palletId
        //             ? (product.coordinates = action.data.moveToLocation)
        //             : null
        //     )

            return { ...state, locations: newLocations, products: newProducts }

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

        case 'updateClickedLocation' :
            state.clickedLocation.pallets_on_location.forEach((pallet, index) => {
                if(pallet == action.data) {
                    state.clickedLocation.pallets_on_location.splice(index, 1)
                }
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
        case 'setMoveToLocation':
            return {
                ...state,
                moveToLocation: action.data
            }
        // NEW
        case 'setWarehouse':
            return {
                ...state,
                warehouse: action.data
            }

        case 'setWarehouseList':
            return {
                ...state,
                warehouseList: action.data
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

        case 'resetStates':
            return {
                ...state,
                warehouse: null,
                tempWarehouse: null,
                products: [],
                locations: [],
                lots: [],
                clickedLocation: null,
                moveFromLocation: null,
                moveToLocation: null,
                movingPalletId: null,
                selectedPallet: {},
                foundPallets: [],
                microModes: {
                    SearchWindow: false,
                    LotManager: false,
                    LocationDetails: false,
                    Move: false,
                    Dispatch: false,
                    AddPallet: false
                }
            }

        default:
            // return state // this is an optional default, however this alternative provides more feedback
            throw new Error(
                `action.type: ${action.type} is not recognised. Switch statement defaulted to throw Error`
            )
    }
}

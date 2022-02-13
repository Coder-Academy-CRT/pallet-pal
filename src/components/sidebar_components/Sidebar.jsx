import { useContext, useState } from 'react'
import React from 'react'

import LocationDetails from './location_details/LocationDetails'
import SearchWindow from './search_window/SearchWindow'
import LotManager from './lot_manager/LotManager'
import palletpalContext from '../../palletpalContext'
import BuildSidebar from './BuildSidebar'
import SidebarNav from './SidebarNav'
import MoveOption from './location_details/MoveOption'

function Sidebar() {
    const {
        state: { metaMode, locations, microModes, warehouse, lots, products }
    } = useContext(palletpalContext)

    function checkLots() {
        // if there are lots say how to manage them
        if (lots.length < 1) {
            return (
                <p>
                    It looks like you have no lots set up yet, add a lot by
                    clicking the "lots" tab below.
                </p>
            )
        }
    }

    function checkPallets() {
        // if there ARE lots but no products
        if (products.length < 1 && lots.length > 0) {
            return (
                <p>
                    Create some pallets by selecting a location and clicking the
                    "add pallet" icon.
                </p>
            )
        } else {
            return (
                <p>
                    Search for products in your warehouse by clicking the
                    "search" tab.
                </p>
            )
        }
    }

    // ****NOTE**** the condition for locations length is to prevent location details trying to set up before locations are ready.
    if (metaMode == 'main' && locations.length > 1) {
        return (
            <div id='sidebar'>
                <h1 id='warehouseName'>{warehouse.name}</h1>
                {!microModes.SearchWindow &&
                !microModes.LocationDetails &&
                !microModes.LotManager ? (
                    <p id='welcome'>
                        {checkLots()}
                        {checkPallets()}
                    </p>
                ) : (
                    [<SearchWindow />, <LocationDetails />, <LotManager />]
                )}

                <SidebarNav />
            </div>
        )
    } else if (metaMode == 'build') {
        return (
            <div id='sidebar'>
                <BuildSidebar />
            </div>
        )
    } else {
        return <div id='sidebar'></div>
    }
}

export default Sidebar

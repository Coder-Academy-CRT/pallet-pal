import { useContext, useState } from 'react'
import React from 'react'

import LocationDetails from './location_details/LocationDetails'
import SearchWindow from './search_window/SearchWindow'
import LotManager from './lot_manager/LotManager'
import palletpalContext from '../../palletpalContext'
import BuildSidebar from './BuildSidebar'
import SidebarNav from './SidebarNav'
import MoveOption from './location_details/MoveOption'
import EditPallet from './location_details/EditPallet'

function Sidebar() {
    const {
        state: { metaMode, locations, microModes, warehouse }
    } = useContext(palletpalContext)

    // ****NOTE**** the condition for locations length is to prevent location details trying to set up before locations are ready.
    if (metaMode == 'main' && locations.length > 1) {
        return (
            <div id='sidebar'>
                <h1 id='warehouseName'>{warehouse.name}</h1>
                <SearchWindow />
                <LocationDetails />
                <LotManager />
                {microModes.Edit ? <EditPallet /> : null}
                {microModes.Move ? <MoveOption /> : null}
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

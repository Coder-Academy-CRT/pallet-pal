import { useContext, useState } from 'react'
import React from 'react'

import LocationDetails from './location_details/LocationDetails'
import SearchWindow from './search_window/SearchWindow'
import LotManager from './lot_manager/LotManager'
import palletpalContext from '../../palletpalContext'
import BuildSidebar from './BuildSidebar'
import SidebarNav from './SidebarNav'
import MoveOption from './location_details/MoveOption'
import AddPallet from './location_details/AddPallet'
import EditPallet from './location_details/EditPallet'

function Sidebar() {
    const {
        state: { metaMode, locations, microModes }
    } = useContext(palletpalContext)

    // ****NOTE**** the condition for locations length is to prevent location details trying to set up before locations are ready.
    if (metaMode == 'main' && locations.length > 1) {
        return (
            <div id='sidebar'>
                <SearchWindow />
                <LocationDetails />
                <LotManager />
                {microModes.AddPallet ? <AddPallet /> : null}
                {microModes.Edit ? <EditPallet /> : null}
                <SidebarNav />
                {microModes.Move ? <MoveOption /> : null}
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

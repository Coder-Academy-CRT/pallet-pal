import { useContext, useState } from 'react'
import SidebarNav from './SidebarNav'
import LocationDetails from './location_details/LocationDetails'
import SearchWindow from './search_window/SearchWindow'
import LotManager from './lot_manager/LotManager'
import palletpalContext from '../../palletpalContext'
import DispatchBox from './location_details/DispatchBox'
import BuildSidebar from './BuildSidebar'
import MoveOption from './location_details/MoveOption'

function Sidebar() {
    const {
        state: { palletOption, metaMode, locations }
    } = useContext(palletpalContext)

    // ****NOTE**** the condition for locations length is to prevent location details trying to set up before locations are ready.
    if (metaMode == 'main' && locations.length > 1) {
        return (
            <div id='sidebar'>
                {/* <SidebarNav /> */}
                <LotManager />
                <SearchWindow />
                <LocationDetails />
                {palletOption == 'move' ? <MoveOption /> : null}
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

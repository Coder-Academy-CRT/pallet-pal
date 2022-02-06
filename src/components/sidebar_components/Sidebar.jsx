import { useContext, useState } from 'react'
import SidebarNav from './SidebarNav'
import LocationDetails from './location_details/LocationDetails'
import SearchWindow from './search_window/SearchWindow'
import LotManager from './lot_manager/LotManager'
import palletpalContext from '../../palletpalContext'
import MoveOption from './location_details/MoveOption';

function Sidebar() {
    const {
        state: { palletOption }
    } = useContext(palletpalContext)


    return (
        <div id='sidebar'>
            <SidebarNav />
            <LotManager />
            <SearchWindow />
            <LocationDetails />
            {palletOption == "move" ? <MoveOption /> : null}
        </div>
    )
}

export default Sidebar

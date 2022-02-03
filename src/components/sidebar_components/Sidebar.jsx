import SidebarNav from "./SidebarNav"
import LocationDetails from "./location_details/LocationDetails"
import SearchWindow from "./search_window/SearchWindow"
import LotManager from "./lot_manager/LotManager"

function Sidebar() {

    return (
        <div id='sidebar'>
            <SidebarNav />
            <LotManager />
            <SearchWindow />
            <LocationDetails />
        </div>
    )
}

export default Sidebar

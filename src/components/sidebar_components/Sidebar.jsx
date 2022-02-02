import SidebarNav from "./SidebarNav"
import LocationDetails from "./location_details/LocationDetails"
import SearchWindow from "./search_window/SearchWindow"
import LotManager from "./lot_manager/LotManager"

function Sidebar({ locationsInfo, clickedLocation }) {
    return (
        <div id='sidebar'>
            <SidebarNav />
            <LotManager />
            <SearchWindow />
            <LocationDetails locationsInfo={locationsInfo} clickedLocation={clickedLocation}/>
        </div>
    )
}

export default Sidebar

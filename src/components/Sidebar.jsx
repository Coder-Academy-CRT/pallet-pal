import SidebarNav from "./SidebarNav"
import LocationDetails from "./LocationDetails"
import SearchWindow from "./SearchWindow"
import LotManager from "./LotManager"

function Sidebar() {
    return (
        <div id='sidebar'>
            <SidebarNav />
            <LotManager />
            <SearchWindow />
            <LocationDetails numberOfPallets={3} />
        </div>
    )
}

export default Sidebar

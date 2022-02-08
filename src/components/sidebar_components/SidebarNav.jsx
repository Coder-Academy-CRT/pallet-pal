import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import palletpalContext from '../../palletpalContext'

function SidebarNav() {
    const {
        state: { microModes },
        dispatch
    } = useContext(palletpalContext)

    function logout() {
        dispatch({
            type: 'setMetaMode',
            data: 'landing'
        })
    }

    function toggleMode(microModeString) {
        dispatch({
            type: 'toggleMicroMode',
            data: microModeString
        })
    }

    // if micromode active return active for add
    function getClassNames(micromodeString) {
        return microModes[micromodeString] ? 'navButton active' : 'navButton'
    }

    function handleLocationDetails() {
        toggleMode('LocationDetails')
        dispatch({
            type: 'setClickedLocation',
            data: null
        })
    }

    function handleSearchWindow() {
        toggleMode('SearchWindow')
        dispatch({
            type: 'setFoundPallets',
            data: []
        })
    }

    return (
        <div id='sidebarNav'>
            <div
                className={getClassNames('SearchWindow')}
                onClick={handleSearchWindow}>
                search
            </div>
            {/* handling the close of location details specially to clear clicked location */}
            <div
                className={getClassNames('LocationDetails')}
                onClick={handleLocationDetails}>
                details
            </div>
            <div
                className={getClassNames('LotManager')}
                onClick={() => {
                    toggleMode('LotManager')
                }}>
                lots
            </div>
            <div className='navButton' onClick={logout}>
                logout
            </div>
        </div>
    )
}

export default SidebarNav

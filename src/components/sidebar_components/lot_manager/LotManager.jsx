import { useState } from 'react'
import LotList from './LotList'
import palletpalContext from '../../../palletpalContext'
import { useContext } from 'react'

export default function LotManager() {
    const {
        state: { microModes }
    } = useContext(palletpalContext)
    const [active, setActive] = useState(false)

    if (microModes.LotManager) {
        return (
            <div id='lotManager'>
                <>
                    <button onClick={() => setActive(false)}>
                        close Lot Manager
                    </button>
                    <LotList />
                </>
            </div>
        )
    } else {
        return <></>
    }
}

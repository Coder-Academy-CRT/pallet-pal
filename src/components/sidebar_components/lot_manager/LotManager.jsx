import { useState } from 'react'
import LotList from './LotList'
import palletpalContext from '../../../palletpalContext'
import { useContext } from 'react'

export default function LotManager() {
    const {
        state: { microModes }
    } = useContext(palletpalContext)

    if (microModes.LotManager) {
        return (
            <div id='lotManager'>
                <LotList />
            </div>
        )
    } else {
        return <></>
    }
}

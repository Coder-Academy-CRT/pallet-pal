import { useState } from "react"

function LotCard() {
    const [editMode, setEditMode] = useState(false)

    function setEditOn() {
        setEditMode(true)
    }

    function setEditOff() {
        setEditMode(false)
    }

    if (editMode) {
        return (
            <div className='lotCard'>
                <h3>insert lot</h3>
                <h3>dropdown</h3>
                <button onClick={setEditOff}>save</button>
            </div>
        )
    } else {
        return (
            <div className='lotCard'>
                <p>lot number</p>
                <p>amt.</p>
                <button onClick={setEditOn}>edit</button>
            </div>
        )
    }
}

export default LotCard

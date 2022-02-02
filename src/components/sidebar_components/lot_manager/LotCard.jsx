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
                <p>this is a form</p>
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

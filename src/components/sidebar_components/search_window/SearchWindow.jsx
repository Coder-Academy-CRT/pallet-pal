import { useState } from "react"

function SearchWindow() {
    // added this state to test how turning a sidebar component on and off might work.
    // this works from inside the component, however I am unsure how to link the setOn() to the icon in the sidebarNav which is a separate component.
    const [active, setActive] = useState(true)

    function setOff() {
        setActive(false)
    }

    function setOn() {
        setActive(true)
    }

    // only render while active
    if (active) {
        return (
            <div id='searchWindow'>
                <button onClick={setOff}>close Search</button>
                SEARCH
            </div>
        )
    } else {
        // have put a button here as a placeholder to test opening and closing.

        return (
            <div id='searchWindow'>
                <button onClick={setOn}>open Search</button>
            </div>
        )
    }
}

export default SearchWindow

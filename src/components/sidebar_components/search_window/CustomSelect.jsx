import React, { useEffect } from "react"

function CustomSelect({ options, name, watching, change }) {
    const optionElements = []

    useEffect(() => {
        console.log({ options })
    }, [watching])

    if (options) {
        options.forEach((element, index) => {
            optionElements.push(
                <option value={element.value} key={index}>
                    {element.label}
                </option>
            )
        })
    }

    return (
        <select
            name={name}
            id={name}
            className='searchDropdown'
            onChange={change}
            placeholder='select'>
            {optionElements ? optionElements : "no options"}
        </select>
    )
}

export default CustomSelect

import React, { useEffect, useState } from 'react'

function CustomSelect({ options, name, watching, change }) {
    const optionElements = []
    const [selectedValue, setSelectedValue] = useState('')

    function handleChange(event) {
        change(event)
        setSelectedValue(event.target.value)
    }

    useEffect(() => {
        setSelectedValue('')
    }, [watching])

    return (
        <select
            name={name}
            id={name}
            className='searchDropdown'
            onChange={handleChange}
            value={selectedValue}>
            {options ? (
                <>
                    <option value='' disabled>
                        please select
                    </option>
                    {options.map((element, index) => (
                        <option value={element.value} key={index}>
                            {element.label}
                        </option>
                    ))}
                </>
            ) : null}
        </select>
    )
}

export default CustomSelect

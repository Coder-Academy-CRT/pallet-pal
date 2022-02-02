import React, { useEffect } from "react"
import Select from "react-select"

function CustomSelect({ options, placeholder, name, onChange, watching }) {
    useEffect(() => {
        console.log("rendered custom select")
    }, watching)
    return <Select name={name} options={options} setValue={null} />
}

export default CustomSelect

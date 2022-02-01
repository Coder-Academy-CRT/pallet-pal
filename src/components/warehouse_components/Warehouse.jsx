import Location from "./Location"

function Warehouse({ rows, columns, locationsInfo }) {
    const locations = []
    const locationCount = rows * columns

    const dynamicStyling = {
        gridTemplateRows: `repeat(${rows}, calc(100% / ${rows}))`,
        gridTemplateColumns: `repeat(${columns}, calc(100% / ${columns}))`
    }

    // for (let i = 0; i < locationCount; i++) {
    //     locations.push(<Location />)
    // }

    return (
        <div id='warehouse' style={dynamicStyling}>
            {/* {locations} */}
            {locationsInfo.map(location => (
                <Location info={location.pallets_on_location}/>
            ))}
        </div>
    )
}

export default Warehouse

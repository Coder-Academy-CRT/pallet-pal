import Location from "./Location"

function Warehouse({ rows, columns }) {
    const locations = []
    const locationCount = rows * columns

    const dynamicStyling = {
        gridTemplateRows: `repeat(${rows}, calc(100% / ${rows}))`,
        gridTemplateColumns: `repeat(${columns}, calc(100% / ${columns}))`
    }

    for (let i = 0; i < locationCount; i++) {
        locations.push(<Location />)
    }

    return (
        <div id='warehouse' style={dynamicStyling}>
            {locations}
        </div>
    )
}

export default Warehouse

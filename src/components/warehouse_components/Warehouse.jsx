import Location from "./Location"

function Warehouse({ rows, columns, locationsInfo, setClickedLocation }) {
    const locations = []
    const locationCount = rows * columns

    const dynamicStyling = {
        gridTemplateRows: `repeat(${rows}, calc(100% / ${rows}))`,
        gridTemplateColumns: `repeat(${columns}, calc(100% / ${columns}))`
    }

    return (
        <div id='warehouse' style={dynamicStyling}>
            {locationsInfo.map((location, index) => (
                <Location info={location.pallets_on_location} key={index} id={index} setClickedLocation={setClickedLocation}/>
            ))}
        </div>
    )
}

export default Warehouse

function Location({ info }) {
    
    const style = {
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const boxes = []
    // Only create box when info[0] != null
    if (info[0]) {
        for (let i = 0; i < info.length; i++) {
            boxes.push(<div className='palletBox' key={i} style={style}># {info[i]}</div>)
        }
    } 
    return <div className='location'>{boxes}</div>
}

export default Location

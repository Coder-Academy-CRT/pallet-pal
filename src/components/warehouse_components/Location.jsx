function Location({ info, id, setClickedLocation }) {
    const style = {
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    const boxes = []
    // Only create box when info[0] != null
    if (info[0]) {
        for (let i = 0; i < info.length; i++) {
            boxes.push(<div className='palletBox' key={i} style={style}># {info[i]}</div>)
        }
    } 

    const handleClick = (e) => {
        setClickedLocation(e.target.id)
    }

    return <div className='location' onClick={handleClick} id={id}>{boxes}</div>
}

export default Location



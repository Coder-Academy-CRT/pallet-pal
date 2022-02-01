function Location() {
    const num = Math.floor(Math.random() * 4)
    const boxes = []
    for (let i = 0; i < num; i++) {
        boxes.push(<div className='palletBox' key={i}></div>)
    }
    return <div className='location'>{boxes}</div>
}

export default Location

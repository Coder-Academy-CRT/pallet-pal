import React from 'react'
import { useEffect } from 'react'

function Summary({ summary }) {
    useEffect(() => {}, [])

    if (summary) {
        return (
            <div id='summary'>
                <h4>{summary.kind}</h4>
                {summary.totalWeight}kg in {summary.bags} bags.
            </div>
        )
    } else {
        return <></>
    }
}

export default Summary

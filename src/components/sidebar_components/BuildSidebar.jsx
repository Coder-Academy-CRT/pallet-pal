import React, { useContext, useState } from 'react'
import palletpalContext from '../../palletpalContext'

function BuildSidebar() {
    const {
        state: { warehouseList, tempWarehouse },
        dispatch
    } = useContext(palletpalContext)
    const [warehouseName, setWarehouseName] = useState('')

    function saveWarehouse() {
        // on save, create a new warehouse object from temp object + name
        const newWarehouse = {
            id: tempWarehouse.id,
            name: warehouseName,
            rows: tempWarehouse.rows,
            columns: tempWarehouse.columns
        }
        // ADD NEW WAREHOUSE TO DB AND ON STATUS OK
        //  put database code here
        // set global warehouse to new warehouse
        dispatch({
            type: 'setWarehouse',
            data: { newWarehouse }
        })
        // add warehouse to global list of warehouses
        dispatch({
            type: 'addWarehouse',
            data: { newWarehouse }
        })
        // set to main mode which will load this new wh
        dispatch({
            type: 'setMetaMode',
            data: 'main'
        })
    }

    function handleChange(event) {
        setWarehouseName(event.target.value)
    }

    function handleSubmit(event) {
        saveWarehouse()
    }
    return (
        <div id='buildSidebar'>
            <section id='instructions'>
                <h1>Instructions</h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eligendi officia aspernatur excepturi iusto voluptatem
                    dolore fugit natus maxime inventore sapiente mollitia ex
                    debitis voluptas ipsa modi at, illum expedita? Sequi minus
                    illo aliquid maxime accusamus quos explicabo voluptatem
                    atque soluta tempore, possimus expedita excepturi ipsa ex
                    accusantium deleniti, iusto natus.
                </p>
            </section>
            <section id='legend'>
                <div className='spare_floor legendBox'>spare floor</div>
                <div className='allocated_storage legendBox'>
                    allocated storage
                </div>
                <div className='inaccessible legendBox'>inaccessible</div>
            </section>
            <section id='buildActions'>
                <h1>Warehouse Name:</h1>
                <form action='saveWarehouse' onSubmit={handleSubmit}>
                    <input
                        type='text'
                        id='whName'
                        name='whName'
                        placeholder='enter warehouse name here...'
                        value={warehouseName}
                        onChange={handleChange}
                    />
                    <input type='submit' value='save warehouse' id='whSubmit' />
                </form>
            </section>
        </div>
    )
}

export default BuildSidebar

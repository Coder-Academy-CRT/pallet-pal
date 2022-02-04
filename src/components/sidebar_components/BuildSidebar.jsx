import React, { useContext } from 'react'
import palletpalContext from '../../palletpalContext'

function BuildSidebar() {
    const { state } = useContext(palletpalContext)
    console.log(state)
    return (
        <div>
            <section id='instructions'>
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
        </div>
    )
}

export default BuildSidebar

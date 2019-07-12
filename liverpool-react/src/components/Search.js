import React from 'react'

export default function Search({ handleSearch, handleClick, getHistory }) {
    return (
        <section className="section">
            <div className="columns is-multiline is-mobile">
                <div className="column is-12">
                    <div className="columns is-centered">
                        <div className="column is-two-thirds has-text-centered has-spacing-bottom has-no-background">
                            <h2 className="title is-size-5 is-size-3-tablet">Bienvenido</h2>
                            <div className="subtitle is-size-5 is-size-4-tablet"><p>Aquí puedes buscar artículos Liverpool</p></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="columns is-mobile">
                <div className="field column is-centered" >
                    <div className="control columns is-centered">
                        <input className="input column is-6 is-centered" type="text" name="nombre" placeholder="Busqueda" onChange={(e) => handleSearch(e)} />
                    </div>
                </div>
            </div>
            <div className="buttons column is-centered">
                <input className="button column is-info is-3" type="button" value="Buscar" onClick={handleClick} />
            </div>


        </section>
    )
}

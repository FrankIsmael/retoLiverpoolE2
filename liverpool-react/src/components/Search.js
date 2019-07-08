import React from 'react'

export default function Search({handleSearch, handleClick, getHistory}) {
    return (
        <div>
            <h1>Liverpool</h1>
            <label>Search</label><br/>
            <input name='searchs' placeholder='search a product' onChange={(e)=> handleSearch(e)} /><br/>
            <button onClick={handleClick}>Buscar</button>
        </div>
    )
}

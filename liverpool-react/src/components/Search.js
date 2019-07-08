import React from 'react'

export default function Search({handleSearch}) {
    return (
        <div>
            <h1>Liverpool</h1>
            <label>Search</label><br/>
            <input name='product' placeholder='search a product' onChange={(e)=> handleSearch(e)} /><br/>
        </div>
    )
}

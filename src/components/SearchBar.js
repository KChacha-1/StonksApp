import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

export default function SearchBar() {
    const [term, setTerm] = useState('')
    const search = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        search(`/search?q=${term}`)
    }
  return (
    <div className='searchBar'>
        <form onSubmit={handleSubmit}>
            <input 
            placeholder="Search"
            type="text"
            id="search"
            onChange={(e)=>setTerm(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    </div>
  )
}

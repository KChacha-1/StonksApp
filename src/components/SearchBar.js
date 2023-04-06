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
    const [showSearchBar, setShowSearchBar] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  }
  return (
    <div className='searchBar'>
        <button className={`search-icon ${showSearchBar ? 'hidden' : ''}`} onClick={toggleSearchBar}>Search</button>
      {showSearchBar && (
        <form onSubmit={handleSubmit}>
            <input 
            placeholder="Ticker"
            type="text"
            id="search"
            onChange={(e)=>setTerm(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
        )}
    </div>
  )
}

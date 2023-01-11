import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import SearchBar from './SearchBar'

export default function Navbar() {
  return (
    <div className='navbar'>
        <nav>
            <Link to="/">
            <h1 className="siteName">StonksApp</h1>
            </Link>
            <SearchBar/>
        </nav>
    </div>
  )
}

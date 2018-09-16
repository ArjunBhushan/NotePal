import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/courses'>Courses</Link></li>
        <li><Link to='/notes'>My Notes</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
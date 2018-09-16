import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import './header.css'

// The Header creates links that can be used to navigate between routes.
const Header = () => (
  <header>
    <nav className="headerLinks">
      <Button style={{marginRight: 10}}><Link style={{color: '#fff', textDecoration: 'none'}} to='/'>Home</Link></Button>
      <Button style={{marginRight: 10}}><Link style={{color: '#fff', textDecoration: 'none'}} to='/login'>Login</Link></Button>
      <Button style={{marginRight: 10}}><Link style={{color: '#fff', textDecoration: 'none'}} to='/courses'>Courses</Link></Button>
      <Button style={{marginRight: 10}}><Link style={{color: '#fff', textDecoration: 'none'}} to='/notes'>My Notes</Link></Button>
    </nav>
  </header>
)

export default Header
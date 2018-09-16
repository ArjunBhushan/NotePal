import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import './header.css'

// The Header creates links that can be used to navigate between routes.
const Header = () => {
  const token = localStorage.getItem('token');
  return (
    <header>
      <nav className="headerLinks">
        {token ? <Button style={{marginRight: 10}}><Link style={{color: '#fff', textDecoration: 'none'}} to='/'>Home</Link></Button> : null}
        <Button style={{marginRight: 10}}><Link style={{color: '#fff', textDecoration: 'none'}} to='/login'>Login</Link></Button>
        {token ? <Button style={{marginRight: 10}}><Link style={{color: '#fff', textDecoration: 'none'}} to='/courses'>Courses</Link></Button> : null}
        {token ? <Button style={{marginRight: 10}}><Link style={{color: '#fff', textDecoration: 'none'}} to='/notes'>My Notes</Link></Button> : null}
      </nav>
    </header>
  )
}

export default Header

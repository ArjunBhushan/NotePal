import React from 'react'
import { Link } from 'react-router-dom'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const Note = () => {
  return (
    <div>
      <p>Individual Note</p>
      <Link to='/notes'>Back</Link>
    </div>
  )
}

export default Note

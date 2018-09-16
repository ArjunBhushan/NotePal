import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FullNotes from '../FullNotes'
import Note from '../Note'

// The Roster component matches one of two different routes
// depending on the full pathname
const Courses = () => (
  <Switch>
    <Route exact path='/notes' component={FullNotes}/>
    <Route path='/notes/:number' component={Note}/>
  </Switch>
)


export default Courses

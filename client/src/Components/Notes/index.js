import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FullNotes from '../FullNotes'
import Note from '../Note'

const Notes = (props) => (
  <Switch>
    <Route exact path='/notes' component={FullNotes}/>
    <Route path='/notes/:number' component={Note} />
  </Switch>
)


export default Notes

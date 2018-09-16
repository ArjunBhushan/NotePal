import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FullNotes from '../FullNotes'
import Note from '../Note'

const Notes = (props) => {
  return(
    <div>
      <Switch> 
        <Route exact path='/notes' component={FullNotes}/>
        <Route path='/notes/:number' render={(props) => <Note text={props.location.state.text} />}/>
      </Switch>
   </div>
  ) 
}

export default Notes

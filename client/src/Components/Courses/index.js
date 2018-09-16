import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FullCourses from '../FullCourses'
import Course from '../Course'

// The Roster component matches one of two different routes
// depending on the full pathname
const Courses = () => (
  <Switch>
    <Route exact path='/courses' component={FullCourses}/>
    <Route path='/courses/:number' component={Course}/>
  </Switch>
)


export default Courses

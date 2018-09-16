import React from 'react'
import { Switch, Route } from 'react-router-dom'
import FullCourses from '../FullCourses'
import Course from '../Course'

const Courses = () => (
  <Switch>
    <Route exact path='/courses' render={() => <FullCourses />}/>
    <Route path='/courses/:number' component={Course}/>
  </Switch>
)


export default Courses

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../Home'
import LoginForm from '../Login'
import Courses from '../Courses'
import Notes from '../Notes'
import SignUp from '../SignUp'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => {
  const token = localStorage.getItem('token');
  return (
    <main>
      <Switch>
        {token ? null : <Route path='/login' component={LoginForm}/>}
        {token ? <Route path='/courses' component={Courses}/> : null}
        {token ? <Route path='/notes' component={Notes}/> : null}
        {token ? null : <Route path='/signup' component={SignUp}/>}
        {token ? <Route path='/' component={Home}/> : null}
        <Redirect to = '/login'/>
      </Switch>
    </main>
  )
};

export default Main

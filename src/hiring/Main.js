import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Register from './pages/Register'
import HomeScreen from './pages/HomeScreen'
import HomeScreen2 from './pages/HomeScreen2'
import SingleDisplay from './pages/SingleDisplay'
import SingleDisplay2 from './pages/SingleDisplay2'
import Dashboard from './pages/Dashboard'
import Edit from './pages/Edit'

function Main() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={HomeScreen} />
        <Route exact path="/home2" component={HomeScreen2} />
        <Route exact path="/profil" component={Dashboard} />
        <Route path="/display/:id" component={SingleDisplay} />
        <Route path="/display2/:id" component={SingleDisplay2} />
        <Route path="/edit/:id" component={Edit} />
        <Redirect from="*" to="/home" />
      </Switch>
    </>
  )
}

export default Main

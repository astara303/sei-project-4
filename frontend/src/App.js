import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.scss'

import Home from './components/common/Home'
import Navigation from './components/common/Navigation'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import WakeUp from './components/story/WakeUp'
import InTown from './components/story/InTown'
import RoadWorks from './components/story/RoadWorks'
import UserShow from './components/common/UserShow'
import UserIndex from './components/common/UserIndex'
import Profile from './components/common/Profile'
import ProfileEdit from './components/common/ProfileEdit'
import SecureRoute from './components/common/SecureRoute'
import ErrorPage from './components/common/ErrorPage'

const App = () => (
  <BrowserRouter>
    <main>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <SecureRoute path="/wakeup" component={WakeUp} />
        <SecureRoute path="/intown" component={InTown} />
        <SecureRoute path="/roadworks" component={RoadWorks} />
        <Route path="/interviewers/:id" component={UserShow}/>
        <Route path="/interviewers" component={UserIndex} />
        <SecureRoute path="/profile/:payload/edit" component={ProfileEdit} />
        <SecureRoute path="/profile/:id" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path='/*' component={ErrorPage} />
      </Switch>
    </main>
  </BrowserRouter>
)

export default App
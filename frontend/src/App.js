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

const App = () => (
  <BrowserRouter>
    <main>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/wakeup" component={WakeUp} />
        <Route path="/intown" component={InTown} />
        <Route path="/roadworks" component={RoadWorks} />
        <Route path="/interviewers/:id" component={UserShow}/>
        <Route path="/interviewers" component={UserIndex} />
        <Route path="/profile/:payload/edit" component={ProfileEdit} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </main>
  </BrowserRouter>
)

export default App
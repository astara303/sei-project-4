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
import NearOffice from './components/story/NearOffice'
import HelpOne from './components/story/HelpOne'
import HelpTwo from './components/story/HelpTwo'
import GoOne from './components/story/GoOne'
import GoTwo from './components/story/GoTwo'

const App = () => (
  <BrowserRouter>
    <main>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/wakeup" component={WakeUp} />
        <Route path="/intown" component={InTown} />
        <Route path="/nearoffice" component={NearOffice} />
        <Route path="/helpone" component={HelpOne} />
        <Route path="/helptwo" component={HelpTwo} />
        <Route path="/goone" component={GoOne} />
        <Route path="/gotwo" component={GoTwo} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </main>
  </BrowserRouter>
)

export default App
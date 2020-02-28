import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../../lib/auth'

const SecureRoute = ({ component: Component, ...rest }) => {

  if (auth.isAuthenticated()) return <Route {...rest} component={Component}/>
  auth.logout()
  return <Redirect to="/login"/>
  
}
export default SecureRoute

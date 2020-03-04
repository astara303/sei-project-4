import React from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

class Navigation extends React.Component {

  state = { payload: '' }

  // toggleNavbar = () => {
  //   this.setState({ navbarOpen: !this.state.navbarOpen })
  // }
  
  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }
  
  // componentDidUpdate(prevProps) {
    //   if (this.props.location.pathname !== prevProps.location.pathname) {
      //     this.setState({ navbarOpen: false })
      //   }
      // }
      
  componentDidMount() {
    if (Auth.isAuthenticated()) {
      const payload = Auth.getPayload().sub
      this.setState({ payload })
    } else {
    return
    }
  }

  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/interviewers">User Index</Nav.Link>
          {Auth.isAuthenticated() && <Nav.Link href="/wakeup">Story</Nav.Link>}
          {Auth.isAuthenticated() && <Nav.Link href={`/profile/${this.state.payload}`}>Profile</Nav.Link>}
          {!Auth.isAuthenticated() && <Nav.Link href="/register">Register</Nav.Link>}
          {!Auth.isAuthenticated() && <Nav.Link href="/login">Login</Nav.Link>}
        </Nav>
        <Nav className="mr-sm-2">
          {Auth.isAuthenticated() && <Button onClick={this.handleLogout} variant="outline-secondary">Logout</Button>}
        </Nav>
      </Navbar>
    )
  }
}

export default withRouter(Navigation)
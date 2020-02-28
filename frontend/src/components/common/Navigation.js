import React from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

class Navigation extends React.Component {

  state = { navbarOpen: false }

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

  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          {Auth.isAuthenticated() && <Nav.Link href="/wakeup">Story</Nav.Link>}
          {!Auth.isAuthenticated() && <Nav.Link href="/register">Register</Nav.Link>}
          {!Auth.isAuthenticated() && <Nav.Link href="/login">Login</Nav.Link>}
          {Auth.isAuthenticated() && <Button onClick={this.handleLogout} variant="outline-secondary">Logout</Button>}
        </Nav>
      </Navbar>
    )
  }

}

export default withRouter(Navigation)
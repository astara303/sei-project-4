import React from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

class Navigation extends React.Component {

  state = { payload: '' }

  //functions for creating a mobile responsive burger-menu style navbar

  // toggleNavbar = () => {
  //   this.setState({ navbarOpen: !this.state.navbarOpen })
  // }

    // componentDidUpdate(prevProps) {
  //   if (this.props.location.pathname !== prevProps.location.pathname) {
  //     this.setState({ navbarOpen: false })
  //   }
  // }

  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  componentDidMount() {
    if (Auth.isAuthenticated()) {
      const payload = Auth.getPayload().sub
      this.setState({ payload })
    } else {
      return
    }
  }

  //working on getting a logo to work on the navbar
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/interviewers">Connect</Nav.Link>
          {Auth.isAuthenticated() && <Nav.Link href="/wakeup">Start Your Story</Nav.Link>}
          {Auth.isAuthenticated() && <Nav.Link href={`/profile/${this.state.payload}`}>Profile</Nav.Link>}
          {!Auth.isAuthenticated() && <Nav.Link href="/register">Register</Nav.Link>}
          {!Auth.isAuthenticated() && <Nav.Link href="/login">Login</Nav.Link>}
        </Nav>
        {/* <Nav className="justify-content-center"> */}
        {/* <Navbar.Brand href="/">code_newbie</Navbar.Brand> */}
        {/* <img
        src="../assets/logo-01.png"
        width="30"
        height="15"
        className="d-inline-block align-top"
        alt="logo"
      /> */}
        {/* </Nav> */}
        <Nav className="mr-sm-2">
          {Auth.isAuthenticated() && <Button onClick={this.handleLogout} variant="outline-secondary">Logout</Button>}
        </Nav>
      </Navbar>
    )
  }
}

export default withRouter(Navigation)
import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import UserCard from './UserCard'
import Auth from '../../lib/auth'
import Search from './Search'

class UserIndex extends React.Component {
  state = {
    users: [],
    searchTerm: ''
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get('/api/users/')
      this.setState({ users: res.data, searchData: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //function for the search bar
  basicSearchFunction = (e) => {
    this.setState({ searchTerm: e.target.value })

  }

  //prepare users array to be filtered, and filter when searching
  filterUsers = () => {
    const searchTerm = new RegExp(this.state.searchTerm, 'i')
    return this.state.users.filter(user => searchTerm.test(user.location))
  }

  render() {
    const payload = Auth.getPayload().sub
    return (
      <Container>
        <Row className="justify-content-md-center">
          <h1 className="small-title add-margin">Connect with other Interviewers</h1>
        </Row>
        <Row className="justify-content-center">
          <div className="add-margin">
            <Search
              basicSearchFunction={this.basicSearchFunction}
              {...this.state}
            />
          </div>
        </Row>
        <Row>
          {this.filterUsers().map(user => (
            <UserCard
              key={user.id}
              {...user}
              isOwner={this.isOwner}
              payload={payload}
            />
          ))}
        </Row>
      </Container>
    )
  }

}

export default UserIndex

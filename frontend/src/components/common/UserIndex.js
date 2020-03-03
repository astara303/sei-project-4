import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import UserCard from './UserCard'
import Auth from '../../lib/auth'

class UserIndex extends React.Component {
  state = {
    users: []
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get('/api/users/')
      this.setState({ users: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    // if (!this.payload) return null
    const payload = Auth.getPayload().sub
    return (
      <Container>
          <h1 className="small-title add-margin">Find users!</h1>
        <Row className="">
            {this.state.users.map(user => (
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

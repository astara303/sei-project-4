import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import UserCard from './UserCard'

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
    // console.log(this.state.users)
    return (
      <Container>
        <Row className="">

        {this.state.users.map(user => (
              <UserCard key={user.id} {...user} />
            ))}
            
        </Row>
      </Container>
    )
  }

}

export default UserIndex

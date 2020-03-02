import React from 'react'
import axios from 'axios'

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
      <div>
        {this.state.users.map(user => (
              <UserCard key={user.id} {...user} />
            ))}
      </div>
    )
  }

}

export default UserIndex

import React from 'react'
import axios from 'axios'

class UserShow extends React.Component {
  state = {
    user: []
    // firstBusiness: {},
    // secondBusiness: {}
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/users/${userId}/`)
      this.setState({ user: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    console.log('id', this.props.match.params.id)
    const { user } = this.state
    if (!user.businesses) return null
    return (
      <div>
        <h1>This is the show page for a user.</h1>
        <p>This is {user.username}'s profile page</p>
        <div>Their businesses are {user.businesses.map(business => 
        <>
        <p key={business.name}>{business.name}</p>
        <p key={business.category}>{business.category}</p>
        <img key={business.name} src={business.image} alt={business.name} />
        </>
        )}
        </div>
      </div>
    )
  }

}

export default UserShow
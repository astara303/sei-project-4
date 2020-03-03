import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'

class Profile extends React.Component {
  state = {
    user: {},
    firstBusiness: {},
    secondBusiness: {}
  }

  componentDidMount = async () => {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get(`/api/users/${payload}/`)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  // getBusinesses = async () => {
  //   try {
  //     const firstBusiness = await axios.get(`/api/businesses/${this.state.user.businesses[0]}`)
  //     const secondBusiness = await axios.get(`/api/businesses/${this.state.user.businesses[1]}`)
  //     this.setState({ firstBusiness, secondBusiness})
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  render() {
    // console.log(this.state.firstBusiness)
    // console.log(this.state.secondBusiness)
    const { user } = this.state
    if (!user.businesses) return null
    return (
      <>
      <h1>This is {user.username}'s profile page</h1>
      <div>Their businesses are {user.businesses.map(business => 
        <p key={business.id}>{business.name}</p>
      )}
      </div>
      </>
    )
  }

}

export default Profile

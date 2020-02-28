import React from 'react'
import axios from 'axios'

class Register extends React.Component {

  state = {
    data: { // * our form data, storing in state on a key called data
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      profile_image: ''
    },
    errors: {}
  }

  // Before destructuring
  // handleChange = (e) => {
  //   const data = {...this.state.data, [e.target.name]: e.target.value}
  // }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value } // * make a copy of the data object in state, and update the field that the user is typing in, we identify this from the name attribute of the input (e.target.name)
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors }) // * set the new data object into state to replace the old one
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('api/register', this.state.data)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit}>
        <h2 className="title">Register</h2>
        <div>
          <label>Username</label>
          <div>
            <input
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div>
          <label>Email</label>
          <div className="control">
            <input
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div>
          <label>Password Confirmation</label>
          <div>
            <input
              type="password"
              placeholder="Password Confirmation"
              name="password_confirmation"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div>
          <label>Image</label>
          <div>
            <input
              placeholder="Image URL"
              name="profile_image"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">Register Me</button>
        </div>
      </form>
    )
  }
}

export default Register
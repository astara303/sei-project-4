import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

import Auth from '../../lib/auth'
import UserForm from '../common/UserForm'

class ProfileEdit extends React.Component {
  state = {
    data: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      location: '',
      profile_image: '',
      website: '',
      looking_for_work: '',
    }
  }

  // on componentDidMount we’re getting the data from the current user and setting it to state 
  async componentDidMount() {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get(`/api/users/${payload}/`)
      this.setState({ data: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // this handleChange function is triggered anytime a change is made in the profile edit form. First it checks if the event target has a type of checkbox and if it does it sets the value variable to checked and if not it sets it to the current value of whatever the event target is. We then make a copy of the data stored in state and update any new values in any of the fields. We then set state to reflect these changes. 
  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const data = { ...this.state.data, [e.target.name]: value }
    this.setState({ data })
  }

  // this handleSubmit function uses a patch request and updates any of the users data that has changed. It only targets fields that have changed and leaves the rest as they are. It also adds a header and bearer token to the request for authentication. 
  handleSubmit = async (e) => {
    e.preventDefault()
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.patch(`/api/users/${payload}/edit`, { ...this.state.data }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/profile/${payload}`)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // this handleChangeImage function focuses just on the uploading and setting of state of the users new profile image
  handleChangeImage = ({ target: { name, value } }) => {
    const newValue = value
    const data = { ...this.state.data, [name]: newValue }
    this.setState({ data })
  }

  render() {
    return (
      <Container>
        <Row className="add-margin-more">
          <Col>
            <h1 className="small-title">Edit your profile</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: '25rem' }}>
              <Card.Body>
                <UserForm
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handleChangeImage={this.handleChangeImage}
                  data={this.state.data}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ProfileEdit
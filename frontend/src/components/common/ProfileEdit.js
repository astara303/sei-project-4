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

  async componentDidMount() {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get(`/api/users/${payload}/`)
      this.setState({ data: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const data = { ...this.state.data, [e.target.name]: value }
    this.setState({ data })
  }

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
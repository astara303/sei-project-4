import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Register extends React.Component {

  state = {
    data: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      profile_image: ''
    },
    error: ''
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('api/register', this.state.data)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ error: 'Invalid registration. Please check your details.' })
    }
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: '25rem' }}>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Card.Title>Register</Card.Title>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password Confirmation"
                      name="password_confirmation"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  {/* <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      placeholder="Image"
                      name="profile_image"
                      onChange={this.handleChange}
                    /> */}
                  {/* {this.state.error &&
                      <Form.Text className="text-muted">
                        {this.state.error}
                      </Form.Text>
                    }
                  </Form.Group> */}
                  <Button variant="outline-dark" type="submit">Register Me</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Register
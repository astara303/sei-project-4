import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

class Login extends React.Component {

  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('api/login', this.state.data)
      Auth.setToken(res.data.token)
      this.props.history.push('/')
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
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
                    <Card.Title>Login</Card.Title>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange} />
                    {this.state.error &&
                      <Form.Text className="text-muted">
                        {this.state.error}
                      </Form.Text>
                    }
                  </Form.Group>
                  <Button variant="outline-dark" type="submit">Login</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Login
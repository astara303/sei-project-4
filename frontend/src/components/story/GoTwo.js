import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Interview from './Interview'
import Auth from '../../lib/auth'

class GoTwo extends React.Component {
  state = {
    score: this.props.score,
    interview: false,
    user: []
  }

  async componentDidMount() {
    const payload = Auth.getPayload().sub
    try {
      const user = await axios.get(`/api/users/${payload}`)
      this.setState({ user: user.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleClick = () => {
    let interview = this.state.interview
    if (interview === false) {
      interview = true
    } else {
      return
    }
    this.setState({ interview })
  }

  render() {
    console.log(this.props.score)
    return (
      <>
      {/* correct background */}
      <header className="gotwo-masthead extra-masthead masthead">
      {!this.state.interview &&
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
                <Card style={{ width: '40rem' }}>
                  <Card.Body>
                    <Card.Title className="small-title">You enter the office building and breathe a sigh of relief.</Card.Title>
                      <Card.Text className="add-margin">You're perfectly on time. You head to reception to check in, and wait for a few minutes. And then a few more. Where is your interviewer?</Card.Text>
                      <Card.Text className="add-margin">You take out your phone re-read some notes about a new language you've been coding in. You don't hear someone enter the room.</Card.Text>
                      <Card.Text className="add-margin">"{this.state.user.first_name}?"</Card.Text>
                      <Card.Text className="add-margin">You look up and feel your stomache drop. It's the person who dropped all their papers- the same one you walked past without helping. They seem to recognise you and they don't look happy.</Card.Text>
                      <Card.Text className="add-margin">"That's me," you respond with a smile. They don't smile back at you.</Card.Text>
                      <Card.Text className="add-margin">"Sorry I'm a bit late. We should get started then. Would you mind following me into this office? We'll ask you a few questions to guage your understanding of some basic concepts. The questions will be snippets of code and we'll ask you to explain what the result would or should be. Is that ok?"</Card.Text>
                      <Card.Text className="add-margin">"Of course. I'll follow you."</Card.Text>
                    <div>
                      <Button className="btn btn-light add-margin" onClick={this.handleClick}>Continue</Button>
                    </div>
                  </Card.Body>
                </Card>
          </Col>
          </Row>
        </Container>
        }
      {this.state.interview &&
          <Interview score={this.state.score} />
        }
        </header>
      </>
    )
  }
}

export default GoTwo
import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Interview from './Interview'
import Auth from '../../lib/auth'

class HelpTwo extends React.Component {
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
    console.log(this.state.score)
    return (
      <>
        {/* correct background */}
        <header className="helptwo-masthead masthead">
          {!this.state.interview &&
            <Container>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Card style={{ width: '40rem' }}>
                    <Card.Body>
                      <Card.Title className="small-title">You lean down and gather the papers at your feet.</Card.Title>
                      <Card.Text>
                        <p className="add-margin">You gather the papers at your feet, along with any that are trying to blow away, and hand them back to a very flustered but grateful person. They thank you, and you double-time it up to the offices.</p>
                        <p className="add-margin">You don't even take a moment to check your watch before you head into the building and up to reception. You don't want to know how late you are. But you catch a glimpse of the clock above the receptionist, and you're five minutes late.</p>
                        <p className="add-margin">Not horrible, but not great. You wonder for a moment if they won't see you for the interview if you weren't on time.</p>
                        <p className="add-margin">Someone turns the corner. "{this.state.user.first_name}?"</p>
                        <p className="add-margin">"That's me," you say with a smile. They give you a half-smile back.</p>
                        <p className="add-margin">"We should get started then. Would you mind following me into this office? We'll ask you a few questions to guage your understanding of some basic concepts. The questions will be snippets of code and we'll ask you to explain what the result would or should be. Is that ok?"</p>
                        <p className="add-margin">"Of course. I'll follow you."</p>
                      </Card.Text>
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

export default HelpTwo
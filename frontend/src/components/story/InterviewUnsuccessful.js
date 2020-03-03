import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

class InterviewUnsuccessful extends React.Component {
  state = {
    score: this.props.score,
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

  render() {
    if (!this.state.user) return null
    return (
      <header className="homepage-masthead masthead">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: '35rem' }}>
              <Card.Body>
                <Card.Title className="small-title">It's been a few days since the interview.</Card.Title>
                <Card.Text>
                  Your phone rings. You answer. A familiar voice is on the other end. 
                  "Hello, is this {this.state.user.username}?"
                  "Yes, it is."
                  "Hello there! I wanted to thank you so much for interviewing with our company. We really enjoyed meeting you-"
                  Your heart doesn't know whether to fly or sink. Is this a gentle let down or are they setting you up for good news?
                  "But unfortunately on this occasion we've decided to offer the role to another candidate."
                  You can feel a weight on your chest, but a strange relief as well.
                  "Thank you so much for letting me know. It was a pleasure to meet you and interview with you." You're proud of yourself for getting that out.
                  "Of course, and we will be in touch if any future roles would suit you."
                  "That's great. Thank you again."
                  "Have a lovely day, bye!"
                  "You too, goodbye."
                  You hang up the phone and take a deep breath. There is that weight on you, tempting you to blame yourself and spiral into self-pity. But there's also that relief. What is that? Maybe a reminder that you just have to keep going. There is something better for you, more suited for you, out there.
                  Until you do land that dream job- and we all know you will- feel free to run through this interview a few times and remind yourself that you are always moving forward, and that interviews hinge on luck as much as skill.
                  In the meantime, connect with other users who are currently looking for jobs or have become employed since using the site.
                  Happy interviewing!
                  <Link to={`/profile/${Auth.getPayload().sub}`}><Button className="btn btn-light">Go to profile</Button></Link>
                  <Link to={'/interviewers'}><Button className="btn btn-light">See users</Button></Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </header>
    )
  }

}

export default InterviewUnsuccessful
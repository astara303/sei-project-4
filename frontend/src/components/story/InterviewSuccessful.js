import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

class InterviewSuccessful extends React.Component {
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
      <header className="plain-background">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Card style={{ width: '60rem' }}>
                <Card.Body>
                  <Card.Title className="small-title">It's been a few days since the interview.</Card.Title>
                  <Card.Text>
                    <Card.Text className="add-margin">Your phone rings. You answer. A familiar voice is on the other end.</Card.Text>
                    <Card.Text className="interview-margin">"Hello, is this {this.state.user.username}?"</Card.Text>
                    <Card.Text className="interview-margin">"Yes, it is."</Card.Text>
                    <Card.Text className="interview-margin">"Hello there! I wanted to thank you so much for interviewing with our company. We really enjoyed meeting you-" Your heart doesn't know whether to fly or sink. Is this a gentle let down or are they setting you up for good news? They continue, "...and we would be so pleased to offer you a place on our team." Your mind goes blank. Is this what it feels like to go into shock? A strange numbness washes over you.</Card.Text>
                    <Card.Text className="interview-margin">As the feeling comes back to your fingers, you're not sure how long you've been quiet. "Wow, that's great, thank you so much!" you manage to sputter out.</Card.Text>
                    <Card.Text className="interview-margin">"We'll be in touch soon with the details. Great job on the interview. We're really looking forward to you joining us."</Card.Text>
                    <Card.Text className="interview-margin">"It was a pleasure meeting you as well. I can't wait to start. Thank you!" You hang up the phone and take a deep breath. You always knew you could do it.</Card.Text>
                    <Card.Text className="interview-margin">When you do land that dream job- and we all know you will- don't forget to update your user profile to: employed! In the meantime, connect with other users who are currently looking for jobs or have become employed since using the site.</Card.Text>
                    <Card.Text className="add-margin">Happy interviewing!</Card.Text>
                    <Link to={`/profile/${Auth.getPayload().sub}`}><Button className="btn btn-light add-margin">Go to profile</Button></Link>
                    <Link to={'/interviewers'}><Button className="btn btn-light add-margin">See users</Button></Link>
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

export default InterviewSuccessful
import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Interview from './Interview'
import Auth from '../../lib/auth'

class HelpOne extends React.Component {
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
      {!this.state.interview &&
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
                <Card style={{ width: '35rem' }}>
                  <Card.Body>
                    <Card.Title className="small-title">You lean down and gather the papers at your feet.</Card.Title>
                    <Card.Text>
                    <p className="add-margin">At a glance, you notice the logo for the company you’re interviewing with on one of the pages.</p>
                    <p className="add-margin">You’re reminded what’s at stake, but glad that you stopped to help. You scoop up the remaining pages scattered about the sidewalk and hand them back to the grateful person.</p>
                    <p className="add-margin">You end up walking together into the building. They look at you, surprised. They ask what you're there for.</p>
                    <p className="add-margin">"I'm here to interview for a developer role."</p>
                    <p className="add-margin">"Wait, are you {this.state.user.username}?"</p>
                    <p className="add-margin">You confirm that you are, and they smile.</p>
                    <p className="add-margin">"That's so great. I'll be interviewing you today. I'm sorry about my mess outside but so grateful you stopped to help. This way we aren't getting started too late!"</p>
                    <p className="add-margin">"No problem! I was happy to help."</p>
                    <p className="add-margin">"I really appreciate it. If you're ready, would you mind following me into this office? And we'll ask you some questions to guage your understanding of some basic concepts. The questions will be snippets of code and we'll ask you to explain what the result would or should be. Does that sound good?"</p>
                    <p className="add-margin">"Definitely, let's do it!"</p>
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
      </>
    )
  }
}

export default HelpOne
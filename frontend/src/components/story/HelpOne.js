import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Interview from './Interview'

class HelpOne extends React.Component {
  state = {
    score: 1,
    interview: false
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
                    <Card.Title>This is the page for a positive result from helping.</Card.Title>
                    <Card.Text>
                    <p>You lean down and gather the papers at your feet.</p>
                  <p>At a glance, you notice the logo for the company you’re interviewing with. You’re reminded what’s at stake, but glad that you stopped to help.</p>
                  <p>You scoop up the remaining pages scattered about the sidewalk and hand them back to the grateful person.</p>
                  <p>You end up walking together into the building and they’re surprised. They ask what you're there for.</p>
                    </Card.Text>
                    <div>
                      <Button variant="dark" onClick={this.handleClick}>Continue</Button>
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
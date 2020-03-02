import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class InterviewUnsuccessful extends React.Component {
  state = {
    score: this.props.score
  }

  render() {
    return (
      <header className="wakeup-masthead masthead">
      <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: '35rem' }}>
            <Card.Body>
              <Card.Title className="small-title">Interview was unsuccessful...</Card.Title>
              <Card.Text><p>There will be story text here</p>
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
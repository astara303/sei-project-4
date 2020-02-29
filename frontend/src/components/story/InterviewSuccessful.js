import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class InterviewSuccessful extends React.Component {
  state = {
    score: this.props.score
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: '35rem' }}>
              <Card.Body>
                <Card.Title>Interview was successful!</Card.Title>
                <Card.Text><p>There will be story text here</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

}

export default InterviewSuccessful
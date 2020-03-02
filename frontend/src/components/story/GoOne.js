import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Interview from './Interview'

class GoOne extends React.Component {
  state = {
    score: this.props.score,
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
      <header class="goone-masthead">
      {!this.state.interview &&
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
                <Card style={{ width: '35rem' }}>
                  <Card.Body>
                    <Card.Title className="small-title">This is the page for a positive result for being on time.</Card.Title>
                    <Card.Text><p>There will be story text here</p>
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

export default GoOne
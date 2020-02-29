import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class NearOffice extends React.Component {
  state = {
    helpGood: false,
    helpBad: false,
    keepGoingGood: false,
    keepGoingBad: false
  }

  /* 
  stop and help:
  one good option (interviewer recognises you, +1 starting score)
  one bad option (you are late)

  keep going:
  one good option (you are on time, +1 starting score)
  one bad option (interviewer recognises that you didnt help)

  mathrandom: Math.random() < 0.5

  for the event:
    if (e.target.textcontent = 'Stop and help.') {
      use math-random to pick true or false. assign this to variable.
      if (variable === true) {
        const helpGood = true
        setState helpgood
      } else {
        const helpBad = true
        setstate helpbad
      }
    } else {
      use math-random to pick true or false. assign this to variable.
      if (variable === true) {
        const keepGoingGood = true
        setState keepGoingGood
      } else {
        const keepGoingBad = true
        setState keepGoingBad
      }
    }
    
  */

  handleChoice = (e) => {
    if (e.target.textContent === 'Stop and help collect the papers.') {
      const luck = Math.random() < 0.5
      if (luck === true) {
        const helpGood = true
        this.setState({ helpGood })
      } else {
        const helpBad = true
        this.setState({ helpBad })
      }
    } else {
      const luck = Math.random() < 0.5
      if (luck === true) {
        const keepGoingGood = true
        this.setState({ keepGoingGood })
      } else {
        const keepGoingBad = true
        this.setState({ keepGoingBad })
      }
    }
  }


  render() {
    console.log(this.state)
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: '35rem' }}>
              <Card.Body>
                <Card.Title>Time to make a choice.</Card.Title>
                <Card.Text>
                  <p>As you turn a corner, you see someone drop a stack of papers that all blow off in different directions.</p>
                  <p>Your cafe detour has left you no time to hang about before you need to check in at reception for the interview.</p>
                  <p>What do you do?</p>
                </Card.Text>
                <Button variant="outline-dark" onClick={this.handleChoice}>Stop and help collect the papers.</Button>
                <Button variant="outline-dark" onClick={this.handleChoice}>Keep going- you can't be late.</Button>
                <hr />
                {this.state.helpGood &&
                  <Link to={'/helpone'}><Button variant="dark">Continue</Button></Link>
                }
                {this.state.helpBad &&
                  <Link to={'/helptwo'}><Button variant="dark">Continue</Button></Link>
                }
                {this.state.keepGoingGood &&
                  <Link to={'/goone'}><Button variant="dark">Continue</Button></Link>
                }
                {this.state.keepGoingBad &&
                  <Link to={'/gotwo'}><Button variant="dark">Continue</Button></Link>
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

}

export default NearOffice
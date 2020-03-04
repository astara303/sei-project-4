import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import NearOffice from './NearOffice'

class RoadWorks extends React.Component {
  state = {
    shortcutGood: false,
    shortcutBad: false,
    detourGood: false,
    detourBad: false,
    goodScore: 1,
    badScore: 0,
    clicked: false,
    goodText: 'Success! The path you chose didn\'t save you any time, but you didn\'t lose any either.',
    detourBadText: 'You wait for your turn to push in between everyone, and make your way down the road. With one eye on your gaps, you see that you passed your turn long ago but there is nowhere to escape this fencing! You continue along the detour until finally you arrive on the other side of the roadworks. You cross the street and are not sure how long it will take you to back-track. Eventually you near the offices, but not without breaking a sweat first.',
    shortcutBadText: 'You escape the throng of people making their way through the detour and head off along your shortcut. You arrive at a building that looks very... building-y, considering your phone is telling you that a road passes through here. Unsure if you missed a tunnel somewhere, you check your surroundings for any clue. You\'re losing time and there\'s no way to access this shortcut that you can see so you head back to the roadworks and take the detour, but not without breaking a sweat first.'
  }

  /* 
  shortcut:
  one good option (shortcut gets you there when you planned)
  one bad option (shortcut says there's a way through when there isn't. Must backtrack and lose time.)

  detour:
  one good option (same as shortcut good?)
  one bad option (same as shortcut bad?)
*/

  handleChoice = (e) => {
    if (e.target.textContent === 'Take the shortcut.') {
      const luck = Math.random() < 0.5
      if (luck === true) {
        const shortcutGood = true
        const clicked = true
        this.setState({ clicked, shortcutGood })
      } else {
        const shortcutBad = true
        const clicked = true
        this.setState({ clicked, shortcutBad })
      }
    } else {
      const luck = Math.random() < 0.5
      if (luck === true) {
        const detourGood = true
        const clicked = true
        this.setState({ clicked, detourGood })
      } else {
        const detourBad = true
        const clicked = true
        this.setState({ clicked, detourBad })
      }
    }
  }

  //render and pass the first lines of the story to near office
  //do I need to send the other text options through as empty strings when not using them in render?

  render() {
    return (
      <>
      {/* correct background */}
      <header className="masthead roadworks-masthead">
        {!this.state.clicked &&
          <Container>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <Card style={{ width: '36rem' }}>
                  <Card.Body>
                    <Card.Title className="small-title">There are roadworks blocking you from crossing the road.</Card.Title>
                    <br />
                      <Card.Text className="add-margin">There isn't another crossing anywhere in sight. There are signs for a detour, and you can see masses of people trying to squish through the narrow, fenced-in path.</Card.Text>
                      <Card.Text className="add-margin">You check your map on your phone and it suggests what looks like a shortcut...</Card.Text>
                      <Card.Text className="add-margin bold-text">Do you wait your turn to squish through the detour, or try the shortcut?</Card.Text>
                    <Button className="btn btn-light add-margin" onClick={this.handleChoice}>Take the shortcut.</Button>
                    <Button className="btn btn-light add-margin" onClick={this.handleChoice}>Follow the detour signs.</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        }
        <>
          {((this.state.clicked && this.state.shortcutGood) || (this.state.clicked && this.state.detourGood)) &&
            <NearOffice
              choiceText={this.state.goodText}
              score={this.state.goodScore} />
          }
          {(this.state.clicked && this.state.shortcutBad) &&
            <NearOffice
              choiceText={this.state.shortcutBadText}
              score={this.state.badScore} />
          }
          {(this.state.clicked && this.state.detourBad) &&
            <NearOffice
              choiceText={this.state.detourBadText}
              score={this.state.badScore} />
          }
        </>
        </header>
      </>
    )
  }

}

export default RoadWorks
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


class WakeUp extends React.Component {
  state = {
    businesses: [],
    clicked: false
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/businesses/')
      const categoryArray = res.data.filter(business => business.category.includes('outfit'))
      this.setState({ businesses: categoryArray })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //an event handler that knows an option has been clicked. When it has, display the continue button
  //should the user be able to update their answer? I think we would have to: store it in state, and post the answer when they click continue.
  handleClick = () => {
    let clicked = this.state.clicked
    if (clicked === false) {
      clicked = true
    } else {
      return
    }
    this.setState({ clicked })
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: '35rem' }}>
              <Card.Body>
                <Card.Title>Wake up.</Card.Title>
                <Card.Text>
                  <p>Today's the day. It’s the morning of your interview. </p>
                  <p>What time is it? You check the clock. Two minutes until your alarm goes off. </p>
                  <p>You close your eyes and try to relax, but so many thoughts begin banging around inside your skull.</p>
                  <p>Today could change your life.</p>
                  <p>What if you get this job? It’s your dream to work for a company like this.</p>
                  <p>What if you blow it?</p>
                  <p>Will you get along with the interviewer?</p>
                  <p>What if you can’t come up with the right answer? What will you do?</p>
                  <p>Your alarm goes off.</p>
                  <p>You remind yourself how far you’ve come.</p>
                  <p>You remember that you are taking a step towards a career that you are passionate about.</p>
                  <p>You know your developer skills are valuable and you’re excited to show someone what you can do.</p>
                  <p>You’ve got this!</p>
                  <p>After showering, it’s time to grab the outfit you planned the night before:</p>
                </Card.Text>
                <div>
                  {this.state.clicked &&
                    <div>
                      <Link to={'/intown'}><Button variant="outline-dark">You have some breakfast and hit the road.</Button></Link>
                    </div>
                  }
                </div>
                <br />
                  <Row className="justify-content-md-center">
                    {this.state.businesses.map(business => {
                      return <div key={business.name}>
                        <Col md="auto">
                          <button onClick={this.handleClick}><img src={business.image} alt={business.name} height="225" width="225" /></button>
                        </Col>
                      </div>
                    })
                    }
                  </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default WakeUp
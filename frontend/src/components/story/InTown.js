import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class InTown extends React.Component {
  state = {
    businesses: [],
    clicked: false
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/businesses/')
      const categoryArray = res.data.filter(business => business.category.includes('cafe'))
      this.setState({ businesses: categoryArray })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

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
            <Card style={{ width: '60rem' }}>
              <Card.Body>
                <Card.Title className="small-title">Nearly Interview Time.</Card.Title>
                <Card.Text>
                  <p>You journey into town and arrive near to the offices where your interview will be held.</p>
                  <p>You mentally trace over code you’ve written, wondering what they will ask you about.</p>
                  <p>Maybe about that function you wrote that builds a grid?</p>
                  <p>Maybe about that button that animates little hearts when you click it?</p>
                  <p>Recursion?</p>
                  <p>Data types?</p>
                  <p>Recursion?</p>
                  <p>You feel yourself going in circles, so you pop into the nearest cafe to clear your mind.</p>
                  <p><span className="bold-text">What do you choose to drink?</span></p>
                </Card.Text>
                {this.state.clicked &&
                  <div>
                    <Link to={'/roadworks'}><Button className="btn btn-secondary">Feeling a bit perked up, you leave the cafe and continue towards the office.</Button></Link>
                  </div>
                }
                <br />
                <Row className="justify-content-md-center">
                  {this.state.businesses.map(business => {
                    return <div key={business.name}>
                      <Col md="auto">
                        <button className="no-border" onClick={this.handleClick}><img src={business.image} alt={business.name} height="200" width="200" /></button>
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

export default InTown
import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'
import { headers } from '../../lib/headers'

class InTown extends React.Component {
  state = {
    businesses: [],
    id: null,
    clicked: false,
    chosenBusiness: {},
    user: []
  }

  //GETS the data from the businesses model and filters by "cafe"
  //GETS the user data so that we can spread the chosen business into the businesses array in the user model on handleClick and handleSubmit
  async componentDidMount() {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get('/api/businesses')
      const user = await axios.get(`/api/users/${payload}`)
      const categoryArray = res.data.filter(business => business.category.includes('cafe'))
      this.setState({ businesses: categoryArray, user: user.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //saves chosenBusiness into array without saving over the previous choice
  handleClick = (e) => {
    let clicked = this.state.clicked
    const id = e.target.name
    this.setState({ id })
    if (clicked === false) {
      clicked = true
      const chosenBusiness = this.state.businesses[id]
      const user = { ...this.state.user, businesses: [...this.state.user.businesses, chosenBusiness.id] }
      this.setState({ clicked, user })
    } else {
      return
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const payload = Auth.getPayload().sub
    try {
      await axios.patch(`api/users/${payload}/`, { ...this.state.user }, headers(true))
      console.log('here')
      this.props.history.push('/roadworks')
    } catch (err) {
      this.props.history.push('/notfound')
      console.log(err)
    }
  }

  render() {
    const { clicked } = this.state
    console.log(this.state.user)
    return (
      <header className="intown-masthead masthead">
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Card style={{ width: '60rem' }}>
                <Card.Body>
                  <Card.Title className="small-title">Nearly Interview Time.</Card.Title>
                  <Card.Text>You journey into town and arrive near to the offices where your interview will be held.</Card.Text>
                  <Card.Text>You mentally trace over code you’ve written, wondering what they will ask you about.</Card.Text>
                  <Card.Text>Maybe about that function that builds a grid?</Card.Text>
                  <Card.Text>Maybe about that button that animates little hearts when you click it?</Card.Text>
                  <Card.Text className="add-margin">Recursion?</Card.Text>
                  <Card.Text className="add-margin">Data types?</Card.Text>
                  <Card.Text className="add-margin">Recursion?</Card.Text>
                  <Card.Text>You feel yourself going in circles, so you pop into the nearest cafe to clear your mind.</Card.Text>
                  <br />
                  <Card.Text><span className="bold-text">What do you choose to drink?</span></Card.Text>
                  {clicked &&
                    <div>
                      <br />
                      <Button onClick={this.handleSubmit} className="btn btn-light">Feeling a bit perked up, you leave the cafe and continue towards the office.</Button>
                    </div>
                  }
                  <br />
                  <Row className="justify-content-md-center">
                    {this.state.businesses.map((business, i) => {
                      return <div key={business.name}>
                        <Col md="auto">
                          <button className="no-border"
                            value={this.state.id}
                            onClick={this.handleClick}
                          ><img src={business.image} alt={business.name} height="200" width="200" name={i} /></button>
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
      </header>
    )
  }
}

export default InTown
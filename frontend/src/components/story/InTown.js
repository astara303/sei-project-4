import React from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

class InTown extends React.Component {
  state = {
    businesses: [],
    id: null,
    clicked: false,
    chosenBusiness: {},
    user: []
  }

  async componentDidMount() {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get('/api/businesses/')
      const user = await axios.get(`/api/users/${payload}`)
      const categoryArray = res.data.filter(business => business.category.includes('cafe'))
      this.setState({ businesses: categoryArray, user: user.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleClick = (e) => {
    let clicked = this.state.clicked
    // console.log(e.target.name)
    const id = e.target.name
    this.setState({ id })
    if (clicked === false) {
      clicked = true
      const chosenBusiness = this.state.businesses[id]
      const user = { ...this.state.user, businesses: [...this.state.user.businesses, chosenBusiness.id] }
      // console.log(user)
      this.setState({ clicked, user })
      // console.log(this.state.user)
      // console.log(chosenBusiness)
    } else {
      return
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const payload = Auth.getPayload().sub
    try {
      await axios.patch(`api/users/${payload}/`, { ...this.state.user }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/roadworks')
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    console.log(this.state.user)
    // correct background
    return (
      <header className="intown-masthead masthead">
<<<<<<< HEAD
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: '60rem' }}>
              <Card.Body>
                <Card.Title className="small-title">Nearly Interview Time.</Card.Title>
                  <Card.Text>You journey into town, mentally tracing over code you’ve written, wondering what they will ask you about.</Card.Text>
=======
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Card style={{ width: '60rem' }}>
                <Card.Body>
                  <Card.Title className="small-title">Nearly Interview Time.</Card.Title>
                  <Card.Text>You journey into town and arrive near to the offices where your interview will be held.</Card.Text>
                  <Card.Text>You mentally trace over code you’ve written, wondering what they will ask you about.</Card.Text>
>>>>>>> development
                  <Card.Text>Maybe about that function you wrote that builds a grid?</Card.Text>
                  <Card.Text>Maybe about that button that animates little hearts when you click it?</Card.Text>
                  <Card.Text className="add-margin">Recursion?</Card.Text>
                  <Card.Text className="add-margin">Data types?</Card.Text>
                  <Card.Text className="add-margin">Recursion?</Card.Text>
                  <Card.Text>You feel yourself going in circles, so you pop into the nearest cafe to clear your mind.</Card.Text>
                  <br />
                  <Card.Text><span className="bold-text">What do you choose to drink?</span></Card.Text>
                  {this.state.clicked &&
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
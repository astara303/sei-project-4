import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

class Profile extends React.Component {
  state = {
    user: {},
    firstBusiness: {},
    secondBusiness: {}
  }

  componentDidMount = async () => {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get(`/api/users/${payload}/`)
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
    this.getBusinesses()
  }

  getBusinesses = async () => {
    try {
      const firstBusiness = await axios.get(`/api/businesses/${this.state.user.businesses[0]}`)
      const secondBusiness = await axios.get(`/api/businesses/${this.state.user.businesses[1]}`)
      this.setState({ firstBusiness: firstBusiness.data, secondBusiness: secondBusiness.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.user) return null
    if (!this.state.firstBusiness) return null
    if (!this.state.secondBusiness) return null
    console.log('firstBusiness', this.state.firstBusiness)
    console.log('businesses', Boolean(this.state.user.businesses))
    // console.log('secondBusiness', this.state.secondBusiness)
    const { user } = this.state
    const payload = Auth.getPayload().sub
    return (

      <Container className="">
        <Row className="add-margin-more">
          <Col>
            <h1 className="small-title">Welcome to your profile {user.username}</h1>
          </Col>
        </Row>

        <Row className="">
          <Col>
            <img className="profile-image" src={user.profile_image} alt={user.first_name} />
          </Col>
          <Col className="">
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Location: {user.location}</p>
            <p>Website: <a href={user.website} target="_blank">{user.website}</a></p>
            <p>{user.looking_for_work ? 'User is looking for work!' : 'User not currently looking for work'}</p>
            <Link to={`/profile/${payload}/edit`}><Button className="btn btn-light">Edit profile</Button></Link>
          </Col>
        </Row>

          {/* {this.state.firstBusiness && */}
          {/* <> */}
        <h1 className="small-title">Chosen Businesses:</h1>

        <Row className="justify-content-md-center">
            <>
            <Col md="auto">
              <Card style={{ width: '18rem' }}>
                <Card.Img className="business-image" variant="toptop" src={this.state.firstBusiness.image} alt={this.state.firstBusiness.name} />
                <Card.Body>
                  <Card.Title>{this.state.firstBusiness.name}</Card.Title>
                  <Card.Text>{this.state.firstBusiness.category}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          

            <Col md="auto">
              <Card style={{ width: '18rem' }}>
                <Card.Img className="business-image" variant="toptop" src={this.state.secondBusiness.image} alt={this.state.secondBusiness.name} />
                <Card.Body>
                  <Card.Title>{this.state.secondBusiness.name}</Card.Title>
                  <Card.Text>{this.state.secondBusiness.category}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            </>
        </Row>
        {/* </> */}
          {/* } */}

      </Container>


      // <div>{this.state.firstBusiness.name}</div>
      // <div>{this.state.secondBusiness.name}</div>

    )
  }

}

export default Profile

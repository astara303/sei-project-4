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
    user: [],
    firstBusiness: '',
    secondBusiness: ''
  }

  //we call the getBusinesses function only if they have chosen both their outfit and cafe from the story
  componentDidMount = async () => {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get(`/api/users/${payload}`)
      this.setState({ user: res.data })
      if (res.data.businesses.length === 2) {
        return this.getBusinesses()
      } else {
        return
      }
    } catch (err) {
      // this.props.history.push('/notfound')
      console.log(err)
    }
  }

  //the user will only ever have 2 businesses attached to their model, so we call them here
  getBusinesses = async () => {
    try {
      const firstBusiness = await axios.get(`/api/businesses/${this.state.user.businesses[0]}`)
      const secondBusiness = await axios.get(`/api/businesses/${this.state.user.businesses[1]}`)
      this.setState({ firstBusiness: firstBusiness.data, secondBusiness: secondBusiness.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    if (!this.state.user) return null
    const { user } = this.state
    const { firstBusiness } = this.state
    const { secondBusiness } = this.state
    const payload = Auth.getPayload().sub
    return (
      <Container>
        <Row className="add-margin-more">
          <Col>
            <h1 className="small-title">Welcome to your profile {user.username}</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <img className="profile-image" src={user.profile_image} alt={user.first_name} />
          </Col>
          <Col className="justify-content-md-center">
            <p className="add-margin">Name: {user.first_name} {user.last_name}</p>
            <p className="add-margin">Location: {user.location}</p>
            <p className="add-margin">Website: <a href={user.website} target="_blank">{user.website}</a></p>
            <p className="add-margin">{user.looking_for_work ? 'User is looking for work!' : 'User not currently looking for work'}</p>
            <Link to={`/profile/${payload}/edit`}><Button className="btn btn-light add-margin">Edit profile</Button></Link>
          </Col>
        </Row>
        <hr />
          {(firstBusiness && secondBusiness) &&
          <>
        <h1 className="small-title">Your favourite businesses from the story-</h1>
        <h1 className="small-title">be sure to give them a visit!</h1>
        <br />
        <Row className="justify-content-md-center">
            <Col md="auto">
              <Card style={{ width: '18rem' }}>
                <Card.Img className="business-image" variant="toptop" src={firstBusiness.image} alt={firstBusiness.name} />
                <Card.Body>
                  <Card.Title>{firstBusiness.name}</Card.Title>
                  <Card.Text>{firstBusiness.category}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md="auto">
              <Card style={{ width: '18rem' }}>
                <Card.Img className="business-image" variant="toptop" src={secondBusiness.image} alt={secondBusiness.name} />
                <Card.Body>
                  <Card.Title>{secondBusiness.name}</Card.Title>
                  <Card.Text>{secondBusiness.category}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
        </Row>
        </>
        }
      </Container>
    )
  }

}

export default Profile

import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class UserShow extends React.Component {
  state = {
    user: [],
    firstBusiness: '',
    secondBusiness: ''
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/users/${userId}/`)
      this.setState({ user: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
    this.getBusinesses()
  }

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
    // console.log('id', this.props.match.params.id)
    // console.log(this.state.user.looking_for_work)
    const { user } = this.state
    if (!user.businesses) return null
    console.log('businesses', this.state.user.businesses)
    return (
      <Container className="test-border">
        <Row className="add-margin-more">
          <Col>
            <h1 className="small-title">{user.username}</h1>
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Location: {user.location}</p>
            <p>Website: <a href={user.website} target="_blank">{user.website}</a></p>
            <p>{user.looking_for_work ? 'User is looking for work!' : 'User not currently looking for work'}</p>
          </Col>

          <Col xs={5}>
            <img className="profile-image" src={user.profile_image} alt={user.first_name} />
          </Col>
        </Row>
      {this.state.firstBusiness &&
        <>
        <h1 className="small-title">{user.username}'s favourite local businesses:</h1>
        <Row className="justify-content-md-center test-border">

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
        </Row>
        </>
      }
      </Container>
    )
  }

}

export default UserShow
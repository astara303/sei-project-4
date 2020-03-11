import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class UserShow extends React.Component {
  state = {
    user: [],
    firstBusiness: '',
    secondBusiness: ''
  }

  //we call the getBusinesses function only if they have chosen both their outfit and cafe from the story
  async componentDidMount() {
    const userId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/users/${userId}/`)
      this.setState({ user: res.data })
      if (res.data.businesses.length === 2) {
        return this.getBusinesses()
      } else {
        return
      }
    } catch (err) {
      this.props.history.push('/notfound')
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
    const { user } = this.state
    const { firstBusiness } = this.state
    const { secondBusiness } = this.state
    if (!user.businesses) return null
    return (
      <Container className="">
        <Row className="add-margin-more">
          <Col className="">
            <h1 className="small-title">{user.username}</h1>
            <p className="add-margin">Name: {user.first_name} {user.last_name}</p>
            <p className="add-margin">Location: {user.location}</p>
            <p className="add-margin">Website: <a href={user.website} target="_blank">{user.website}</a></p>
            <p>{user.looking_for_work ? 'User is looking for work!' : 'User not currently looking for work'}</p>
          </Col>

          <Col xs={5}>
            <img className="profile-image" src={user.profile_image} alt={user.first_name} />
          </Col>
        </Row>
        <hr />
        {(firstBusiness && secondBusiness) &&
          <>
            <h1 className="small-title">{user.username}'s favourite local businesses:</h1>
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

export default UserShow
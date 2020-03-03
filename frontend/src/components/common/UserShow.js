import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class UserShow extends React.Component {
  state = {
    user: []
    // firstBusiness: {},
    // secondBusiness: {}
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/users/${userId}/`)
      this.setState({ user: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  render() {
    // console.log('id', this.props.match.params.id)
    // console.log(this.state.user.looking_for_work)
    const { user } = this.state
    if (!user.businesses) return null
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

        <h1 className="small-title">Chosen Businesses:</h1>
        <Row className="justify-content-md-center">
          {user.businesses.map(business =>
            <div key={business.name}>
              <Col md="auto">
                <Card style={{ width: '18rem' }}>
                  <Card.Img className="business-image" variant="toptop" src={business.image} alt={business.name} />
                  <Card.Body>
                    <Card.Title>{business.name}</Card.Title>
                    <Card.Text>{business.category}</Card.Text>

                  </Card.Body>
                </Card>
              </Col>
            </div>
          )}
        </Row>
      </Container>


    )
  }

}

export default UserShow
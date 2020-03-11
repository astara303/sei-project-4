import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

import Auth from '../../lib/auth'

//when clicked, links to the user show page
const UserCard = ({ username, id, profile_image, location, payload }) => (
  <div key={id}>
    {console.log('payload is', payload)}
    <Col md="auto">
      <Card style={{ width: '18rem' }}>
        <Link to={(Auth.getPayload().sub === id) ? `/profile/${payload}` : `/interviewers/${id}/`}>
          <Card.Img className="profile-image" variant="top" src={profile_image} />
        </Link>
        <Card.Body>
          <Card.Title>{username}</Card.Title>
          <Card.Text>
            {location}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  </div>
)


export default UserCard
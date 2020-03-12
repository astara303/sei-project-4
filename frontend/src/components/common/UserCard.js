import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

import Auth from '../../lib/auth'

//when clicked, links to the user show page
// here we are creating a user card to display the some of the info for each registered user. This component is exported and used in the userIndex component to make it easier to map through each user and repeat the card formatting for each one. The link attached to the card image has a ternary operator to check if the current user has the same id as the id of the image that was just clicked. If so, the user will be taken to their own editable profile, if not they will be taken to the generic user show page with no editing capability. 
const UserCard = ({ username, id, profile_image, location, payload }) => (
  <div key={id}>
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
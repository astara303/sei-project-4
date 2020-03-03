import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'


const UserCard = ({ username, id, first_name, profile_image, location }) => (
  <div key={id}>
  <Col md="auto">
    <Link to={`/interviewers/${id}/`}>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={profile_image} />
      <Card.Body>
      <Card.Title>{username}</Card.Title>
      <Card.Text>
        {first_name} - {location}
      </Card.Text>
    </Card.Body>
    </Card>
    </Link>
    </Col>
  </div>
)

{/* <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card> */}

export default UserCard
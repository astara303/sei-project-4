import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const UserForm = ({ data, handleChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group>

        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={data.username}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
          placeholder="First Name"
          name="first_name"
          onChange={handleChange}
          value={data.first_name}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Second Name</Form.Label>
        <Form.Control
          placeholder="Second Name"
          name="second_name"
          onChange={handleChange}
          value={data.last_name}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          placeholder="Location"
          name="location"
          onChange={handleChange}
          value={data.location}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Website</Form.Label>
        <Form.Control
          placeholder="Website"
          name="website"
          onChange={handleChange}
          value={data.website}
        />
      </Form.Group>

      {/* <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password Confirmation"
          name="password_confirmation"
          onChange={handleChange}
          value={data.password_confirmation}
        />
      </Form.Group> */}

      <Form.Group>
        <Form.Check
          type="checkbox"
          label="Looking for work?"
          name="looking_for_work"
          onChange={handleChange}
          value={data.looking_for_work}
          checked={data.looking_for_work}
        />
      </Form.Group>
      
      <Button variant="outline-dark" type="submit">Update</Button>
    
    </Form>
      )
    }
    
export default UserForm
import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({ username, id }) => (
  <div key={id}>
    <Link to={`/interviewers/${id}/`}>
      <p>{username}</p>
    </Link>
  </div >
)

export default UserCard
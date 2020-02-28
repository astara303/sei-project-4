import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

//show register prompt if not regsitered/logged in
//show 'begin your story' button if you are > look at quiz homepage 

const Home = () => (
    <div>
      <h1 className="title">Let's Interview</h1>
      {!Auth.isAuthenticated() &&
        <h2 className="sub">Please register or login to play</h2>
      }
      {Auth.isAuthenticated() &&
      <Link to={'/wakeup'}>
        <Button variant="secondary" size="lg">START YOUR STORY</Button>
      </Link>
      }
    </div>
)

export default Home
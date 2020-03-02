import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

//show register prompt if not regsitered/logged in
//show 'begin your story' button if you are > look at quiz homepage 

const Home = () => (
    <header className="homepage-masthead masthead">
      <div className="h-100 row align-items-center">
      <div className="col">
        <h1 className="main-title">Let's Interview!</h1>

      {!Auth.isAuthenticated() &&
        // <h2 className="sub">Please register or login to play</h2>
        <Link to={'/login'}>
        <Button variant="secondary" className="btn btn-secondary" size="lg">Register or login to play</Button>
      </Link>
      }
      {Auth.isAuthenticated() &&
      <Link to={'/wakeup'}>
        <Button variant="secondary" className="btn btn-secondary" size="lg">Start your story</Button>
      </Link>
      }

      </div>
      </div>
    </header>
)

export default Home
import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'

//displays register or login prompts if not logged in
//show 'begin your story' button if you are logged in

const Home = () => (
  <header className="homepage-masthead masthead">
    <div className="h-100 row align-items-center">
      <div className="col">
        <h1 className="main-title">Let's Interview!</h1>
        {!Auth.isAuthenticated() &&
          <>
            <Link to={'/register'}>
              <Button className="btn btn-light add-margin" size="lg">Register or</Button>
            </Link>
            <Link to={'/login'}>
              <Button className="btn btn-light add-margin" size="lg">login to play</Button>
            </Link>
          </>
        }
        {Auth.isAuthenticated() &&
          <Link to={'/wakeup'}>
            <Button className="btn btn-light" size="lg">Start your story</Button>
          </Link>
        }
      </div>
    </div>
  </header>
)

export default Home
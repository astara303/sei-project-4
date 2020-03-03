import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Auth from '../../lib/auth'


class WakeUp extends React.Component {
  state = {
    businesses: [],
    id: null,
    clicked: false,
    chosenBusiness: {},
    user: []
  }

  async componentDidMount() {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get('/api/businesses/')
      const user = await axios.get(`/api/users/${payload}`)
      const categoryArray = res.data.filter(business => business.category.includes('outfit'))
      this.setState({ businesses: categoryArray, user: user.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  //send the business data attached to each button to state
  //



  handleClick = (e) => {
    let clicked = this.state.clicked
    // console.log(e.target.name)
    const id = e.target.name
    this.setState({ id })
    if (clicked === false) {
      clicked = true
      const chosenBusiness = this.state.businesses[id]
      const user = { ...this.state.user, businesses: [chosenBusiness.id]}
      console.log(user)
      this.setState({ clicked, user })
      // console.log(this.state.user)
      // console.log(chosenBusiness)
    } else {
      return
    }
  }
  // this.state.user.email, this.state.user.username,

  handleSubmit = async (e) => {
    e.preventDefault()
    const payload = Auth.getPayload().sub
    try {
      await axios.patch(`api/users/${payload}/`, {...this.state.user}, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      // this.props.history.push('/intown')
    } catch (err) {
      console.log(err)
      // this.props.history.push('/intown')
    }
  }

  render() {
    if (!this.state.user) return null
    // console.log(this.state.user)
    return (
      <header className="wakeup-masthead masthead">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ width: '60rem' }}>
              <Card.Body>
                <Card.Title className="small-title">Wake up.</Card.Title>
                <Card.Text>
                  Today's the day. It’s the morning of your interview. 
                  What time is it? You check the clock. Two minutes until your alarm goes off. 
                  You close your eyes and try to relax, but so many thoughts begin banging around inside your skull.
                  Today could change your life.
                  What if you get this job? It’s your dream to work for a company like this.
                  What if you blow it?
                  Will you get along with the interviewer?
                  What if you can’t come up with the right answer? What will you do?
                  Your alarm goes off.
                  You remind yourself how far you’ve come.
                  You remember that you are taking a step towards a career that you are passionate about.
                  You know your developer skills are valuable and you’re excited to show someone what you can do.
                  You’ve got this!
                <br />
                  After showering, it’s time to <span className="bold-text">grab the outfit you planned the night before:</span>
                  {this.state.clicked &&
                    <div>
                      <Button onClick={this.handleSubmit} className="btn btn-light">You have some breakfast and hit the road.</Button>
                    </div>
                  }
                  <br />
                </Card.Text>
                  <Row className="justify-content-md-center">
                    {this.state.businesses.map((business, i) => {
                      return <div key={business.name}>
                        <Col md="auto">
                          <button className="no-border"
                          
                          value={this.state.id}
                            onClick={this.handleClick}>
                              <img src={business.image} alt={business.name} height="200" width="200" name={i}/>
                          </button>
                        </Col>
                      </div>
                    })}
                  </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </header>
    )
  }
}

export default WakeUp
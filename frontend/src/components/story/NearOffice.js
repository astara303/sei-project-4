import React from 'react'
import { Link } from 'react-router-dom'

class NearOffice extends React.Component {
  state = {
    helpGood: false,
    helpBad: false,
    keepGoingGood: false,
    keepGoingBad: false
  }

  /* 
  stop and help:
  one good option (interviewer recognises you, +1 starting score)
  one bad option (you are late)

  keep going:
  one good option (you are on time, +1 starting score)
  one bad option (interviewer recognises that you didnt help)

  mathrandom: Math.random() < 0.5

  for the event:
    if (e.target.textcontent = 'Stop and help.') {
      use math-random to pick true or false. assign this to variable.
      if (variable === true) {
        const helpGood = true
        setState helpgood
      } else {
        const helpBad = true
        setstate helpbad
      }
    } else {
      use math-random to pick true or false. assign this to variable.
      if (variable === true) {
        const keepGoingGood = true
        setState keepGoingGood
      } else {
        const keepGoingBad = true
        setState keepGoingBad
      }
    }
    
  */

  handleChoice = (e) => {
    if (e.target.textContent === 'Stop and help collect the papers.') {
      const luck = Math.random() < 0.5
      if (luck === true) {
        const helpGood = true
        this.setState({ helpGood })
      } else {
        const helpBad = true
        this.setState ({ helpBad })
      }
    } else {
      const luck = Math.random() < 0.5
      if (luck === true) {
        const keepGoingGood = true
        this.setState({ keepGoingGood })
      } else {
        const keepGoingBad = true
        this.setState({ keepGoingBad })
      }
    }
  }


  render() {
    console.log(this.state)
    return (
      <div>
        <h1 className="title">Time to make a choice.</h1>
        <p>As you turn a corner, you see someone drop a stack of papers that all blow off in different directions.</p>
        <p>Your cafe detour has left you no time to hang about before you need to check in at reception for the interview.</p> 
        <p>What do you do?</p>
          <button onClick={this.handleChoice}>Stop and help collect the papers.</button>
          <button onClick={this.handleChoice}>Keep going- you can't be late.</button>
          <br/>
          {this.state.helpGood &&
          <Link to={'/helpone'}><button>Continue</button></Link>
          }
          {this.state.helpBad &&
          <Link to={'/helptwo'}><button>Continue</button></Link>
          }
          {this.state.keepGoingGood &&
          <Link to={'/goone'}><button>Continue</button></Link>
          }
          {this.state.keepGoingBad &&
          <Link to={'/gotwo'}><button>Continue</button></Link>
          }
      </div>
    )
  }

}

export default NearOffice
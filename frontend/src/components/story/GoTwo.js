import React from 'react'

import Interview from './Interview'

class GoTwo extends React.Component {
  state = {
    score: 0,
    interview: false
  }

  handleClick = () => {
    let interview = this.state.interview
    if (interview === false) {
      interview = true
    } else {
      return
    }
    this.setState({ interview })
  }

  render() {
    console.log(this.state.score)
    return (
      <>
        {!this.state.interview &&
        <div>
          <h1 className="title">This is the page for a negative result for being on time.</h1>
          <button onClick={this.handleClick}>Continue</button>
        </div>
        }
        {this.state.interview &&
        <Interview score={this.state.score} />
        }
      </>
    )
  }
}

export default GoTwo
import React from 'react'

class InterviewUnsuccessful extends React.Component {
  state = {
    score: this.props.score
  }

  render() {
    return (
      <div>
        <h1>Your interview was unsuccessful...</h1>
      </div>
    )
  }

}

export default InterviewUnsuccessful
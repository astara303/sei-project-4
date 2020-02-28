import React from 'react'

class InterviewSuccessful extends React.Component {
  state = {
    score: this.props.score
  }

  render() {
    return (
      <div>
        <h1>Your interview was successful!</h1>
      </div>
    )
  }

}

export default InterviewSuccessful
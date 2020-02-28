import React from 'react'
import { Link } from 'react-router-dom'

class WakeUp extends React.Component {
  state = {
    data: [
      {
        name: 'Highstreet Store',
        image: 'https://i.pinimg.com/originals/37/75/00/377500c6209c2d2def7a70ed013718b0.jpg',
        category: 'outfit',
        longitude: 1,
        latitude: 2
      },
      {
        name: 'Trendy Store',
        image: 'https://i.pinimg.com/originals/92/77/36/927736fed34aa73eda4e306944fafbe9.jpg',
        category: 'outfit',
        longitude: 1,
        latitude: 2
      },
      {
        name: 'Vintage Store',
        image: 'https://i.pinimg.com/474x/66/c9/35/66c9353cabd612b7418a33c6ed794e1e--fall-flats-flat-lay.jpg',
        category: 'outfit',
        longitude: 1,
        latitude: 2
      },
      {
        name: 'Expensive Store',
        image: 'https://i.pinimg.com/originals/d2/e0/fd/d2e0fdfdfd77c30059584ab3337dfffb.png',
        category: 'outfit',
        longitude: 1,
        latitude: 2
      }
    ],
    clicked: false
  }

  //an event handler that knows an option has been clicked. When it has, display the continue button
  //should the user be able to update their answer? I think we would have to: store it in state, and post the answer when they click continue.
  //Instead of state holding true/false, it will hold the business model object. Would need to connect that to each button
  handleClick = () => {
    let clicked = this.state.clicked
    if (clicked === false) {
      clicked = true
    } else {
      return
    }
    this.setState({ clicked })
  }

  //should the ad "button" be a clickable card?

  render() {
    return (
      <div>
        <h1 className="title">Wake up.</h1>
        <p>Today's the day. It’s the morning of your interview. </p>
        <p>What time is it? You check the clock. Two minutes until your alarm goes off. </p>
        <p>You close your eyes and try to relax, but so many thoughts begin banging around inside your skull.</p>
        <p>Today could change your life.</p>
        <p>What if you get this job? It’s your dream to work for a company like this.</p>
        <p>What if you blow it?</p>
        <p>Will you get along with the interviewer?</p>
        <p>What if you can’t come up with the right answer? What will you do?</p>
        <p>Your alarm goes off.</p>
        <p>You remind yourself how far you’ve come.</p>
        <p>You remember that you are taking a step towards a career that you are passionate about.</p>
        <p>You know your developer skills are valuable and you’re excited to show someone what you can do.</p>
        <p>You’ve got this!</p>
        <p>After showering, it’s time to grab the outfit you planned the night before:</p>
        <br/>
        <p> -Outfits need to be androgynous flat lays-</p>
        <p> -Images go here. Images come from get request on business model category:outfits-</p>
        <p> -When clicked, send a post request to user model to save their chosen 'business'-</p>
        <div>
        {this.state.clicked &&
        <div>
          <Link to={'/intown'}><button>You have some breakfast and hit the road.</button></Link>
        </div>
        }
          <button onClick={this.handleClick}><img src={this.state.data[0].image} alt={this.state.data.name} height="225" width="225"/></button>
          <button onClick={this.handleClick}><img src={this.state.data[1].image} alt={this.state.data.name} height="225" width="225"/></button>
          <button onClick={this.handleClick}><img src={this.state.data[2].image} alt={this.state.data.name} height="225" width="225"/></button>
          <button onClick={this.handleClick}><img src={this.state.data[3].image} alt={this.state.data.name} height="225" width="225"/></button>
        </div>
      </div>
    )
  }
}

export default WakeUp
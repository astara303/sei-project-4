import React from 'react'
import { Link } from 'react-router-dom'

class InTown extends React.Component {
  state = {
    data: [
      {
        name: 'Latte Cafe',
        image: 'https://i.pinimg.com/originals/a5/0d/4c/a50d4c817784923f72dcc6b5877ddcb0.jpg',
        category: 'cafe',
        longitude: 1,
        latitude: 2
      },
      {
        name: 'Hot Chocolate Cafe',
        image: 'https://bloximages.chicago2.vip.townnews.com/heraldextra.com/content/tncms/assets/v3/editorial/6/0a/60adc1dc-72fd-569b-bf3b-30c479631a14/5df458a30b513.image.jpg?crop=1175%2C1175%2C294%2C0&resize=1200%2C1200&order=crop%2Cresize',
        category: 'cafe',
        longitude: 1,
        latitude: 2
      },
      {
        name: 'Iced Coffee Cafe',
        image: 'https://i.pinimg.com/originals/01/f5/42/01f542a3e0363e1f25920417ce725224.jpg',
        category: 'cafe',
        longitude: 1,
        latitude: 2
      },
      {
        name: 'Peppermint Tea Cafe',
        image: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2018/05/peppermint.jpg?itok=b61FqQqy',
        category: 'cafe',
        longitude: 1,
        latitude: 2
      }
    ],
    clicked: false
  }

  handleClick = () => {
    let clicked = this.state.clicked
    if (clicked === false) {
      clicked = true
    } else {
      return
    }
    this.setState({ clicked })
  }

  render() {
    return (
      <div>
        <h1 className="title">Nearly Interview Time.</h1>
        <p>You journey into town and arrive near to the offices where your interview will be held.</p>
        <p>You mentally trace over code you’ve written, wondering what they will ask you about.</p>
        <p>Maybe about that function you wrote that builds a grid?</p>
        <p>Maybe about that button that animates little hearts when you click it?</p>
        <p>Recursion?</p>
        <p>Data types?</p>
        <p>Recursion?</p>
        <p>You feel yourself going in circles, so you pop into the nearest cafe to clear your mind.</p>
        <p>What do you choose to drink?</p>
        <br/>
        <p>-From get request to business model category:outfits-</p>
        {this.state.clicked &&
        <div>
          <Link to={'/nearoffice'}><button>Feeling a bit perked up, you leave the cafe and continue towards the office.</button></Link>
        </div>
        }
        <div>
          <button onClick={this.handleClick}><img src={this.state.data[0].image} alt={this.state.data.name} height="202" width="202"/></button>
          <button onClick={this.handleClick}><img src={this.state.data[1].image} alt={this.state.data.name} height="200" width="200"/></button>
          <button onClick={this.handleClick}><img src={this.state.data[2].image} alt={this.state.data.name} height="200" width="200"/></button>
          <button onClick={this.handleClick}><img src={this.state.data[3].image} alt={this.state.data.name} height="220" width="220"/></button>
        </div>
      </div>
    )
  }
}

export default InTown
import React from 'react'
import axios from 'axios'

class ImageUpload extends React.Component {
  state = {
    image: null
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData()
    data.append('file', files[0]) // here we are creating a key/value pair called data and saving the chosen file from the users computer to it along with the Cloudinary upload preset
    data.append('upload_preset', 'j7lqzji3')
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_USER_KEY}/image/upload`, data) // we then post this information to our Cloadinary account using our key stored in the .env file
    this.setState({ image: res.data.url }, () => { // we then set state using the new url of the uploaded image which is now stored on our Cloudinary account
      this.props.handleChangeImage({ target: { name: this.props.fieldName, value: res.data.url } }) // we call the handleChange function ourselves once all the above stuff is finished and this shoots off a flare to say DONE! then passes the new image data to the form  
    })
  }

  render() {
    const labelClass = this.props.labelClass ? this.props.labelClassName : 'default_class'
    const { image } = this.state
    return (
      <>
        {image ? // if there is an image show that image - if not show the file uploader!
          <div>
            <img className="profile-image" src={image} />
          </div>
          :
          <>
            <label className={labelClass}>{this.props.labelText}</label>
            <input
              type="file"
              onChange={this.handleUpload}
            />
          </>
        }
      </>
    )
  }
}

export default ImageUpload
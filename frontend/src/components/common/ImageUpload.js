import React from 'react'
import axios from 'axios'
// const cloudinaryUserKey = process.env.CLOUDINARY_USER_KEY

class ImageUpload extends React.Component {
  state = {
    image: null
  }

  handleUpload = async ({ target: { files } }) => {
    console.log(process.env.REACT_APP_CLOUDINARY_USER_KEY)
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'j7lqzji3')
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_USER_KEY}/image/upload`, data)
    // console.log(res)
    this.setState({ image: res.data.url }, () => {
      this.props.handleChangeImage({ target: { name: this.props.fieldName, value: res.data.url } }) // we call the handleChange function ourselves once all the above stuff is finished and this shoots off a flare to say DONE! then passes 
    })
  }

  render() {
    console.log(this.state)
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
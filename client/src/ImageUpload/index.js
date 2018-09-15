// dependencies
import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

// styling
import './image-upload.css'

// constants
const CLOUDINARY_UPLOAD_PRESET = 'dslmnmml';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dt8cqvn3h/upload';

// component definiton 
class ImageUpload extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      uploadedFileUrl: ''
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileUrl: response.body.secure_url
        });
      }
    });
  }

  render() {
    return(
      <Fragment>
        <div className="fileUploadWrapper">
          <div className="fileUpload">
            <Dropzone 
              className="dropzone"
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
                <p>Drop an image or click to upload.</p>
            </Dropzone>
          </div>
        </div>
        <div>
        {
          this.state.uploadedFileUrl === '' ? null :
          <div className="uploadedImage">
            <img src={this.state.uploadedFileUrl} />
            <p>{this.state.uploadedFile.name}</p>
          </div>
        }
        </div>
      </Fragment>
    )
  }
}

// export component
export default ImageUpload; 
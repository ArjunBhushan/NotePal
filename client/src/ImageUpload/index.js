// dependencies
import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import ResponseText from '../ResponseText'

// styling
import './image-upload.css'

// constants
const UPLOAD_URL = 'https://notepal-api.herokuapp.com/analyzePicture';

// component definiton 
class ImageUpload extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      uploadedFile: {
        name: ''
      }
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(UPLOAD_URL)
                .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body !== '') {
        this.setState({
          text: response.body.fullText
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
        <ResponseText name={this.state.uploadedFile.name} text={this.state.text}/>
      </Fragment>
    )
  }
}

// export component
export default ImageUpload; 
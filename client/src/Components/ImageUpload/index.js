// dependencies
import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import ResponseText from '../ResponseText';

// styling
import './image-upload.css'
import { CircularProgress } from '@material-ui/core';

// constants
const UPLOAD_URL = 'https://notepal-api.herokuapp.com/analyzePicture';

// component definiton
class ImageUpload extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: null,
      uploadedFile: {
        name: '',
        loading: false
      }
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
      loading: true
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    if (!file) {
      return this.setState({
        loading:false
      });
    }
    let upload = request.post(UPLOAD_URL)
                .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body !== '') {
        this.setState({
          text: response.body.fullText,
          loading: false
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
            {this.state.loading ? <CircularProgress /> : <div />}
          </div>
        </div>

        {this.state.text === null ? null : <ResponseText name={this.state.uploadedFile.name} text={this.state.text}/>}
      </Fragment>
    )
  }
}

// export component
export default ImageUpload;

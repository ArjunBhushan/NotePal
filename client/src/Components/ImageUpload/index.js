// dependencies
import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import ResponseText from '../ResponseText';
import axios from 'axios';
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
      },
      loading: false,
      error: false
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
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!file) {
      return this.setState({
        loading:false
      });
    }

    let upload = request.post(UPLOAD_URL)
                .field('file', file)

    upload.end((err, response) => {
      if (err) {
        return this.setState({error: true})
      }
      if (response.body) {
        axios({
          method: 'post',
          url: `https://notepal-216511.firebaseio.com/notes.json?auth=${token}`,
          data: {
            image: response.body.filePath,
            text: response.body.fullText,
            userId
          }
        })
          .then(() => {
            console.log(response.body)
            this.setState({
              text: response.body.fullText,
              loading: false,
              error: false
            });
          })
          .catch((err) => {
            this.setState({error: true})
          });
      }
    });
  }

  render() {
    console.log(this.state.text)
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
            {this.state.error ? <p style = {{color: 'red'}}>An error occurred while uploading that file.</p> : null}
            {this.state.loading ? <CircularProgress /> : <div />}
          </div>
        </div>
        {this.state.text ? <ResponseText name={this.state.uploadedFile.name} text={this.state.text}/> : null}
      </Fragment>
    )
  }
}

// export component
export default ImageUpload;

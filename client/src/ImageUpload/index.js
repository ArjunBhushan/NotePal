// dependencies
import React, { Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';

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
      copied: false
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

      if (response.body.secure_url !== '') {
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
        <div>
        {
          this.state.text === '' ? null :
          <div className="result" onClick={this.select}>
            <p>Your file {this.state.uploadedFile.name} has been converted to text:</p>
            <p className="convertedText" >{this.state.text}</p>
            <CopyToClipboard text={this.state.text}
              onCopy={() => this.setState({copied: true})}>
               <IconButton aria-label="Copy to clipboard">
                <Tooltip title="Copy to clipboard" placement="right">
                  <AssignmentIcon />
                </Tooltip>
              </IconButton>
            </CopyToClipboard>
            <p style={{marginTop: '0'}}>{this.state.copied ? "Copied to clipboard!" : ""}</p>
          </div>
        }
        </div>
      </Fragment>
    )
  }
}

// export component
export default ImageUpload; 
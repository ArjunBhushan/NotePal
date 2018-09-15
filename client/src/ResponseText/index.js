// dependencies
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Done';
import TranslateIcon from '@material-ui/icons/Translate';
import SubjectIcon from '@material-ui/icons/Subject';

// styling
import './response-text.css'

// component definiton 
class ResponseText extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  render() {
    return (
      this.props.text === '' ? null :
      <div className="result" onClick={this.select}>
        <Grid item xs={12}>
          <p>Your file <b>{this.props.name}</b> has been converted to text:</p>
        </Grid>

        <Grid container direction="row">
          <Grid item xs={1} direction="column" className="optionButtons">
            <Tooltip title="Translate" placement="left">
              <Button style={{marginTop: 5, marginBottom: 5, marginRight: 1000, height: 40, width: 40, backgroundColor: '#484848'}} variant="fab" color="primary" aria-label="Edit">
                <TranslateIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Spell Check" placement="left">
              <Button style={{marginTop: 5, marginBottom: 5, marginRight: 1000, height: 40, width: 40, backgroundColor: '#484848'}} variant="fab" color="primary" aria-label="Edit">
              <CheckIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Summarize" placement="left">
              <Button style={{marginTop: 5, marginBottom: 5, marginRight: 1000, height: 40, width: 40, backgroundColor: '#484848'}} variant="fab" color="primary" aria-label="Edit">
                <SubjectIcon />
              </Button>
            </Tooltip>
          </Grid>
          
          <Grid item xs={10} direction="column">
            <textarea className="convertedText" >{this.props.text}</textarea>
          </Grid>   
        </Grid>
        <Grid container direction="row">
          <Grid item xs={12} direction="column">
            <CopyToClipboard text={this.props.text}
              onCopy={() => this.setState({copied: true})}>
              <IconButton aria-label="Copy to clipboard">
                <Tooltip title="Copy to clipboard" placement="right">
                  <AssignmentIcon />
                </Tooltip>
              </IconButton>
            </CopyToClipboard>
            <p className="copyButton">{this.state.copied ? "Copied to clipboard!" : ""}</p>
          </Grid>
        </Grid>
        
      </div>
    )
  }
}

// export component
export default ResponseText; 
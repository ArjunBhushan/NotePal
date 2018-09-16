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
import axios from 'axios';

// styling
import './response-text.css'

// constants
const TRANSLATE_URL = 'https://notepal-api.herokuapp.com/translate';
const SPELL_CHECK_URL = 'https://notepal-api.herokuapp.com/spellcheck';
const SUMMARIZE_URL = 'https://notepal-api.herokuapp.com/summarize';

// component definiton
class ResponseText extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      copied: false,
      isEnglish: true
    };

  }

  componentDidMount() {
    this.setState({
      text: this.props.text
    });
  }

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  handleTranslate() {
    let lang = 'en'
    if (this.state.isEnglish) {
      lang = 'fr'
    }
    axios({
      method: 'post',
      url: TRANSLATE_URL,
      data: {
        text: this.state.text,
        lang
      }
    }).then((res)=> {
      console.log(res);
      this.setState({
        text: res.data.translatedText
      });
    }).catch((err) => {
      console.log(err);
    });
    this.setState((state) => {
      return {
        isEnglish : !state.isEnglish
      };
    });
  }

  handleSpellCheck() {
    axios({
      method: 'post',
      url: SPELL_CHECK_URL,
      data: {
        text: this.state.text
      }
    }).then((res)=> {
      console.log(res);
      this.setState({
        text: res.data
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  handleSummarize() {
    axios({
      method: 'post',
      url: SUMMARIZE_URL,
      data: {
        text: this.state.text
      }
    }).then((res)=> {
      console.log(res);
      this.setState({
        text: res.data.summarizedText
      });
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      this.state.text === '' ? null :
      <div className="result" onClick={this.select}>
        <Grid item xs={12}>
          <p>Your file <b>{this.props.name}</b> has been converted to text:</p>
        </Grid>

        <Grid container direction="row">
          <Grid item xs={1} className="optionButtons">
            <Tooltip title="Translate" placement="left">
              <Button onClick={() => {this.handleTranslate()}} style={{marginTop: 5, marginBottom: 5, marginRight: 1000, height: 40, width: 40, backgroundColor: '#484848'}} variant="fab" color="primary" aria-label="Edit">
                <TranslateIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Spell Check" placement="left">
              <Button onClick={() => {this.handleSpellCheck()}} style={{marginTop: 5, marginBottom: 5, marginRight: 1000, height: 40, width: 40, backgroundColor: '#484848'}} variant="fab" color="primary" aria-label="Edit">
              <CheckIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Summarize" placement="left">
              <Button onClick={() => {this.handleSummarize()}} style={{marginTop: 5, marginBottom: 5, marginRight: 1000, height: 40, width: 40, backgroundColor: '#484848'}} variant="fab" color="primary" aria-label="Edit">
                <SubjectIcon />
              </Button>
            </Tooltip>
          </Grid>

          <Grid item xs={10}>
            <textarea className="convertedText" onChange={(e) => {this.handleChange(e)}} value={this.state.text} />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item xs={12}>
            <CopyToClipboard text={this.state.text}
              onCopy={() => this.setState({copied: true})}>
              <IconButton aria-label="Copy to clipboard">
                <Tooltip title={this.state.copied ? "Copied!" : "Copy to clipboard"} placement="right">
                  <AssignmentIcon />
                </Tooltip>
              </IconButton>
            </CopyToClipboard>
          </Grid>
        </Grid>

      </div>
    )
  }
}

// export component
export default ResponseText;

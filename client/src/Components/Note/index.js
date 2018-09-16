import React from 'react'
import { Link } from 'react-router-dom'
import ResponseText from '../ResponseText'
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowIcon from '@material-ui/icons/ArrowBack';
import './note.css'

const Note = (props) => {
  return (
    <div className="individualNote">
      <Typography variant="headline" component="h2" className="title">Individual Note</Typography>
      <ResponseText text={props.text} />
      <Grid container direction="row" className="backButton">
        <Grid item xs={12}>
          <Link to='/notes'>
            <Tooltip title="Back to My Notes">
              <Button style={{height: '40px', width: '40px', backgroundColor: '#484848'}} variant="fab" color="primary" aria-label="Back">
                <ArrowIcon />
              </Button>
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}

export default Note

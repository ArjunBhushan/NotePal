import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import CourseCard from '../CourseCard'
import './full-notes.css'
import axios from 'axios'

class FullNotes extends Component {
  state = {
    notes : []
  }
  componentDidMount(){
    const userId = localStorage.getItem('userId');
    axios({
      method: 'get',
      url: `https://notepal-api.herokuapp.com/myNotes/${userId}`
    }).then((res) => {
      this.setState({notes: res.data.notes});
    })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    return (
      <div>
        <ul>
          <Typography variant="headline" component="h1" className="title">
            My Notes
          </Typography>
            <Grid container spacing={16}>
            {
              this.state.notes.map(note => (
                <Grid key={note.key} item xs={3}>
                  <Link style={{textDecoration: 'none'}} to={{
                    pathname: `/notes/${note.key}`,
                    state: { text: note.text }}}>
                    <CourseCard name={''} description={note.text} />
                  </Link>
                </Grid>
              ))
            }
          </Grid>
        </ul>
      </div>
    )
  }
}

export default FullNotes

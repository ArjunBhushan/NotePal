import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './full-notes.css'
import axios from 'axios'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
class FullNotes extends Component {
  state = {
    notes : []
  }
  componentDidMount(){
    const userId = localStorage.getItem('userId');
    axios({
      method: 'get',
      url: `https://notepal-api.herokuapp.com/myMessages/${userId}`
    }).then((res) => {
      this.setState({notes: res.data.notes});
    })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    console.log(this.state.notes)
    return (
      <div>
        <Typography variant="headline" component="h1" className="title">
          All Notes
        </Typography>
        {
          this.state.notes.map(note => (
            <Card key={note.image} className="noteCard">
              <CardContent>
                <Typography variant="headline" component="h2">
                  <Link style={{textDecoration: 'none', color: '#484848'}} to={`/notes/${note.key}`}>{note.text}</Link>
                </Typography>
              </CardContent>
            </Card>
          ))
        }
      </div>
    )
  }
}

export default FullNotes

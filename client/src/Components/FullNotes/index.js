import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './full-notes.css'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const FullNotes = () => (
  <div>
    <Typography variant="headline" component="h1" className="title">
      All Notes
    </Typography>
    {
      [1,2,3,4,5].map(p => (
        <Card key={p} className="noteCard">
          <CardContent>
            <Typography variant="headline" component="h2">
              <Link style={{textDecoration: 'none', color: '#484848'}} to={`/notes/${p}`}>{p}</Link>
            </Typography>
          </CardContent>
        </Card>
      ))
    }
  </div>
)

export default FullNotes

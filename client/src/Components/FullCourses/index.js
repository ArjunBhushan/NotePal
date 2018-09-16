import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './full-courses.css'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const FullCourses = () => (
  <div>
    <Typography variant="headline" component="h1" className="title">
      All Courses
    </Typography>
    {
      [1,2,3,4,5].map(p => (
        <Card key={p} className="courseCard">
          <CardContent>
            <Typography variant="headline" component="h2">
              <Link style={{textDecoration: 'none', color: '#484848'}} to={`/courses/${p}`}>{p}</Link>
            </Typography>
          </CardContent>
        </Card>
      ))
    }
  </div>
)

export default FullCourses

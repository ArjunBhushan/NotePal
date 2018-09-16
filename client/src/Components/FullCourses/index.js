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
    <ul>
      <Typography variant="headline" component="h1">
        All Courses
      </Typography>
      {
        [1,2,3,4,5].map(p => (
          <Card key={p} className="courseCard">
            <CardContent>
              <Typography variant="headline" component="h2">
                <Link to={`/courses/${p}`}>{p}</Link>
              </Typography>
            </CardContent>
          </Card>
        ))
      }
    </ul>
  </div>
)

export default FullCourses

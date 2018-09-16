import React from 'react'
import Typography from '@material-ui/core/Typography';
import CourseCard from '../CourseCard'
import Response from '../../api'
import './full-courses.css'
import { Link } from 'react-router-dom'

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const FullCourses = () => (
  <div>
    <ul>
      <Typography variant="headline" component="h1">
        All Courses
      </Typography>
      {
        Response.all().map(p => (
          <Link style={{textDecoration: 'none'}} to={'/courses/' + p.id}>
            <CourseCard name={p.name} description={p.description} />
          </Link>
        ))
      }
    </ul>
  </div>
)

export default FullCourses

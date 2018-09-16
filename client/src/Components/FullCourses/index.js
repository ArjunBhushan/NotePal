import React from 'react'
import Typography from '@material-ui/core/Typography';
import CourseCard from '../CourseCard'
import Grid from '@material-ui/core/Grid';
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
      <Grid container spacing={12}>
        {Response.all().map(p => (
          <Grid item xs={4}>
            <Link key = {p.id} style={{textDecoration: 'none'}} to={'/courses/' + p.id}>
              <CourseCard name={p.name} description={p.description} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </ul>
  </div>
)

export default FullCourses

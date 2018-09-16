import React from 'react'
import Typography from '@material-ui/core/Typography';
import CourseCard from '../CourseCard'
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'
import axios from 'axios'
import './full-courses.css'

class FullCourses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    axios({
      method: 'get',
      url: `https://notepal-216511.firebaseio.com/groups.json`,
    })
      .then((response) => {
        let courses = []
        // console.log(Object.keys(response.data))
        Object.keys(response.data).forEach((course) => {
          courses.push(response.data[course])
        })
        this.setState({data: courses, loading: false})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { data, loading } = this.state;

    if (loading) {
      return(<p>Loading...</p>)
    }

    return(
      <div>
        <ul>
          <Typography variant="headline" component="h1">
            All Courses
          </Typography>
          <Grid container spacing={16}>
            {this.loading ? <div /> : data.map(p => (
              <Grid key={p.code} item xs={3}>
                <Link style={{textDecoration: 'none'}} to={'/courses/' + Object.keys(p.notes).join(', ')}>
                  <CourseCard name={p.name} description={p.description} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </ul>
      </div>
    )
  }
}

export default FullCourses

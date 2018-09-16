import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import CourseCard from '../CourseCard'
import Grid from '@material-ui/core/Grid';

class Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false
    };
  }

  componentDidMount() {
    let noteID = this.props.match.params.number.split(', ');
    this.setState({ loading: true });

    axios({
      method: 'get',
      url: `https://notepal-216511.firebaseio.com/notes.json`,
    })
      .then((response) => {
        this.setState({data: response.data[noteID], loading: false})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <ul>
          <Typography variant="headline" component="h1">
            All Courses
          </Typography>
          <Grid container spacing={16}>
            {this.loading ? <div /> : 
              <Grid item xs={4}>
                <Link style={{textDecoration: 'none'}} to={'/courses/'}>
                  <CourseCard image={this.state.data.image} name={''} description={this.state.data.text} />
                </Link>
              </Grid>
            }
          </Grid>
        </ul>
      </div>
      // <div>
      //   <p>{this.state.data.text}</p>
      //   <img src={this.state.data.image} alt="Alt Text" />
      //   <Link to='/courses'>Back</Link>
      // </div>
    )
  }
}

export default Course

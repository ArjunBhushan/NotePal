import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function CourseCard(props) {
  const { classes } = props;
  return (
    <Card style={{marginBottom: '20px', marginTop: '20px', height: '200px', overflowY: 'scroll'}}
    className={classes.card}>
      <CardActionArea>
        {props.image === undefined ? <div /> :
          <CardMedia
          component="img"
          className={classes.media}
          height="140"
          image={"https://notepal-api.herokuapp.com/notePicture?filePath=" + props.image}
          title="Image Not Found"
        />
        }
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.name}
          </Typography>
          <Typography component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string
};

export default withStyles(styles)(CourseCard);
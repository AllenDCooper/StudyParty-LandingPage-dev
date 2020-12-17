import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: '150px',
    marginBottom: '30px' 
  },
  title2: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    fontFamily: 'PT Sans, sans-serif',
    fontWeight: '700',
    textTransform: "none",
  },
  title22: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root} onClick={props.clickBack}>
      <Container className={classes.container}>
        {/* <img
          src="/images/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        /> */}
        <div>
        <Grid container spacing={5}>
        <Grid item xs={12}>
        <Typography variant="h4" marked="center" className={classes.title2} component="h2">
          How It Works
        </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={`${process.env.PUBLIC_URL}/images/Icon1.png`}
                alt="suitcase"
              />
              <Typography variant="h6" className={classes.title}>
                Find a study partner or group
              </Typography>
              <Typography variant="h5">
                {'Get matched based on goals and skills.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={`${process.env.PUBLIC_URL}/images/Icon2.png`}
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                Kick off your StudyParty sessions
              </Typography>
              <Typography variant="h5">
                {'Take advantage of our study and motivational tools.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src={`${process.env.PUBLIC_URL}/images/Icon3.png`}
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                Improve your score
              </Typography>
              <Typography variant="h5">
                {'Ace your test while making new friends.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
        </div>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);

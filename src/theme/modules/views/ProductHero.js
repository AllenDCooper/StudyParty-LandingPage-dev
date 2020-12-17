import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  `${process.env.PUBLIC_URL}/assets/video_screenshot.jpg`;

const styles = (theme) => ({
  background: {
    // backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  title: {
    fontSize: 24,
    position: 'absolute',
    left: 0,
    top: 0,
    marginLeft: '20px'
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
  formColor: {
    color: 'black'
  }
});

const desktopHeaderStyle = { textTransform: "none", fontFamily: 'PT Sans, sans-serif', fontWeight: '700', marginTop: '90px' }
const mobileHeaderStyle = { textTransform: "none", fontSize: '30px', fontFamily: 'PT Sans, sans-serif', fontWeight: '700', marginTop: '300px', marginBottom: '0px' }

const desktopDescriptionStyle = { fontWeight: '400', fontSize: '18px', lineHeight: '24px', margin: '50px 15px', maxWidth: '500px', fontFamily: 'Lato, sans-serif' }
const mobileDescriptionStyle = { fontWeight: '400', fontSize: '18px', lineHeight: '24px', margin: '20px 15px', maxWidth: '500px', fontFamily: 'Lato, sans-serif' }

function ProductHero(props) {
  console.log(props)
  const { classes } = props;

  const handleClickOpen = () => {
    console.log('handleClickOpen run')
    props.setShow(1);
  };


  return (
    <>

      {/* Default View / No Modal */}

      <ProductHeroLayout id={'top'} backgroundClassName={classes.background} style={{ background: 'none' }}>
        {/* {helperFunction(props.show)} */}
        <>
          {window.innerWidth <= 740 ?
            null
            :
            <Link
              className="permanent-marker pink"
              underline="none"
              color="inherit"
              className={classes.title}
              href={process.env.PUBLIC_URL}
              style={{ fontFamily: "Permanent Marker", color: "hotpink", fontSize: "48px", textAlign: 'right' }}
            >
              {'StudyParty!'}
            </Link>
          }
          <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
          <Typography color="inherit" align="center" variant="h2" marked="center" style={window.innerWidth <= 740 ? mobileHeaderStyle : desktopHeaderStyle}>
            A new way to study<br></br>for the GMAT
            {/* Better Scores, <br></br>More Fun */}
          </Typography>
          {/* <span style={{ width: "100px", borderBottom: "4px solid white" }}></span> */}
          <Typography color="inherit" align="center" variant="h5" className={classes.h5} style={window.innerWidth <= 740 ? mobileDescriptionStyle : desktopDescriptionStyle} >
            StudyParty connects virtual study partners and groups using smart technology. Improve your score while meeting future business school classmates. Free and fun to use.
            </Typography>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            className={classes.button}
            component="a"
            onClick={handleClickOpen}
          >
            Get Started
          </Button>
        </>
      </ProductHeroLayout>
    </>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);

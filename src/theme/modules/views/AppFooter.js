import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://material-ui.com/">
        StudyParty
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}));

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];

export default function AppFooter(props) {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root} onClick={props.clickBack}>
      <Container className={classes.container}>
        <Grid container spacing={5} justify='left'>
          {/* <Grid item xs={12} sm={8} md={4}>
            <Typography variant="h6" marked="center" gutterBottom>
              Social
            </Typography>
            <Grid item className={classes.icons} justify='center'>
              <a href="https://material-ui.com/" className={classes.icon}>
                <img src={`${process.env.PUBLIC_URL}/images/appFooterFacebook.png`} alt="Facebook" />
              </a>
              <a href="https://twitter.com/MaterialUI" className={classes.icon}>
                <img src={`${process.env.PUBLIC_URL}/images/appFooterTwitter.png`} alt="Twitter" />
              </a>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Typography variant="h6" marked="center" gutterBottom>
              Legal
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem} style={{ display: 'inline-block', marginRight: '10px' }}>
                <Link href="/premium-themes/onepirate/terms/">Terms</Link>
              </li>
              <li className={classes.listItem} style={{ display: 'inline-block' }}>
                <Link href="/premium-themes/onepirate/privacy/">Privacy</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Typography variant="h6" marked="center" gutterBottom>
              Language
            </Typography>
            <TextField
              select
              SelectProps={{
                native: true,
              }}
              className={classes.language}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid> */}
          <Grid item xs={12} md={12} >
          </Grid>
          <Grid item xs={12} md={12} style={{padding: '0px'}}>
            {/* <Typography variant="h6" marked="center" gutterBottom>
              Contact
            </Typography> */}
            <Link href='mailto:info@mystudyparty.com'>
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} md={12} >
            <Copyright />
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}

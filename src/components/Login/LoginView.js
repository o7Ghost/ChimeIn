import React from 'react';
import { Route, Redirect, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Image from '../../image/background.jpeg';

const themePaper = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
  },
});

const styles = theme => ({
    "@global": {
        body: {
            backgroundImage: 'url(' + Image + ')',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "100%"
        },
        html: {
            height: "100%"
        },
        "#componentWithId": {
            height: "100%"
        }
    },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  otherLinks:{
    padding: `${theme.spacing.unit * 2}px 0px ${theme.spacing.unit * 3}px`,
    display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
      
  },
});

function LoginView(props) {
  const { classes } = props;
  const onSubmit = props.onSubmit;


  return (
    <MuiThemeProvider theme={themePaper}>
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>        
      </Paper>
      <div className={classes.otherLinks}>
      <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
      <Link to="/reset">Forget Password?</Link>
      <Link to="/signUp">Not a Customer? Sign Up Now!</Link>
      </Grid>
      </div>
    </main>
    </MuiThemeProvider>
  );
}

LoginView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginView);
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems, thirdListItems } from './listItems.js';
import AddClass from './AddClass.js';
import firebase from 'firebase';
import AlertButtons from '../../AlertButtons.js';
import Button from '@material-ui/core/Button';
import Tabs from './Tabs.js';
import { Link } from 'react-router-dom'
import TextField from './TextField.js';
import blue from '@material-ui/core/colors/blue';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const themeDrawer = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const themeAppBar = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
  },
});

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },

  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 0,
    [theme.breakpoints.up('sm')]: {
      width: 0,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  others: {

  }

});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyDAxqzZLvyW64VLMhvxTxQjMubdntruWE0",
      authDomain: "cse110firebase-498ba.firebaseapp.com",
      databaseURL: "https://cse110firebase-498ba.firebaseio.com",
      projectId: "cse110firebase-498ba",
      storageBucket: "",
      messagingSenderId: "155811445994"
    };
    if (!firebase || !firebase.apps.length) {
      firebase.initializeApp(config);
    }

  }
  signout() {
    firebase.auth().signOut();
  }
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
        <MuiThemeProvider theme={themeAppBar}>
          <AppBar
     
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
          
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Dashboard
              </Typography>

              <Button color="inherit" component={Link} to="/login" onClick={this.signout}>Log Out</Button>
              <Button color="inherit" component={Link} to="/reset" onClick={this.signout}>Reset Password</Button>

            </Toolbar>
         
          </AppBar>
          </MuiThemeProvider>

          <MuiThemeProvider theme={themeDrawer}>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
            <Divider />
            <List>{thirdListItems}</List>
            <Divider />
            <Divider />
            <Divider />
            <Divider />
            <div className={classes.others}>
              <AddClass db={firebase}/>
            </div>
          </Drawer>
          </MuiThemeProvider>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.toolbar} />

            <Tabs />
            
                    <TextField db={firebase}/>
                    
            <div>
              <AlertButtons />
            </div>


          </main>
        </div>
      </React.Fragment>

    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
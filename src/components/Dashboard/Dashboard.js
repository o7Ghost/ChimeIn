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
import { SideBar } from './listItems.js';
import AddClass from './AddClass.js';
import AddTA from './AddTA.js';
import DropClass from './DropClass.js';
import CreateClass from './CreateClass.js';
import firebase from 'firebase';
import AlertButtons from '../../AlertButtons.js';
import Button from '@material-ui/core/Button';
import Tabs from './Tabs.js';
import { Link } from 'react-router-dom'
import TextField from './TextField.js';
import blue from '@material-ui/core/colors/blue';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import WelcomePage from './WelcomePage.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';



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
   this.state =  {
       currentClass: 'Dashboard',
             UID: '',
                Question: '',
          	      upvoteCount: 0,
                  order: 99999999,
                timestamp: '',
                followers: [],
       hideSetting : true,
   }
   this.handler = this.changeQState.bind(this);
      this.handlerA = this.changeAState.bind(this);


    this.changeCurrentClass = this.changeCurrentClass.bind(this);
  }
  changeCurrentClass(classID) {
    this.setState({
      currentClass: classID,
    });
    console.log("current Class:", classID);
  }
  changeQState(Q) {
    this.setState({ Question: Q })
  }

  changeAState(n) {
    this.setState({ Answer: n })
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

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


      changeSetting(){
          //set it to be false
          this.setState({hideSetting: !this.state.hideSetting});
      }


     getSettingButton(){
          if (this.state.hideSetting){
              return <div> Course Management <ExpandMoreIcon style={{verticalAlign: 'bottom', float: 'right'}}/> </div>;
          }
          return <div> Course Management <ExpandLessIcon style={{verticalAlign: 'bottom', float: 'right'}}/> </div>;
      }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

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
                  {this.state.currentClass}
                </Typography>



                {(<div>
                  <IconButton
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem to="/login" component={Link} onClick={this.signout}>Log Out</MenuItem>
                    <MenuItem to="/reset" component={Link} onClick={this.reset}>Reset Password</MenuItem>
                  </Menu>
                </div>
                )}






                {/*   <Button color="inherit" component={Link} to="/login" onClick={this.signout}>Log Out</Button> */}
                {/*   <Button color="inherit" component={Link} to="/reset" onClick={this.signout}>Reset Password</Button> */}


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


            <SideBar onClick={this.changeCurrentClass} currClass = {this.state.currentClass} db = {firebase}/>

            <div>
                <span>
                        <ListItem onClick={()=>this.changeSetting()} button>
                          <ListItemText primary={this.getSettingButton()}/>
                        </ListItem>
                </span>
                {this.state.hideSetting ? null :  <div> <div className={classes.others}>
                                                               <AddClass db={firebase}/>
                                                             </div>
                                                             <div className={classes.others}>
                                                                 <DropClass db={firebase}/>
                                                             </div>
                                                             <div className={classes.others}>
                                                                 <CreateClass db={firebase}/>
                                                             </div>
                                                               <div className={classes.others}>
                                                                 <AddTA db={firebase} />
                                                               </div>
                                                               </div>}

            </div>




            </Drawer>

          </MuiThemeProvider>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div className={classes.toolbar} />
            {
              this.state.currentClass == 'Dashboard' ?
                <WelcomePage /> : <Tabs curClass={this.state.currentClass} value={this.state} stateChange={this.handlerA} />
            }
            {
              this.state.currentClass == 'Dashboard' ?
                null :
                <TextField curClass={this.state.currentClass} value={this.state} db={firebase} stateChange={this.handler} />
            }

            <div>
              {this.state.currentClass == 'Dashboard' ? null : <div><Typography>Is something wrong?</Typography> <AlertButtons /></div>}
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

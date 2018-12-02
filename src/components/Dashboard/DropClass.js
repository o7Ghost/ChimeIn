import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import DropIcon from '@material-ui/icons/LibraryAdd';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});


class DropClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            StudentClass: [],
            TAClass: [],
            open: false,
            uid: this.props.db.auth().currentUser.uid
        };

        this.firebaseRef = this.props.db.database().ref("User").child(this.state.uid);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDrop = () => {
        //this line will create a route to the database, no matter if the database child is exist or not
        var userRef = this.props.db.database().ref("User").child(this.state.uid);
        console.log("Current identity:"+this.props.identity);
        console.log("Current class:"+this.props.classID)
        if(this.props.identity=="student"){
            var classRef = userRef.child("studentClass").child(this.props.classID);
            if(classRef){
                classRef.remove();
            }
            alert("The class:"+this.props.classID+" has been dropped if you have added it before.");
            this.handleClose();
            this.props.change('Dashboard','user');
        }else{
            if(this.props.identity=='instructor'){
                let resultList = [];
                userRef.once('value', (snapshot) => {
                    const userObj = snapshot.val();
                    if(userObj.myClass.length==1){
                        userRef.child("myClass").remove();
                    }else{
                        for(var i=0;i<userObj.myClass.length;i++) {
                            if(userObj.myClass[i]!=this.props.classID){
                                resultList.push(userObj.myClass[i]);
                            }
                        }
                        userRef.update({myClass:resultList});
                    }
                    alert("The class:"+this.props.classID+" has been dropped.");
                    this.handleClose();
                    this.props.change('Dashboard','user');
                });
            }else{
                let resultList = [];
                userRef.once('value', (snapshot) => {
                    const userObj = snapshot.val();
                    if(userObj.modClass.length==1){
                        userRef.child("modClass").remove();
                    }else{
                        for(var i=0;i<userObj.modClass.length;i++) {
                            if(userObj.modClass[i]!=this.props.classID){
                                resultList.push(userObj.modClass[i]);
                            }
                        }
                        userRef.update({modClass:resultList});
                    }
                    alert("The class:"+this.props.classID+" has been dropped.");
                    this.handleClose();
                    this.props.change('Dashboard','user');
                });
            }

        }
        // check if the there is actually this class entered by user. by using .on and snapshot

    };
    render() {
        return (
            this.props.classID == "Dashboard" ? null :

            <div>
                <ListItem button>
                    <ListItemIcon>
                        <DropIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drop Current Class" onClick={this.handleClickOpen} />
                </ListItem>


                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Drop Class</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDrop.bind(this)} color="primary">
                            Drop now
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>


        );
    }
}

export default withStyles(styles)(DropClass);
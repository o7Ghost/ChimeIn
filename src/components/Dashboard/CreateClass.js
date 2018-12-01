import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import CreateIcon from '@material-ui/icons/LibraryAdd';
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


class CreateClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            StudentClass: [],
            TAClass: [],
            open: false,
            addCode: '',
            className:'',
            alertTime: new Date(),
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

    handleCreate = event => {
        event.preventDefault();
        try{
            console.log("You entered:"+this.state.className+"+"+this.state.addCode);

            var classRef = this.props.db.database().ref("ClassFinal").child(this.state.className);
            classRef.once('value', (snapshot) => {
                const classObj = snapshot.val();
                if(classObj) {
                    alert("Class already exist!");
                }else{
                    classRef.set({addCode:this.state.addCode,instructor:this.state.uid});
                    var userRef = this.props.db.database().ref("User").child(this.state.uid);
                    userRef.set({alertTime: this.state.alertTime});
                    console.log(userRef.child("myClass"));
                    //userRef = userRef.child("myClass");
                    let classesList = [];
                    userRef.once('value', (snapshot) => {
                        const userObj = snapshot.val();
                        console.log(userObj.myClass);
                        if(userObj.myClass) {
                            classesList = userObj.myClass;
                            console.log("not null!");
                        }else{
                            console.log("null!");
                        }
                        classesList.push(this.state.className);
                        console.log(classesList);
                        userRef.update({myClass:classesList});
                        alert("Success!");
                    });
                }
            });
            //this.setState({ open: false });
            this.handleClose();
        } catch (error) {
            alert(error);
        }
        // check if the there is actually this class entered by user. by using .on and snapshot
    };

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleCreate();
        }
    };

    render() {
        return (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <CreateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create Class" onClick={this.handleClickOpen} />
                </ListItem>


                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create Class</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Create a class by enter a class name and assign an 6-digit addCode:
                        </DialogContentText>
                        <DialogContentText>
                            For example: name:CSE140  addCode:X1Y2Z3
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Course Name"
                            type="text"
                            fullWidth
                            onChange = {e => this.setState({className: (e.target.value)})}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="6-Digit Add code"
                            type="text"
                            fullWidth
                            onChange = {e => this.setState({addCode: (e.target.value)})}
                            onKeyPress={this._handleKeyPress}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreate.bind(this)} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(CreateClass);
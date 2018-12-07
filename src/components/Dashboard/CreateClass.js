import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
            className: '',
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
        try {
            if (this.state.addCode.length !== 6) {
                throw "Invalid addCode";
            }

            var classRef = this.props.db.database().ref("ClassFinal").child(this.state.className + "+" + this.state.addCode);
            classRef.once('value', (snapshot) => {
                const classObj = snapshot.val();
                if (classObj) {
                    alert("Class already exist! Change the class name or addCode.");
                } else {
                    classRef.set({ addCode: this.state.addCode, instructor: this.state.uid, className: this.state.className });
                    var userRef = this.props.db.database().ref("User").child(this.state.uid);
                    let classesList = [];
                    userRef.once('value', (snapshot) => {
                        const userObj = snapshot.val();
                        if (userObj.myClass) {
                            classesList = userObj.myClass;
                        } else {
                        }
                        classesList.push(this.state.className + "+" + this.state.addCode);
                        userRef.update({ myClass: classesList });
                        alert("Operation create class Success!");
                    });
                }
            });
            this.handleClose();
        } catch (error) {
            alert(error);
        }
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
                            onChange={e => this.setState({ className: (e.target.value) })}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="6-Digit Add code"
                            type="text"
                            fullWidth
                            onChange={e => this.setState({ addCode: (e.target.value) })}
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
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
            addCode: '',
            className:'',
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
        console.log("You entered:"+this.state.className);
        var userRef = this.props.db.database().ref("User").child(this.state.uid);
        var classRef = userRef.child("studentClass").child(this.state.className);
        if(classRef){
            classRef.remove();
        }
        alert("The class:"+this.state.className+" has been dropped if you have added it before.");
        // check if the there is actually this class entered by user. by using .on and snapshot
        this.handleClose();
    };

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleDrop();
        }
    }

    render() {
        return (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <DropIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drop Class" onClick={this.handleClickOpen} />
                </ListItem>


                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Drop Class</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the Course name to drop course:
                        </DialogContentText>
                        <DialogContentText>
                            For example: CSE30
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Course Name"
                            type="text"
                            fullWidth
                            onChange = {e => this.setState({className: (e.target.value)})}
                            onKeyPress ={this._handleKeyPress}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDrop.bind(this)} color="primary">
                            Drop
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(DropClass);
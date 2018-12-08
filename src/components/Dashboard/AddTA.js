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


class AddTA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            StudentClass: [],
            TAClass: [],
            open: false,
            uid: this.props.db.auth().currentUser.uid,
            TAemail : ''
        };

        this.firebaseRef = this.props.db.database().ref("User").child(this.state.uid);

    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAdd = event => {
        event.preventDefault();
        try{
            var classRef = this.props.db.database().ref("ClassFinal").child(this.props.classID);
            classRef.once('value', (snapshot) => {
                const classObj = snapshot.val();
                if(!classObj) {
                    alert("Class not exist!");
                }else{
                    var userRef = this.props.db.database().ref("User").child(this.state.uid);
                    var myClassRef = userRef.child("myClass");
                    myClassRef.once('value', (snapshot) => {
                        const temp = snapshot.val();
                        if(!temp || !temp.includes(this.props.classID)) {
                            alert("You are not the instructor!");
                        }else{
                            var email = this.state.TAemail.replace("@"," ");
                            email = email.replace("."," ");
                            var TARef1 = this.props.db.database().ref("UserByEmail").child(email);
                            TARef1.once('value',(snapshot)=>{
                                const temp3 = snapshot.val();
                                if(!temp3){
                                    alert("User with this email does not exist, please check again.");
                                }else{
                                    var TAuid = temp3.uid;
                                    var TARef = this.props.db.database().ref("User").child(TAuid);
                                    TARef.once('value', (snapshot2) => {
                                        const temp2 = snapshot2.val();
                                        let TAClass = [];
                                        if(!temp2){
                                            alert("User with uid:"+this.state.uid+" does not exist!");
                                        }
                                        else{
                                            if(temp2.modClass) {
                                                TAClass = temp2.modClass;
                                            }
                                            if(TAClass.includes(this.props.classID)){
                                                alert("This TA has already been included");
                                            }else{
                                                TAClass.push(this.props.classID);
                                                TARef.update({modClass:TAClass});
                                                alert("Operation Add TA success!");
                                                this.setState({ open: false });
                                            }
                                        }
                                    });
                                }
                            })

                        }
                    });
                }
            });
        } catch (error) {
            alert(error);
        }
        // check if the there is actually this class entered by user. by using .on and snapshot
    };

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleAdd();
        }
    }

    render() {
        return (
            this.props.identity !== "instructor" ? null :
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <CreateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add TA to your class" onClick={this.handleClickOpen} />
                </ListItem>


                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add TA into your class</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add a TA into your class by input TA's email:
                        </DialogContentText>
                        <DialogContentText>
                            For example: ziz059@ucsd.edu
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="TA email"
                            label="TA email"
                            type="email"
                            fullWidth
                            onChange = {e => this.setState({TAemail: (e.target.value)})}
                            onKeyPress={this._handleKeyPress}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAdd.bind(this)} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(AddTA);
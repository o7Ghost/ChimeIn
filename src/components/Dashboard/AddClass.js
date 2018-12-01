import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddIcon from '@material-ui/icons/LibraryAdd';
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


class AddClass extends React.Component {
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
        var TARef = this.firebaseRef.child('TAClass');
        var StudentRef = this.firebaseRef.child('studentClass');
        /*TARef.on('value', snapshot => {
            let temp = [];
            console.log( Object.entries(snapshot) );
            snapshot.forEach(classElem => {

                let classItem = classElem.val();

                console.log( Object.keys(classElem) );
                console.log(  typeof classItem  );
                classItem['.key'] = classElem.key;
                temp.push(classItem);
                // TAClassTemp.push(classItem);
            });
            temp.sort(compare);
            this.setState({TAClass: temp } );
        });

        StudentRef.on('value', snapshot => {
            let temp2 = [];
            console.log( Object.entries(snapshot) );
            snapshot.forEach(classElem => {

                let classItem = classElem.val();

                console.log( Object.keys(classElem) );
                console.log(  typeof classItem  );
                classItem['.key'] = classElem.key;
                temp2.push(classItem);
                console.log("AAA" + classItem['.key']);
                // TAClassTemp.push(classItem);
            });

            // Sort the student class
            temp2.sort(compare);
            this.setState({StudentClass: temp2 } );
        });*/

    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAdd = () => {
        //this line will create a route to the database, no matter if the database child is exist or not
        console.log("You entered:"+this.state.className+"+"+this.state.addCode);
        var classRef = this.props.db.database().ref("ClassFinal").child(this.state.className);


        classRef.once('value', (snapshot) => {
            const classObject = snapshot.val();
            if(classObject==null){
                alert("Class not registered!");
            }
            else if(!classObject.addCode || classObject.addCode.localeCompare(this.state.addCode)!=0) {
                alert("Wrong add code!");
            }else{
                var userRef = this.props.db.database().ref("User").child(this.state.uid);
                var classRef = userRef.child("studentClass").child(this.state.className);
                classRef.update({className:this.state.className});
                alert("Success!");
            }
            this.handleClose();
        });


        // check if the there is actually this class entered by user. by using .on and snapshot
    };

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleAdd();
        }
    }

    render() {
        return (
            <div>
                <ListSubheader inset>Course Management</ListSubheader>
                <ListItem button>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Class" onClick={this.handleClickOpen} />
                </ListItem>


                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Class</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter the Course code in the following format to add course:
                        </DialogContentText>
                        <DialogContentText>
                            ClassName + 6-Digit-ID
                        </DialogContentText>
                        <DialogContentText>
                            For example: CSE30+A1B2C3
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
                        <Button onClick={this.handleAdd.bind(this)} color="primary">
                            add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(AddClass);
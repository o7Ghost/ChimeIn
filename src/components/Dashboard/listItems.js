import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

function compare(a, b) {
    var regex = new RegExp('([0-9]+)|([a-zA-Z]+)','g');
    var splittedArrayA = a['.key'].match(regex);
    var splittedArrayB = b['.key'].match(regex);

    var textA = splittedArrayA[0];
    var numA = splittedArrayA[1];
    var textB = splittedArrayB[0];
    var numB = splittedArrayB[1];

    /*if(textA.localeCompare(textB) != 0) {
        return textA - textB;
    }*/
    return numA - numB;
}

export class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            myClassList: [],
            modClassList: [],
            studentClassList: [],
            firebaseRef: null,
            studentRef: null
        };

        var uid = this.props.db.auth().currentUser.uid;
        var firebaseRef = this.props.db.database().ref("User").child(uid);
        var studentRef = firebaseRef.child('studentClass');
        this.setState({firebaseRef:firebaseRef});
        this.setState({studentRef:studentRef});
        firebaseRef.on('value', (snapshot) => {
            const userObj = snapshot.val();
            console.log(userObj.lastPostTime);
            if(userObj.modClass) {
                this.setState({modClassList :userObj.modClass});
                // this.state.modClassList.sort(compare);
            }
            if(userObj.myClass) {
                this.setState({myClassList :userObj.myClass});
                // this.state.myClassList.sort(compare);
            }

        });
        studentRef.on('value', snapshot => {
            let temp2 = [];
            snapshot.forEach(classElem => {

                let classItem = classElem.val();
                classItem['.key'] = classElem.key;
                temp2.push(classItem);
            });

            // Sort the student class
            // temp2.sort(compare);
            this.setState({studentClassList: temp2 } );
        });

    }

    componentWillUnmount() {
        this.state.firebaseRef.off();
        this.state.studentRef.off();
    }

    render() {

        const StudentClass = this.state.studentClassList.map(course =>
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>

                    <ListItemText primary={course.className}/>
                </ListItem>
            </div>
        );
        const TAClass = this.state.modClassList.map(course =>
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>

                    <ListItemText primary={course}/>
                </ListItem>
            </div>
        );

        const MyClass = this.state.myClassList.map(course =>
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>

                    <ListItemText primary={course}/>
                </ListItem>
            </div>
        );



        return (
            <div>
                <ListSubheader inset>Student</ListSubheader>
                {StudentClass}

                <ListSubheader inset>Tutor</ListSubheader>
                {TAClass}

                <ListSubheader inset>Instructor</ListSubheader>
                {MyClass}
            </div>

        );
    };
};
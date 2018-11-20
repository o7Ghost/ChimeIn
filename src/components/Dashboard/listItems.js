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
            StudentClass: [],
            TAClass: []
        };


        this.firebaseRef = this.props.db.database().ref("User").child("M20Fryhk7OSHWcJIDa1Z994h12A3");
        var TARef = this.firebaseRef.child('TAClass');
        var StudentRef = this.firebaseRef.child('studentClass');
        TARef.on('value', snapshot => {
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
        });

    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {

        const StudentClass = this.state.StudentClass.map(course =>
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>

                    <ListItemText primary={course.className}/>
                </ListItem>
            </div>
        );
        const TAClass = this.state.TAClass.map(course =>
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>

                    <ListItemText primary={course.className}/>
                </ListItem>
            </div>
        );

        return (
            <div>
                <ListSubheader inset>Student</ListSubheader>
                {StudentClass}

                <ListSubheader inset>Tutor</ListSubheader>
                {TAClass}
            </div>

        );
    };
};
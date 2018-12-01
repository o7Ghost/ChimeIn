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
            studentRef: null,
            selectedIndex: null,
        };

        var uid = this.props.db.auth().currentUser.uid;
        this.firebaseRef = this.props.db.database().ref("User").child(uid);
        var TARef = this.firebaseRef.child('modClass');
        var StudentRef = this.firebaseRef.child('studentClass');
        var MyRef = this.firebaseRef.child('myClass');

        TARef.on('value', snapshot => {
            let temp = [];
            snapshot.forEach(classElem => {
                console.log("----");
                console.log(classElem.val().toString());
                let classItem = classElem.val();
                temp.push(classItem);
            });
            console.log(temp);
            this.setState({modClassList: temp } );
        });

        StudentRef.on('value', snapshot => {
            let temp2 = [];
            snapshot.forEach(classElem => {
                let classItem = classElem.val();
                console.log( classElem.val() );
                console.log( classItem['className']);
                temp2.push(classItem['className']);
            });
            this.setState({studentClassList: temp2 } );
        });

        MyRef.on('value', snapshot => {
            let temp = [];
            snapshot.forEach(classElem => {
                console.log("----");
                console.log(classElem.val().toString());
                let classItem = classElem.val();
                temp.push(classItem);
            });
            console.log(temp);
            this.setState({myClassList: temp } );
        });

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const onClickClass =  e['course'];
        console.log(this);
        this.props.onClick(onClickClass);
        this.setState({selectedIndex: onClickClass });
    }


    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {
        console.log("Rendered listItems");
        console.log(this.state);
        this.populateLists();
        const StudentClass = this.state.studentClassList.map(course =>
            <div>
                <ListItem button
                          selected={this.state.selectedIndex === {course}['course']}
                          onClick={()=>this.handleChange({course})}>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>

                    <ListItemText primary={course}  />
                </ListItem>
            </div>
        );
        const TAClass = this.state.modClassList.map(course =>
            <div>
                <ListItem button
                          selected={this.state.selectedIndex === {course}['course']}
                          onClick={()=>this.handleChange({course})}>
                    <ListItemIcon>
                       <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary={course}  />
                </ListItem>
            </div>
        );
		
		const MyClass = this.state.myClassList.map(course =>
            <div>
                <ListItem button
                          selected={this.state.selectedIndex === {course}['course']}
                          onClick={()=>this.handleChange({course})}>
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>

                    <ListItemText primary={course}  />
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

    populateLists(){
        var uid = this.props.db.auth().currentUser.uid;
        this.firebaseRef = this.props.db.database().ref("User").child(uid);
        var TARef = this.firebaseRef.child('modClass');
        var StudentRef = this.firebaseRef.child('studentClass');
        var MyRef = this.firebaseRef.child('myClass');

        TARef.once('value', snapshot => {
            let temp = [];
            snapshot.forEach(classElem => {
                console.log("----");
                console.log(classElem.val().toString());
                let classItem = classElem.val();
                temp.push(classItem);
            });
            console.log(temp);
            this.state.modClassList = temp;
        });

        StudentRef.once('value', snapshot => {
            let temp2 = [];
            snapshot.forEach(classElem => {
                let classItem = classElem.val();
                console.log( classElem.val() );
                console.log( classItem['className']);
                temp2.push(classItem['className']);
            });
            this.state.studentClassList = temp2;
        });

        MyRef.once('value', snapshot => {
            let temp = [];
            snapshot.forEach(classElem => {
                console.log("----");
                console.log(classElem.val().toString());
                let classItem = classElem.val();
                temp.push(classItem);
            });
            console.log(temp);
            this.state.myClassList = temp;
        });
    }
};
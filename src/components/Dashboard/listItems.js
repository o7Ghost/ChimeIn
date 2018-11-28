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

export class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            StudentClass: [],
            TAClass: [],
            selectedIndex: 0,
        };


        this.firebaseRef = this.props.db.database().ref("UserFinal").child("UID1");
        var TARef = this.firebaseRef.child('modClass');

        var StudentRef = this.firebaseRef.child('studentClass');
        TARef.on('value', snapshot => {
            let temp = [];
            snapshot.forEach(classElem => {
                console.log("----");
                console.log(classElem.val().toString());
                let classItem = classElem.val();
                temp.push(classItem);
            });
            console.log(temp);
            this.setState({TAClass: temp } );
        });

        StudentRef.on('value', snapshot => {
            let temp2 = [];
            snapshot.forEach(classElem => {
                let classItem = classElem.val();
                console.log( classElem.val() );
                console.log( classItem['className']);
                temp2.push(classItem['className']);
            });
            this.setState({StudentClass: temp2 } );
        });
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const onClickClass =  e['course'];
        console.log(this);
        this.props.onClick(onClickClass);
        this.setState({selectedIndex: onClickClass } );
    }


    componentWillUnmount() {
        this.firebaseRef.off();
    }

    render() {

        const StudentClass = this.state.StudentClass.map(course =>
            <div>
                <ListItem button
                          selected={this.state.selectedIndex === {course}['course']}
                          onClick={()=>this.handleChange({course})} >
                    <ListItemIcon>
                        <AssignmentIcon/>
                    </ListItemIcon>

                    <ListItemText primary={course} />
                </ListItem>
            </div>
        );
        const TAClass = this.state.TAClass.map(course =>
            <div>
                <ListItem button
                          selected={this.state.selectedIndex === {course}['course']}
                          onClick={()=>this.handleChange({course})}>
                    <ListItemIcon>
                       <AssignmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary={course} />
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
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Divider from '@material-ui/core/Divider';




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
            hideStudent: false,
            hideTA: false,
            hideInstructor: false,
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
        this.changeStudent = this.changeStudent.bind(this);
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

    changeStudent(){
        //set it to be false
        console.log("expanded student");
        this.setState({hideStudent: !this.state.hideStudent});
    }

    changeTA(){
        //set it to be false
        this.setState({hideTA: !this.state.hideTA});
    }

    changeInstructor(){
        //set it to be false
        this.setState({hideInstructor: !this.state.hideInstructor});
    }

    getStudentButton(){
        if (this.state.hideStudent){
            return <div> Student <ExpandMoreIcon style={{verticalAlign: 'bottom', float: 'right'}}/> </div>;
        }
        return <div> Student <ExpandLessIcon style={{verticalAlign: 'bottom', float: 'right'}}/> </div>;
    }

    getTAButton(){
        if (this.state.hideTA){
            return <div> TA <ExpandMoreIcon style={{verticalAlign: 'bottom', float: 'right'}}/> </div>;
        }
        return <div> TA <ExpandLessIcon style={{verticalAlign: 'bottom', float: 'right'}}/> </div>;
    }

    getInstructorButton(){
        if (this.state.hideInstructor){
            return <div> Instructor <ExpandMoreIcon style={{verticalAlign: 'bottom', float: 'right'}}/> </div>;
        }
        return <div> Instructor <ExpandLessIcon style={{verticalAlign: 'bottom', float: 'right'}}/> </div>;
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

            {/*<button onClick={()=>this.changeStudent()}> {this.getButton()} </button>*/}
            {/*<button onClick={()=>this.changeStudent()}> {this.getButton()} </button>*/}

                <span>
                    <ListItem onClick={()=>this.changeStudent()} button style={{ paddingRight: '0px' }}>
                        <ListItemText primary={this.getStudentButton()}/>
                    </ListItem>

                </span>
                {this.state.hideStudent ? null : StudentClass}

                <span>
                    <ListItem onClick={()=>this.changeTA()} button style={{ paddingRight: '0px' }}>
                        <ListItemText primary={this.getTAButton()}/>
                    </ListItem>
                </span>
                {this.state.hideTA ? null : TAClass}

                <span>
                    <ListItem onClick={()=>this.changeInstructor()} button style={{ paddingRight: '0px' }}>
                        <ListItemText primary={this.getInstructorButton()}/>
                    </ListItem>
                </span>
                {this.state.hideInstructor ? null : MyClass}

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
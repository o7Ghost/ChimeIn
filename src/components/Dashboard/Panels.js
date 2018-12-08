import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import AnswerField from './AnswerField.js';
import firebase from 'firebase';
import indigo from '@material-ui/core/colors/indigo'

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        marginRight: '2vw',
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

class SimpleExpansionPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questionItems: [],
            curClass:"",
            tabNum : 0
        };

        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        console.log("in panel constructor",this.props.curClass);
        this.classRef = this.firebaseRef.child(this.props.curClass);
        this.questionRef = this.classRef.child("questions");
        this.firebaseRef=this.questionRef;

        this.firebaseRef.on('value', dataSnapshot => {
            let questionItems = [];
            dataSnapshot.forEach(childSnapshot => {
                let questionItem = childSnapshot.val();
                questionItem['.key'] = childSnapshot.key;
                questionItems.push(questionItem);
            });
            this.setState({ questionItems });
        });
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }


    handleRemove(title) {
        this.firebaseRef.child(title).remove();
        console.log("remove clicked")
        this.refresh()
    }

    handleUpvote(title, currentLike, currentOrder) {
        
        var followerRef = this.firebaseRef.child(title);

        let followerlist = []
        followerRef.once('value',(snapshot) =>{
            const question = snapshot.val();
            console.log(question)
            if(question != null && question.followers ){
                followerlist = question.followers;
            }
            if(!followerlist.includes(this.props.db.auth().currentUser.uid)){
                followerlist.push(this.props.db.auth().currentUser.uid);
                this.firebaseRef.child(title).update({ followers: followerlist });
                this.firebaseRef.child(title).update({ upvoteCount: currentLike + 1, order: currentOrder - 1 });
            }else{
                alert("You have voted")
            }
            
        })
        
    }

    isTA(uid){
        //console.log('inside ista');
        let temp = [];
        var modClassRef = this.props.db.database().ref("User").child(uid).child('modClass');
        modClassRef.once('value', snapshot =>{
            snapshot.forEach(className=>{
                let temp2 = className.val();
                console.log("Creating array:" + temp2);
                temp.push(temp2);
                console.log("Array contains:" + temp);
            })
            //console.log(temp);
        });

        for (var i = 0; i < temp.length; ++i){
			console.log("in loop");
            if (temp[i] == this.props.curClass){
                return true;
            }
        }

        return false;
    }

    refresh(){
        
        console.log("in panel render", this.state.curClass);
        console.log(this.state.prevClass !== this.state.curClass);
        this.state.curClass = this.props.curClass;
        this.state.tabNum = this.props.tabNum;  //#####
        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        console.log("in panel render", this.state.curClass);
        this.classRef = this.firebaseRef.child(this.state.curClass);
        this.questionRef = this.classRef.child("questions");
        this.firebaseRef = this.questionRef;

        this.firebaseRef.orderByChild('order').on('value', dataSnapshot => {
            let questionItems = [];
            dataSnapshot.forEach(childSnapshot => {
                let questionItem = childSnapshot.val();
                if(this.state.tabNum == 0){
                    var today = new Date();
                    var questionDate = new Date(questionItem.timestamp);
                    today = today.toJSON().split("T")[0];
                    questionDate = questionDate.toJSON().split("T")[0];
                    console.log("today: " + today + " " + "question: " + questionDate);
                    console.log(questionItem.Question);
                    if(questionDate >= today){
                        questionItems.push(questionItem);
                    }
                }
                if(this.state.tabNum == 1){
                    questionItems.push(questionItem);
                }
                if(this.state.tabNum == 2){
                    if(questionItem.followers && questionItem.followers.includes(this.props.db.auth().currentUser.uid)){
                        questionItems.push(questionItem)
                    }
                }
                if(this.state.tabNum == 3){
                    if(questionItem.Answer){
                        questionItems.push(questionItem);
                    }
                }
                questionItem['.key'] = childSnapshot.key;
                    
            });
            console.log( "curClass->>>>>>>",this.state.curClass);
            this.setState({questionItems});
        })
    }

    render() {
  
        const { classes } = this.props;
        if( this.state.curClass !== this.props.curClass || this.state.tabNum !==this.props.tabNum ) {
            console.log("got in render hello");
            this.refresh()
        }
            const records = this.state.questionItems.map(items =>

                <div>
                    <ExpansionPanel style = {  { border:"#000"} }>
                        <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon/>}>
                        	<Typography className={classes.secondaryHeading}>
                                UPVOTES: {items.upvoteCount}
                            </Typography>
                            <Typography className={classes.heading}>{items.Question}</Typography>
                        </ExpansionPanelSummary>         



                                {items.Answer ? items.Answer.map(temp => <div><ExpansionPanelDetails><Typography color="primary">{temp}</Typography></ExpansionPanelDetails></div>) : null}






                            {this.isTA(this.props.db.auth().currentUser.uid) ? <div><ExpansionPanelDetails><AnswerField curClass ={this.props.curClass} Question={items.UID + "+" + items.timestamp} value={this.props.value}
                                         stateChange={this.props.stateChange} db={firebase}/></ExpansionPanelDetails></div> : null}

                        <Divider/>

                        <ExpansionPanelActions>
           
                           {/*console.log(this.isTA(this.props.db.auth().currentUser.uid))*/}
                            { this.props.db.auth().currentUser.uid  == items.UID  || this.isTA(this.props.db.auth().currentUser.uid) ? <Button size="small" color="secondary"
                                    onClick={() => this.handleRemove(items.UID + "+" + items.timestamp)}>
                                Remove
                            </Button> : null}

                            <Button size="small" color="primary"
                                    onClick={() => this.handleUpvote(items.UID + "+" + items.timestamp, items.upvoteCount, items.order)}>
                                Upvote: {items.upvoteCount}
                            </Button>

                        </ExpansionPanelActions>
                    </ExpansionPanel>
                </div>
            );

            return (
                <div>
                    {records}
                </div>
            );
    }
}

SimpleExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);

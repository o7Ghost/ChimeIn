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
            preClass: "",
            curClass:""
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
    }

    handleUpvote(title, currentLike) {
        this.firebaseRef.child(title).update({ upvoteCount: currentLike + 1 });
    }

    render() {
        //  cse 110 -> cse 120

        if(this.props.curClass !== this.state.curClass) {
            this.state.curClass = this.props.curClass;

        }
        console.log("preClass->", this.state.prevClass );
        console.log( "curClass->",this.state.curClass);
        // '' -> cse 110
        if( this.state.prevClass !== this.state.curClass) {
            this.firebaseRef = this.props.db.database().ref("ClassFinal");
            console.log("in panel render", this.state.curClass);
            this.classRef = this.firebaseRef.child(this.state.curClass);
            this.questionRef = this.classRef.child("questions");
            this.firebaseRef = this.questionRef;
            this.firebaseRef.on('value', dataSnapshot => {
                let questionItems = [];
                dataSnapshot.forEach(childSnapshot => {
                    let questionItem = childSnapshot.val();
                    if(this.props.tabNum == 0){
                        questionItems.push(questionItem);
                    }
                    if(this.props.tabNum == 1){


                    }
                    if(this.props.tabNum == 2){
                        if(questionItem.Answer){
                            questionItems.push(questionItem);
                        }
                    }
                    questionItem['.key'] = childSnapshot.key;
                    
                });
                console.log( "curClass->>>>>>>",this.state.curClass);
                this.state.prevClass = this.state.curClass;

                this.setState({questionItems});
            });
        }
            const records = this.state.questionItems.map(items =>

                <div>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>{items.Question}</Typography>
                           
                        </ExpansionPanelSummary>
                        

                        <ExpansionPanelDetails>
                            <div>
                                {items.Answer ? items.Answer.map(temp => <Typography color="primary">{temp}</Typography>) : null}

                            </div>
                        </ExpansionPanelDetails>

                        <ExpansionPanelDetails>

                            <AnswerField curClass ={this.props.curClass} Question={items.UID + "+" + items.timestamp} value={this.props.value}
                                         stateChange={this.props.stateChange} db={firebase}/>
                        </ExpansionPanelDetails>

                        <Divider/>

                        <ExpansionPanelActions>
                            <Button size="small" color="secondary"
                                    onClick={() => this.handleRemove(items.UID + "+" + items.timestamp)}>
                                Remove
                            </Button>

                            <Button size="small" color="primary"
                                    onClick={() => this.handleUpvote(items.UID + "+" + items.timestamp, items.upvoteCount)}>
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
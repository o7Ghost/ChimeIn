import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
    },
    button: {
        margin: '0 0 0 auto',
    },
});


class TextFields extends React.Component {
    constructor(props) {
        super(props);

        // 90,000
        this.statics = {
            cooldowntime: 90000 // change this field to change cooldown time
        };

        this.state = {
            buttonDisabled: false,
            open: false,
            notification: '',
            submitText: 'Submit',
            filterOpen: false,
            filtered: false,
            filterQuestion: [],
            checked: []
        };

        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        var classRef = this.firebaseRef.child(this.props.curClass);
        var questionRef = classRef.child("questions");
        this.questionRef = questionRef;

        // cooldown implementation on page opening
        var userRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid);
        userRef.once('value', (snapshot) => {

            var posttime = '2000-01-01T00:00:59.207Z'
            snapshot.val().lastPostTime ? posttime = new Date(snapshot.val().lastPostTime) :  posttime = '2000-01-01T00:00:59.207Z'

            //var posttime = new Date(snapshot.val().lastPostTime);
            var curTime = new Date();

            var diff = curTime - posttime;
            //console.log("xxxxooooooo"+ posttime);

            if(diff < this.statics.cooldowntime && diff > 0) {
                this.state.buttonDisabled = true;
                this.state.submitText = 'You can post again in 90 seconds';
                setTimeout(() => this.setState({ buttonDisabled: false, submitText: 'Submit' }), (this.statics.cooldowntime - diff));
            }
        });
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    //a method to push to firebase and then clean user input
    pushToFirebase(event) {
        console.log("Current question string1 is " + this.props.value.Question);
        const {UID, Question, upvoteCount, order, Answer, timestamp, followers} = this.props.value;
        //event.preventDefault();
        var time = new Date();
        var timeWithTimezone = time.toJSON();
        time = time.toJSON().split(".")[0];
        var cID = this.props.db.auth().currentUser.uid;
        let similar = [], postQuestion = true, x = 0;

        if((Question != '' && this.state.buttonDisabled == false) || this.state.filtered == true) {
            // filter start to work
            if (this.state.filtered == false)
                similar = this.postFilter(Question);
            else {
                this.setState({ filterOpen: false });
                this.setState({ filtered: false});
                let upvoteList = this.state.checked;
                for (x = 0; x < upvoteList.length; x++) {
                    if (upvoteList[x] != -1) {
                        postQuestion = false;
                        let tmp = this.state.filterQuestion[x][0];
                        console.log("Hello: " + tmp.Question + " " + tmp['.key'] + " " + tmp.upvoteCount + " " + tmp.order);
                        this.handleFilterUpvote(tmp['.key'], tmp.upvoteCount, tmp.order);
                    }
                }
                //this.setState({ filterQuestion: similar });
                //this.setState({ checked: similar});
            }

            console.log("Current question is " + Question);
            console.log("Current similar is " + similar.length);

            // no similar question, push to firebase directly
            if (similar.length == 0 && postQuestion) {
                this.questionRef.child( cID + "+" + time).set({UID: cID,
                    Question: Question, upvoteCount: upvoteCount, order:order, timestamp: time, followers: this.props.value.followers});

                // update user lastPostTime
                var userRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid);
                userRef.update({lastPostTime: timeWithTimezone});

                // after this submission, set button disabled with timeout function, 1s = 1000
                this.setState({buttonDisabled: true, submitText: 'You can post again in 90 seconds'});
                setTimeout(() => this.setState({ buttonDisabled: false, submitText: 'Submit' }), this.statics.cooldowntime);
                this.props.stateChange('');
            }
            // display similar question
            else if (similar.length != 0) {
                this.setState({ filtered: true });
                this.setState({ filterOpen: true });
                console.log("Current similar size is " + similar.length);
                console.log("Current questionFilter size is " + this.state.filterQuestion.length);
            }
            else {
                this.props.stateChange('');
            }
        }
        else if(Question == '' && this.state.buttonDisabled == false) {
            this.state.notification = 'Can not submit blank question';
            this.state.open = true;
            this.props.stateChange('');
        }
        else {
            this.setState({notification: 'You can post again in 90 seconds', open: true});
            this.props.stateChange('');
        }
    }

    handleFilterUpvote(title, currentLike, currentOrder) {
        var followerRef = this.questionRef.child(title);

        let followerlist = [];
        followerRef.once('value',(snapshot) =>{
            const question = snapshot.val();
            console.log(question)
            if(question != null && question.followers ){
                followerlist = question.followers;
            }
            if(!followerlist.includes(this.props.db.auth().currentUser.uid)){
                followerlist.push(this.props.db.auth().currentUser.uid);
                this.questionRef.child(title).update({ followers: followerlist });
                this.questionRef.child(title).update({ upvoteCount: currentLike + 1, order: currentOrder - 1 });
            }else{
                this.state.notification = 'You have voted one or more questions you just selected!';
                this.state.open = true;
            }

        })

    }

    getNoneStopWords(sentence) {
        let common = this.getStopWords(), uncommonArr = [], commonObj = {}, word, i;
        if (sentence == null)
            return uncommonArr;

        let wordArr = sentence.match(/\w+/g);
        if (wordArr == null)
            return uncommonArr;

        for (i = 0; i < common.length; i++) {
            commonObj[ common[i].trim() ] = true;
        }

        for (i = 0; i < wordArr.length; i++) {
            word = wordArr[i].trim().toLowerCase();
            if (!commonObj[word]) {
                uncommonArr.push(word);
            }
        }
        return uncommonArr;
    }

    getNumDuplicate(str, common) {
        if (str == null)
            return 0;

        let wordArr = str.match(/\w+/g), commonObj = {}, uncommonArr = [], word, i;

        if (wordArr == null)
            return 0;

        for (i = 0; i < common.length; i++) {
            commonObj[ common[i].trim() ] = true;
        }

        for (i = 0; i < wordArr.length; i++) {
            word = wordArr[i].trim().toLowerCase();
            if (commonObj[word]) {
                uncommonArr.push(word);
            }
        }
        return uncommonArr.length;
    }

    getStopWords() {
        return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and",
            "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear",
            "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has",
            "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it",
            "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my",
            "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own",
            "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the",
            "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants",
            "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with",
            "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't",
            "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've",
            "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's",
            "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've",
            "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's",
            "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't",
            "would've", "wouldn't", "you'd", "you'll", "you're", "you've", "t", "ve", "d", "ll", "s", "m", "re"];
    }

    postFilter(input){
        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        var classRef = this.firebaseRef.child(this.props.curClass);
        var questionRef = classRef.child("questions");
        let questionItems = [], filter = [], filterIndex = [];

        questionRef.once('value', dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                let questionItem = childSnapshot.val();
                var today = new Date();
                var questionDate = new Date(questionItem.timestamp);
                questionItem['.key'] = childSnapshot.key;
                today = today.toJSON().split("T")[0];
                questionDate = questionDate.toJSON().split("T")[0];
                console.log("today: " + today + " " + "question: " + questionDate);
                console.log(questionItem.Question);
                if(questionDate >= today){
                    questionItems.push(questionItem);
                }
            });

            // start to filter
            let validWords = this.getNoneStopWords(input), i, k, times = 0;

            if(input != "") {
                for (i = 0; i < questionItems.length; i++) {
                    let temp = this.getNumDuplicate(questionItems[i].Question, validWords);
                    if (temp != 0) {
                        filter.push([questionItems[i], temp, -1]);
                    }
                }

                filter.sort(function(a, b) {
                    if (a[1] != b[1])
                        return b[1]-a[1];
                })

                for (k = 0; k < filter.length; k++) {
                    filterIndex.push(-1);
                    filter[k][2] = k;
                }


                /*if (filter.length == 0)
                    alert("There is no similar question. Please submit your question!");
                else {
                    for (i = 0; i < filter.length; i++)
                        alert("------FILTER #" + (i+1) + "------\n\n" + filter[i][0].Question);
                }*/
            }
            console.log("Inside post filter, filter is " + filter);
            console.log("Inside post filter, filterIndex is " + filterIndex);
            this.setState({filterQuestion: filter});
            this.setState({checked: filterIndex});
            console.log("Inside post filter, filterQuestion is " + this.state.filterQuestion);
            console.log("Inside post filter, filterIndex is " + this.state.checked);
        });

        return filter;
    }

    handleFilterClose = () => {
        this.setState({ filterOpen: false });
        this.setState({ filtered: false});
    };

    /*
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    */

    _handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            if(this.state.buttonDisabled == false) {
                this.pushToFirebase();
                this.setState({Question: '', upvoteCount: 0});
            }
            else {
                this.setState({notification: 'You can post again in 90 seconds', open: true});
            }
        }
    }

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ open: false });
    };

    handleToggle = value => () => {
        console.log("Current filter question is " + this.state.filterQuestion);
        console.log("Current checked is " + this.state.checked);
        console.log("Current value is " + this.value);
        let tempChecked = this.state.checked;
        let currentIndex = tempChecked[value];

        if (currentIndex === -1) {
            tempChecked[value] = 1;
        } else {
            tempChecked[value] = -1;
        }

        console.log("Current checked is " + tempChecked);
        this.setState({checked: tempChecked});
        console.log("Current checked is " + this.state.checked);
        console.log("Current question order is " + this.state.filterQuestion.Question);
    };

//, upvoteCount: this.props.value.upvoteCount
    //value= { this.props.value.Question.replace(/_b/g, '\n') }
    render() {
        {var s = '\n';
            console.log("in text field", this.props.curClass);}
        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        this.classRef = this.firebaseRef.child(this.props.curClass);
        this.questionRef = this.classRef.child("questions");
        this.firebaseRef=this.questionRef;
        const questions = this.state.filterQuestion.map(items =>
            <div>
                <ListItem key={items[2]} role={undefined} dense button onClick={this.handleToggle(items[2])}>
                    <Checkbox
                        checked={this.state.checked[items[2]] !== -1}
                        tabIndex={-1}
                        disableRipple
                    />
                    <ListItemText primary={items[0].Question} />
                </ListItem>
            </div>
        );


        const { classes } = this.props;
        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField value = { this.props.value.Question}
                               id="outlined-multiline-flexible"
                               label="Type Your Question"
                               placeholder="Placeholder"
                               multiline
                               className={classes.textField}
                               margin="normal"
                               variant="outlined"
                               fullWidth
                               onChange = {e => this.props.stateChange((e.target.value))}
                               onKeyPress={this._handleKeyPress}/>

                    <Button variant="outlined" id="submitButton" href="#" className={classes.button}
                            onClick={this.pushToFirebase.bind(this)} disabled={this.state.buttonDisabled}>
                        {this.state.submitText}
                    </Button>
                </form>

                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={this.state.open}
                    autoHideDuration={4500}
                    onClose={this.handleClose}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span id="message-id">{this.state.notification}</span>}
                />

                <Dialog
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose}
                    scroll="paper"
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogTitle id="scroll-dialog-title">Auto Filter</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Some similar questions have been found. Please go through them and decide to upvote or post:
                        </DialogContentText>
                        <List>
                            {questions}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleFilterClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.pushToFirebase.bind(this)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    componentDidMount(){
        this.updateButton();
    }

    updateButton = ()=> {
        let currComponent = this;
        var allowPostRef = this.props.db.database().ref("ClassFinal").child(this.props.curClass).child("allowPost");
        var userRef = this.props.db.database().ref("User").child(this.props.db.auth().currentUser.uid);
        
        allowPostRef.on('value', snapshot=>{
            if (!snapshot.val()){
                currComponent.setState({buttonDisabled: true, submitText: 'This class is currently closed.'});
            }
            else{
                userRef.once('value', (snapshot) => {
                    var posttime = '2000-01-01T00:00:59.207Z'
                    snapshot.val().lastPostTime ? posttime = new Date(snapshot.val().lastPostTime) :  posttime = '2000-01-01T00:00:59.207Z'
        
                    //var posttime = new Date(snapshot.val().lastPostTime);
                    var curTime = new Date();
        
                    var diff = curTime - posttime;
                    //console.log("xxxxooooooo"+ posttime);
        
                    if(diff < currComponent.statics.cooldowntime && diff > 0) {
                        currComponent.state.buttonDisabled = true;
                        currComponent.state.submitText = 'You can post again in 90 seconds';
                        setTimeout(() => currComponent.setState({ buttonDisabled: false, submitText: 'Submit' }), (this.statics.cooldowntime - diff));
                    }
                    else{
                        currComponent.setState({buttonDisabled: false, submitText: 'Submit'});
                    }
                });
            }
        });

        userRef.once('value', (snapshot) => {
            var posttime = '2000-01-01T00:00:59.207Z'
            snapshot.val().lastPostTime ? posttime = new Date(snapshot.val().lastPostTime) :  posttime = '2000-01-01T00:00:59.207Z'

            //var posttime = new Date(snapshot.val().lastPostTime);
            var curTime = new Date();

            var diff = curTime - posttime;
            //console.log("xxxxooooooo"+ posttime);

            if(diff < currComponent.statics.cooldowntime && diff > 0) {
                currComponent.state.buttonDisabled = true;
                currComponent.state.submitText = 'You can post again in 90 seconds';
                setTimeout(() => currComponent.setState({ buttonDisabled: false, submitText: 'Submit' }), (this.statics.cooldowntime - diff));
            }
        });
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
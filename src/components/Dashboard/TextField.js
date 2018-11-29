import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
    },
    button: {
        margin: '0 0 0 auto',
    }
});


class TextFields extends React.Component {
    constructor(props) {
        super(props);

        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        var classRef = this.firebaseRef.child(this.props.curClass);
        var questionRef = classRef.child("questions");
        this.firebaseRef = questionRef;
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }
    //a method to push to firebase and then clean user input
    pushToFirebase(event) {
        const {UID, Question, upvoteCount, Answer, timestamp} = this.props.value;
        event.preventDefault();
        var time = new Date();
        time = time.toJSON().split(".")[0];
        var cID = this.props.db.auth().currentUser.uid;

        if(Question != '') {
            console.log("current question is " + this.props.value.Question);
            this.firebaseRef.child( cID + "+" + time).set({UID: cID,
                Question: Question, upvoteCount: upvoteCount, timestamp: time});
        }

        this.props.stateChange('');
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
        let questionItems = [];

        questionRef.once('value', dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                let questionItem = childSnapshot.val();
                questionItem['.key'] = childSnapshot.key;
                questionItems.push(questionItem);
            });

            // start to filter
            let filter = [], validWords = this.getNoneStopWords(input), i, times = 0;

            if (input == "")
                alert("Please enter a question to filter!");
            else {
                for (i = 0; i < questionItems.length; i++) {
                    //console.log(this.state.posts[i].content);
                    let temp = questionItems[i].Question;
                    filter.push([temp, this.getNumDuplicate(temp, validWords)]);
                }

                filter.sort(function(a, b) {
                    if (a[1] != b[1])
                        return b[1]-a[1];
                })

                for (i = 0; i < filter.length; i++) {
                    if (filter[i][1] != "0") {
                        alert("------FILTER #" + (i+1) + "------\n\n" + filter[i][0]);
                        times = 1;
                    }
                }

                if (times == 0)
                    alert("There is no similar question. Please submit your question!");
            }
        });

    }

    /*
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    */
//, upvoteCount: this.props.value.upvoteCount
    //value= { this.props.value.Question.replace(/_b/g, '\n') }
    render() {
        {var s = '\n';
        console.log("in text field", this.props.curClass);}
        this.firebaseRef = this.props.db.database().ref("ClassFinal");
        this.classRef = this.firebaseRef.child(this.props.curClass);
        this.questionRef = this.classRef.child("questions");
        this.firebaseRef=this.questionRef;

        const { classes } = this.props;
        return (
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
                        onClick={this.pushToFirebase.bind(this)}>
                    Submit
                </Button>
                <Button variant="outlined" id="filterButton" href="#" className={classes.button}
                        onClick={() => this.postFilter(this.props.value.Question)}>
                    Filter
                </Button>
            </form>

        );
    }

}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);

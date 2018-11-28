import React from 'react';
<<<<<<< HEAD
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
            addCode: ''
        };


        this.firebaseRef = this.props.db.database().ref("User").child("M20Fryhk7OSHWcJIDa1Z994h12A3");
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
        var classRef = this.props.db.database().ref("ClassFinal").child(this.state.addCode);

        // check if the there is actually this class entered by user. by using .on and snapshot
        classRef = classRef.child("addCode");
        classRef.on('value', snapshot => {
            if( snapshot.val() == null) {
                this.setState({ open: false});
            }
            else {
                console.log("SUSUSSUSUSU");
            }
        });
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
                            ClassName + 6-Digit-ID (Don't forget the plus sign)
                        </DialogContentText>
                        <DialogContentText>
                            For example: CSE30+ABCDEF
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Course Code"
                            type="email"
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
=======
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class IntegrationAutosuggest extends React.Component {
  state = {
    single: '',
    popper: '',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search a country (start with a)',
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <div className={classes.divider} />
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            label: 'Label',
            placeholder: 'With Popper',
            value: this.state.popper,
            onChange: this.handleChange('popper'),
            inputRef: node => {
              this.popperNode = node;
            },
            InputLabelProps: {
              shrink: true,
            },
          }}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Popper anchorEl={this.popperNode} open={Boolean(options.children)}>
              <Paper
                square
                {...options.containerProps}
                style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
              >
                {options.children}
              </Paper>
            </Popper>
          )}
        />
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
>>>>>>> master

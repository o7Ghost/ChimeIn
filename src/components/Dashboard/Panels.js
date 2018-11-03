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
            questionItems: []
        };


        this.firebaseRef = this.props.db.database().ref("UserQuestions");
        this.firebaseRef.on('value', dataSnapshot => {
            let questionItems = [];
            dataSnapshot.forEach(childSnapshot => {
            let questionItem = childSnapshot.val();
            questionItem['.key'] = childSnapshot.key;
            questionItems.push(questionItem);
            });
        this.setState({questionItems});
        });

    }

    componentWillUnmount() {
      this.firebaseRef.off();
    }

  render() {

    const records = this.state.questionItems.map(items =>
        <div>

            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{items.Question}</Typography>
            </ExpansionPanelSummary>


          <ExpansionPanelDetails>      
            <Typography>
              Answer : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </Typography> 
          </ExpansionPanelDetails>

          <Divider />

          <ExpansionPanelActions>
            <Button size="small" color="secondary">
              Remove
            </Button>
            <Button size="small" color="primary">
              Answer
            </Button>
            <Button size="small" color="primary">
              Upvote
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
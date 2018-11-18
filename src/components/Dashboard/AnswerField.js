import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    container: {

        display: 'flex',
        flexWrap: 'wrap',
        width: '100vw',
    },
    textField: {
        width: '70vw',
    },
    button: {
        //marginRight:0,
    }
});


class TextFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Question: '',
            upvoteCount: 0
        };


    }

    componentWillUnmount() {

    }
    //a method to push to firebase and then clean user input
    pushToFirebase(event) {

    }
    /*
      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
    */

    render() {
        {
            var s = '\n';
            console.log(s.charCodeAt(0));
        }

        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Type Your Answer"
                        placeholder="Placeholder"
                        multiline
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                    </Grid>
                    <Grid>
                    <Button className={classes.button} size="small" color="primary">
                        Answer
                    </Button>
                    </Grid>
                    
                </Grid>
                
                
            </form>

           

        );
    }

}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TextFields);
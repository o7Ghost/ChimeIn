import React from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider,createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { red, green } from '@material-ui/core/colors';

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    input: {
        display: 'none',
    },
});

const themeStart = createMuiTheme({
    palette: {
      primary: green,
    },
});

const themeStop = createMuiTheme({
    palette: {
      primary: red,
    },
});

class StartStopButton extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            active: false
        };

        this.curClassRef = this.props.db.database().ref("ClassFinal").child(this.props.curClass);
    }

    handleClick = () =>{
        this.curClassRef.update({allowPost: !this.state.active});
        this.setState({active: !this.state.active});
    }

    render(){
        const startButton = (
        <MuiThemeProvider theme={themeStart}> 
            <Button variant="contained" color="primary" className={styles.button} onClick={this.handleClick}>Start</Button>
        </MuiThemeProvider>);

        const stopButton = (
            <MuiThemeProvider theme={themeStop}>
                <Button variant="contained" color="primary" className={styles.button} onClick={this.handleClick}>Stop</Button>
            </MuiThemeProvider>
        );

        return(
            this.state.active ? stopButton : startButton
        );
    }
}

StartStopButton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StartStopButton);
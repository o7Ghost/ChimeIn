import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Panels from './Panels.js';
import TextField from './TextField.js';
import firebase from 'firebase';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        height: '68vh',
        overflow: 'auto',
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
});

class CustomizedTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: 0
        };

        this.handleSelect = this.handleSelect.bind(this)
    }


    handleSelect(key) {
        alert(`selected ${key}`);
        this.setState({ key});
        console.log("in Tab",key);
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <Tabs
                    activeKey = {this.state.key}
                    value={this.value}
                    onSelect={this.handleSelect}
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                >
                    <Tab
                        eventKey={1}
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        label="All"
                        value ="All"
                    />
                    <Tab
                        eventKey={2}
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        label="Followed"
                        value = "Followed"
                    />
                    <Tab
                        eventKey={3}
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        label="Answered"
                        value = "Answered"
                    />
                </Tabs>

                {value === 0 && <TabContainer> <Panels curClass ={this.props.curClass}  value={this.props.value} stateChange = {this.props.stateChange} db={firebase}/> </TabContainer>}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>}



            </div>
        );
    }
}

CustomizedTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTabs);

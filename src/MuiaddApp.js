import React, {Component} from 'react'
import {observer} from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App'
import mobx from 'mobx'
import _ from 'lodash'

class MuiaddApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {
        return (
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
        );
    }
}

export default observer(MuiaddApp)
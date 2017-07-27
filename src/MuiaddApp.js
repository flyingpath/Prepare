import React from 'react'
import {observer} from 'mobx-react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import foreseeTheme from './foresee_theme'
import App from './App'


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
            <MuiThemeProvider muiTheme={foreseeTheme}>
                <App/>
            </MuiThemeProvider>
        );
    }
}

export default observer(MuiaddApp)
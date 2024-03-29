import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import prepareTheme from './theme/prepare_theme'
import {observer} from 'mobx-react'

import Route from './Route'
import TitleBar from './TitleBar'
import dataStore from './store/data';
import optionStore from './store/option'
import styled from 'styled-components';
import './css/all.scss'

@observer
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawer: false
        }
        this.drawerToggle = this.drawerToggle.bind(this)
    }

    componentWillMount() {
        optionStore.setCancerList()
    }

    drawerToggle() {
        const status = this.state.drawer
        this.setState({
            drawer: !status
        })
    }

    render() {
        const page = dataStore.page
        const MaterialAvatarWithStyled = styled(Avatar).attrs({
            className: 'AvatarPics'
        })`
                 margin: 12px;
                 left: 1%;
                 position: relative;
        `
        return (
            <div className="App" id='prepare-app-root'>
                <MuiThemeProvider muiTheme={prepareTheme}>
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <TitleBar />    
                        {<Route page={page} />}
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App;

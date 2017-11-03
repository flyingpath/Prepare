import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import prepareTheme from './theme/prepare_theme'
import {observer} from 'mobx-react'

import Route from './Route'
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

    componentWillMount(){
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
        console.log(page)
        return (
            <div className="App" id='prepare-app-root'>
                <MuiThemeProvider muiTheme={prepareTheme}>
                    <div style={{
                        height: '100%',
                        display: 'block',
                        position: 'relative'
                    }}>
                        <AppBar
                            title="PREPARE"
                            onLeftIconButtonTouchTap={() => {
                            }}
                            style={{height: '60px'}}
                        >
                            <MaterialAvatarWithStyled/>
                        </AppBar>
                        <Route
                            page={page}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App;

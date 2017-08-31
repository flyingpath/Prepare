import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
// import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import prepareTheme from './theme/prepare_theme'
// import MenuItem from 'material-ui/MenuItem';
import {observer} from 'mobx-react'
import environment from './store/createRelayEnvironment';
import {
    QueryRenderer,
    graphql
} from 'react-relay';

import Route from './Route'
import dataStore from './store/data';
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


    drawerToggle() {
        const status = this.state.drawer
        this.setState({
            drawer: !status
        })
    }

    render() {

        const page = dataStore.page
        const cancer = dataStore.cancer
        const feature = dataStore.feature

        const ErrorMessageDiv = styled.div`
                font-size:50px;
                color:red;
                position:relative;
                text-align:center;
                top:25%
        `;

        const MaterialAvatarWithStyled = styled(Avatar).attrs({
            className: 'AvatarPics'
        })`
                 margin: 12px;
                 left: 1%;
                 position: relative;
        `


        return (
            <div className="App" id='prepare-app-root'>
                <QueryRenderer
                    environment={environment}
                    variables={{cancer: cancer.value, feature: feature}}
                    query={graphql.experimental`
                        query AppQuery ($cancer:String, $feature:String){
                            viewer {
                                ...CancerSelector_viewer
                                ...FeatureSelector_viewer @arguments(cancer: $cancer)
                                ...Report_viewer @arguments(cancer: $cancer, feature:$feature)
                            }
                        }
                    `}
                    render={({error, props}) => {
                        if (false) {
                            return <ErrorMessageDiv>{error.message}</ErrorMessageDiv>;
                        } else {
                            return (
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
                                            cancer={cancer}
                                            feature={feature}
                                            inherit={props}
                                        />
                                    </div>
                                </MuiThemeProvider>
                            )
                        }
                    }}
                />
            </div>
        )
    }
}

export default App;

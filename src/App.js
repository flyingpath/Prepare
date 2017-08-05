import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
// import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import prepareTheme from './theme/prepare_theme'
// import MenuItem from 'material-ui/MenuItem';
import { observer } from 'mobx-react'
import environment from './store/createRelayEnvironment';
import {
    QueryRenderer,
    graphql
} from 'react-relay';

import Route from './Route'
import dataStore from './store/data';

import './css/all.css'

@observer
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawer: false
        }
        this.drawerToggle = this.drawerToggle.bind(this)
    }



    drawerToggle(){
        const status = this.state.drawer
        this.setState({
            drawer: !status
        })
    }

    

    render() {

        const page = dataStore.page
        const cancer = dataStore.cancer
        const feature = dataStore.feature

        
        return (
            <div className="App" id = 'prepare-app-root'>
                <QueryRenderer
                    environment={environment}
                    variables={{ cancer: cancer.value, feature: feature }}
                    query={graphql.experimental`
                        query AppQuery ($cancer:String, $feature:String){
                            viewer {
                                ...CancerSelector_viewer
                                ...FeatureSelector_viewer @arguments(cancer: $cancer)
                                ...Report_viewer @arguments(cancer: $cancer, feature:$feature)
                            }
                        }
                    `}
                    render={({ error, props }) => {
                        if (error) {
                            return <div>{error.message}</div>;
                        } else {
                            return (
                                <MuiThemeProvider muiTheme={prepareTheme}>
                                    <div>
                                        <AppBar title="PREPARE" onLeftIconButtonTouchTap={()=>{}} >
                                            <Avatar
                                                className="AvatarPics"
                                                size={30}
                                                style={{
                                                    margin: '12px',
                                                    left: '1%',
                                                    height: '40px',
                                                    width: '40px',
                                                    position: 'relative'
                                                }}
                                            />
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

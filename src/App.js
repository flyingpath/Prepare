import React, {Component} from 'react';
import BottomNavigation from './footer_navigation'
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import PrepareCard from './card'
import { Button } from 'reactstrap';
import MenuItem from 'material-ui/MenuItem';
import {observer} from 'mobx-react'
import environment from './createRelayEnvironment';
import * as mobx from 'mobx'
import {
    QueryRenderer,
    graphql
} from 'react-relay';

import CancerSelector from './CancerSelector';
import FeatureSelector from './FeatureSelector';
import Report from './Report';
import drawerControl from './store/drawer_control'
import dataStore from './store/data';
// import Feed from './Feed'

import './css/all.css'

@observer
class App extends Component {
    // state = {
    //   cancer: ''
    // }

    // variables={cancer: cancer, feature: feature}
    render() {

        const cancer = dataStore.cancer
        const feature = dataStore.feature
        const drawerControl_ob = drawerControl.drawerToggle
        const amaPics = 'src/pics/uxceomom-128.jpg'
        const setDrawerToggle = (val) => {
            drawerControl.handleToggle(val)
        }
        console.log(mobx.toJS(amaPics));
        return (
            <div className="App">
                <QueryRenderer
                    environment={environment}
                    variables={{cancer: cancer, feature: feature}}
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
                        if (error) {
                            return <div>{error.message}</div>;
                        } else if (props) {
                            return (
                                <div>
                                    <AppBar
                                        title="PREPARE"
                                        onLeftIconButtonTouchTap={() => {
                                           setDrawerToggle(drawerControl_ob)
                                        }}
                                    >
                                        <Avatar
                                            src={amaPics}
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
                                    <PrepareCard/>
                                    <CancerSelector
                                        cancer={cancer}
                                        viewer={props.viewer}/>
                                    <FeatureSelector
                                        cancer={cancer}
                                        feature={feature}
                                        viewer={props.viewer}/>
                                    {/*<Button outline color="primary">primary</Button>{' '}*/}
                                    <Report
                                        cancer={cancer}
                                        feature={feature}
                                        viewer={props.viewer}/>
                                    {/*<BottomNavigation />*/}
                                    <Drawer
                                        docked={false}
                                        width={200}
                                        open={drawerControl.drawerToggle}
                                        onRequestChange={() => {
                                            setDrawerToggle(drawerControl.drawerToggle)
                                        }}
                                    >
                                        <MenuItem onTouchTap={() => {
                                            setDrawerToggle(drawerControl.drawerToggle)
                                        }}>User Setting</MenuItem>
                                        <MenuItem onTouchTap={() => {
                                            setDrawerToggle(drawerControl.drawerToggle)
                                        }}>History</MenuItem>
                                    </Drawer>
                                </div>)
                        }
                        return <div>Loading</div>;
                    }}
                />
            </div>
        );
    }
}

export default App;

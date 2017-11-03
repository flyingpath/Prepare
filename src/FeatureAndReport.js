import React, {Component} from 'react'
import {observer} from 'mobx-react'
import mobx from 'mobx'
import _ from 'lodash'
import ColorBrickLoading from './color_brick_loading'
import FlatButton from 'material-ui/FlatButton'

import dataStore from './store/data';
import FeatureSelector from './FeatureSelector';
import Report from './Report';
import styled from 'styled-components';
import {h1Title} from "./styled_share";

class FeatureAndReport extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const report = dataStore.load? <div style={{height:'100%'}}><ColorBrickLoading /></div>:<Report  key='report' />
        return (
            <div style={{height:'100%'}}>
                <FeatureSelector
                    key='featureSelect'
                />
                {report}
                <div style={{textAlign:'center'}}>
                <FlatButton onClick={()=>{dataStore.fetchSurvival()}} label="Calculate" primary={true} />
                </div>
            </div>
        );
    }
}

export default observer(FeatureAndReport)
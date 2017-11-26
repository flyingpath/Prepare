import React, {Component} from 'react'
import {observer} from 'mobx-react'
import mobx from 'mobx'
import _ from 'lodash'
import ColorBrickLoading from './color_brick_loading'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components';

import {h1Title} from "./styled_share";
import FeatureSelector from './FeatureSelector';
import LineReport from './LineReport';
import BarReport from './BarReport';
import dataStore from './store/data';

class FeatureAndReport extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        dataStore.fetchSurvival()
    }

    render() {

        let constent 

        if (dataStore.load){
            constent = (
                    <ColorBrickLoading />
            ) 
        } else if ( dataStore.reportType === 'line'){
            constent =(
                <div style={{height: '100%'}}>
                    <FeatureSelector
                        key='featureSelect'
                    />
                    <LineReport />
                </div>
            )
        } else if ( dataStore.reportType === 'bar'){
            constent =(
                <div style={{height: '100%'}}>
                    <BarReport />
                </div>
            )
        } else {
            constent =(
                <div style={{height: '100%'}}>
                    <FeatureSelector
                        key='featureSelect'
                    />
                    <LineReport />
                </div>
            )            
        }
        return constent
    }
}

export default observer(FeatureAndReport)
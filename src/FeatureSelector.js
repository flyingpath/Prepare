import React from 'react';
import Select from 'react-select';
import {observer} from 'mobx-react'
import 'react-select/dist/react-select.css';
import styled from 'styled-components'
import Paper from 'material-ui/Paper'
import _ from 'lodash'

import BinaryCheckbox from './components/BinaryCheckbox'
import {h1Title} from "./styled_share"

import dataStore from './store/data';
import optionStore from './store/option'
import './css/all.css'

class FeatureSelector extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){
         //--- 權宜之計 記得改回
        //
        // features = _.filter(features, (f)=>f.isAnalysis)
        // console.log(features);    
    }
    setFeature(feature) {
        return ( bool )=>{
            dataStore.setActionFeature(feature, bool)
        }
    }

    render() {
        const features = optionStore.featureList
        const valueObj = dataStore.actionFeature
        const cancer = dataStore.cancer

        return (
            <div>
                <Paper className="Paper_container" style={{backgroundColor: '#fff', padding:'8px 16px'}}>
                <div style={{display:'flex', flexFlow:'row wrap'}}>
                {
                    _.map(features, (data, idx)=>{
                        return(
                            <div key={idx} style={{width: '50%'}}>
                                <div>
                                    {data.name_cn}
                                </div>
                                <BinaryCheckbox 
                                    value={valueObj[data.feature]}
                                    onClick={this.setFeature(data.feature)}
                                    data = {data.option_cn}
                                    className='featureSelectorDiv'
                                />
                            </div>
                        )
                    })
                }
                </div>
                <div>
                    * 此處的資料統計來源均做過手術治療
                </div>
                </Paper>
            </div>
        );
    }
}

export default observer(FeatureSelector)

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
        dataStore.fetchSurvival()
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

        const H1Title = styled.h1`
            ${() => h1Title()}
        `

        return (
            <div>
                <H1Title>{`治療選項 (${cancer.label})`}</H1Title>
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
                </Paper>
            </div>
            // <Select
            //     options={features}
            //     placeholder="您對哪個變項感興趣？"
            //     onChange={this.onChange.bind(this)}
            //     value={dataStore.feature}
            //     searchable={false}
            // />
        );
    }
}

export default observer(FeatureSelector)

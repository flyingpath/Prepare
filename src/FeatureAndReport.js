import React, { Component } from 'react' 
import {observer} from 'mobx-react' 
import mobx from 'mobx' 
import _ from 'lodash' 

import FeatureSelector from './FeatureSelector';
import Report from './Report';

class FeatureAndReport extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {

        const cancer = this.props.cancer
        const feature = this.props.feature
        const viewer = this.props.viewer
        const loading = this.props.loading

        console.log(cancer);

        return (
            <div>
                <h1 style={{padding: '1%', margin: '4%', fontWeight: '600', fontSize:'1.4rem'}}>
                    {cancer.label}
                </h1>
                <FeatureSelector
                    key='featureSelect'
                    cancer={cancer}
                    feature={feature}
                    viewer={viewer}
                />
                <Report
                    key='report'
                    cancer={cancer}
                    feature={feature}
                    viewer={viewer}
                    loading={loading}
                />
            </div>
        );
    }
}

export default FeatureAndReport
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import mobx from 'mobx'
import _ from 'lodash'

import FeatureSelector from './FeatureSelector';
import Report from './Report';
import styled from 'styled-components';
import {h1Title} from "./styled_share";

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

        const H1Title = styled.h1`
            ${() => h1Title()}
        `

        console.log(cancer);

        return (
            <div>
                <H1Title>
                    {cancer.label}
                </H1Title>
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
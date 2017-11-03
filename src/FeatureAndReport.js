import React, {Component} from 'react'
import {observer} from 'mobx-react'
import mobx from 'mobx'
import _ from 'lodash'

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

        return (
            <div>
                <FeatureSelector
                    key='featureSelect'
                />
                <Report
                    key='report'
                />
            </div>
        );
    }
}

export default FeatureAndReport
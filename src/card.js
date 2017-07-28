import Paper from 'material-ui/Paper';
import React, {Component} from 'react';
import {
    QueryRenderer,
    graphql
} from 'react-relay';
import dataStore from './store/data';

import CancerSelector from './CancerSelector';
// import Feed from './Feed'

import './css/all.css'

const style = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const PreparePaper = () => (
    <div>
        <Paper style={style} zDepth={1}>
            <CancerSelector
                cancer={cancer}
                viewer={props.viewer}/>
        </Paper>
    </div>
);

export default PreparePaper;
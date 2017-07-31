import React, {Component} from 'react'
import {observer} from 'mobx-react'
import React from 'react';
import Paper from 'material-ui/Paper';
import mobx from 'mobx'
import _ from 'lodash'

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const PaperContainer = () => {
    return (<div>
        <Paper style={style} zDepth={1}/>
        <Paper style={style} zDepth={2}/>
        <Paper style={style} zDepth={3}/>
        <Paper style={style} zDepth={4}/>
        <Paper style={style} zDepth={5}/>
    </div
    >)
}

export default observer(PaperContainer)
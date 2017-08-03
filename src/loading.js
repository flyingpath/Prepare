import React, { Component } from 'react' 
import {observer} from 'mobx-react' 
import mobx from 'mobx' 
import _ from 'lodash'

import './css/loading_prepare.css'

class Loading_prepare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {
        return (
            <div className="loader">
                <div className="logo">
                    <div className="white" />
                    <div className="orange" />
                    <div className="red" />
                </div>
                <p>Loading</p>
            </div>

        );
    }
}

export default observer(Loading_prepare)
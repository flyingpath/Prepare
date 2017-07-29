import React, { Component } from 'react' 
import {observer} from 'mobx-react'
import AppBar from 'material-ui/AppBar';
import mobx from 'mobx' 
import _ from 'lodash' 

class TabBar extends React.Component {
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
            <AppBar
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        );
    }
}

export default TabBar
import React, {Component} from 'react'
import './css/circle_loading.scss'

class CircleLoading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {
        return (
            <div className="loading" />
        );
    }
}

export default CircleLoading
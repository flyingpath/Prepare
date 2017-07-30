import React from 'react'
import _ from 'lodash'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CancerSelector from './CancerSelector';
import KeyInfo from './KeyInfo'
import FeatureSelector from './FeatureSelector';
import Report from './Report';

class Route extends React.Component {
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
        const page = this.props.page
        const cancer = this.props.cancer
        const feature = this.props.feature
        const viewer = this.props.viewer

        let content

        if (page === 'cancer'){
            content = (
                <CancerSelector
                    cancer={cancer}
                    viewer={viewer} 
                />
            )                
        }else if (page === 'info'){
            content = (
               <KeyInfo />                    
            )
        }else if (page === 'featureAndReport'){
            content = (
                <div>
                    <FeatureSelector
                        cancer={cancer}
                        feature={feature}
                        viewer={viewer} 
                    />
                    <Report
                        cancer={cancer}
                        feature={feature}
                        viewer={viewer} 
                    />
                </div>
            )
        }

        return (
            <div>
                <ReactCSSTransitionGroup 
                    transitionName="prepare_route_page" 
                    transitionEnterTimeout={250} 
                    transitionLeaveTimeout={250} 
                > 
                    {content}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}



export default Route
import React from 'react'
import _ from 'lodash'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CancerSelector from './CancerSelector';
import KeyInfo from './KeyInfo'
import FeatureSelector from './FeatureSelector';
import Report from './Report';

import './css/route_page.css'

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
        
        const inherit = this.props.inherit
        

        let content

        if (inherit){
            const viewer = inherit.viewer
            
            if (page === 'cancer'){
                content = (
                    <CancerSelector
                        key = 'CancerSelector'
                        cancer={cancer}
                        viewer={viewer} 
                    />
                )                
            }else if (page === 'info'){
                content = (
                <KeyInfo key = 'KeyInfo' />                    
                )
            }else if (page === 'featureAndReport'){
                content = (
                    <div key = 'featureAndReport'>
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
        }
       

        return (
            <div className='page_test'>
                <ReactCSSTransitionGroup 
                    transitionName="prepare_route_page" 
                    transitionEnterTimeout={1000} 
                    transitionLeaveTimeout={1} 
                > 
                    {content}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}



export default Route
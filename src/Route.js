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
        this.handleClick = this.handleClick.bind(this)
        // this.content
        // this.inherit
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {
        let transitionClass = "prepare_route_page"

        const page = 'info'
        const cancer = this.props.cancer
        const feature = this.props.feature
        const inherit = this.props.inherit
        const loading = inherit?false:true

        if (inherit){
            this.inherit = inherit
        }

        if (this.inherit){
            const viewer = this.inherit.viewer
            
            if (page === 'cancer'){
                this.content = (
                    <CancerSelector
                        key='CancerSelector'
                        cancer={cancer}
                        viewer={viewer} 
                    />
                )                
            }else if (page === 'info'){
                this.content = (
                <KeyInfo key='KeyInfo' />
                )
            }else if (page === 'featureAndReport'){
                transitionClass = 'no_transition'
                this.content = (
                    <div key='featureAndReport'>
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
                )
            }
        }
       

        return (
            <div className='page_test'>
                <ReactCSSTransitionGroup 
                    transitionName={transitionClass} 
                    transitionEnterTimeout={1000} 
                    transitionLeave={false} 
                > 
                    {this.content}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}



export default Route
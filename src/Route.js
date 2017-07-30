import React from 'react'
import _ from 'lodash'
import CancerSelector from './CancerSelector';
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

        return (
            <div>
                {
                 (()=>{
                     if (page == 'cancer'){
                         return(
                            <CancerSelector
                                cancer={cancer}
                                viewer={viewer} 
                            />             
                         )
                     }else if (page == 'info'){
                         return(
                            <div>
                            </div>                     
                         )
                     }else if (page == 'feature_report'){
                        return(
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
                 })()   
                }
            </div>
        )
    }
}



export default Route
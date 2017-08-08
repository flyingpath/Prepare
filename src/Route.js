import React from 'react'
import _ from 'lodash'
import { observer } from 'mobx-react'
import Rx from 'rxjs';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CancerSelector from './CancerSelector';
import KeyInfo from './KeyInfo'
import FeatureSelector from './FeatureSelector';
import Report from './Report';
import dataStore from './store/data'


class Route extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.handleClick = this.handleClick.bind(this)

        this.timeCount = false
        // this.inherit
    }

    componentDidMount(){
        const elementRoot = document.querySelector('#prepare-app-root')
        const touchStartEvent = Rx.Observable.fromEvent(elementRoot, 'touchstart')
        const touchMoveEvent = Rx.Observable.fromEvent(elementRoot, 'touchmove')
        const touchEndEvent = Rx.Observable.fromEvent(elementRoot, 'touchend')

        const observerBackPage = touchStartEvent
            .switchMap( 
                (e)=>{
                    this.x = e.touches[0].clientX
                    this.timeCount = true
                    _.delay(()=>this.timeCount=false, 500)
                    return touchMoveEvent.takeUntil(touchEndEvent)
                } )

        observerBackPage.subscribe((e)=>{
            const startX = this.x
            const endX = e.touches[0].clientX

            if( (endX-startX > 50) && this.timeCount){
                dataStore.setRouteDirection('backward')
                dataStore.goToPrePage()
                dataStore.setRouteDirection('forward')
                this.timeCount = false
            }
        })
        
        
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {
        let transitionClass = dataStore.routePageClass

        const page = this.props.page
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
                <KeyInfo 
                    key='KeyInfo' 
                    cancer={cancer}
                    viewer={viewer} 
                />
                )
            }else if (page === 'featureAndReport'){
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



export default observer(Route)
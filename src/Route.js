import React from 'react'
import _ from 'lodash'
import {observer} from 'mobx-react'
import Rx from 'rxjs';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CancerSelector from './CancerSelector';
import KeyInfo from './KeyInfo'
import FeatureAndReport from './FeatureAndReport'

import dataStore from './store/data'


class Route extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this)

        this.timeCount = false
        this.ableBack = true
    }

    componentDidMount() {
        const elementRoot = document.querySelector('#prepare-app-root')
        const touchStartEvent = Rx.Observable.fromEvent(elementRoot, 'touchstart')
        const touchMoveEvent = Rx.Observable.fromEvent(elementRoot, 'touchmove')
        const touchEndEvent = Rx.Observable.fromEvent(elementRoot, 'touchend')

        const observerBackPage = touchStartEvent
            .switchMap(
                (e) => {
                    this.x = e.touches[0].clientX
                    this.timeCount = true
                    _.delay(() => this.timeCount = false, 500)
                    return touchMoveEvent.takeUntil(touchEndEvent)
                })

        observerBackPage.subscribe((e) => {
            const startX = this.x
            const endX = e.touches[0].clientX

            if ((endX - startX > 90) && this.timeCount && this.ableBack) {
                dataStore.setRouteDirection('backward')
                dataStore.goToPrePage()
                dataStore.setRouteDirection('forward')
                this.timeCount = false
            }
        })


    }
    componentWillUpdate(){
        this.ableBack = false
        _.delay(
            ()=>this.ableBack = true,
            1000
        )
    }
    handleClick() {
        console.log(this); // React Component instance
    }

    render() {
        let transitionClass = dataStore.routePageClass

        const page = this.props.page

        if (page === 'cancer') {
            this.content = (
                <CancerSelector
                    key='CancerSelector'
                />
            )
        } else if (page === 'info') {
            this.content = (
                <KeyInfo
                    key='KeyInfo'
                />
            )
        } else if (page === 'featureAndReport') {
            this.content = (
                <FeatureAndReport 
                    key='featureAndReport'
                />
            )
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
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import mobx from 'mobx'
import _ from 'lodash'
import ColorBrickLoading from './color_brick_loading'
import FlatButton from 'material-ui/FlatButton'
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton'
import T_dialog from './components/T_dialog'

import {h1Title} from "./styled_share";
import FeatureSelector from './FeatureSelector';
import LineReport from './LineReport';
import BarReport from './BarReport';
import dataStore from './store/data';
import optionData from './store/option'

class FeatureAndReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogOpen: false
        }
        this.closeDialog = this.closeDialog.bind(this)
        this.infoClick = this.infoClick.bind(this)
        this.info = ''
    }

    componentWillMount() {
        dataStore.fetchSurvival()
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        })
    }

    infoClick() {
        this.info = optionData.choiceSuggestion
        this.setState({
            dialogOpen: true
        })
    }

    goPrePage () {
        dataStore.setRouteDirection('backward')
        dataStore.goToPrePage()
        dataStore.setRouteDirection('forward')
    }
    render() {
        let constent

        const cancer = dataStore.cancer
        const message = this.info

        const fontColor = {
            color: '#3c3c3c',
            fontSize: '18px',
            display: 'block'
        }
        const H1Title = styled.h1`
            display: flex; flex-direction: row; align-items: center;
            ${h1Title()}
        `
        const dialogOpen = this.state.dialogOpen

        if (dataStore.load) {
            constent = (
                <ColorBrickLoading/>
            )
        } else if (dataStore.reportType === 'line') {
            constent = (
                <div style={{height: '100%', textAlign: 'center'}}>
                    <FeatureSelector key='featureSelect'/>
                    <LineReport/>
                    <TypeButton type='bar' label='柱狀圖'/>
                    <RaisedButton onClick={this.goPrePage}>
                        <span style={{
                            color: '#3c3c3c',
                            fontSize: '18px',
                            display: 'block'
                        }}>上一步</span>
                    </RaisedButton>
                </div>
            )
        } else if (dataStore.reportType === 'bar') {
            constent = (
                <div style={{ textAlign: 'center'}}>
                    <BarReport/>
                    <TypeButton type='line' label='折線圖'/>
                    <RaisedButton onClick={this.goPrePage}>
                        <span style={{
                            color: '#3c3c3c',
                            fontSize: '18px',
                            display: 'block'
                        }}>上一步</span>
                    </RaisedButton>
                </div>
            )
        } else {
            constent = (
                <div>
                    <FeatureSelector key='featureSelect'/>
                    <LineReport/>
                    <TypeButton type='bar' label='柱狀圖'/>
                </div>
            )
        }
        return (
            <div>
                <H1Title>
                    {`治療狀態 (${cancer.label})`}
                    <InfoButton onClick={this.infoClick}/>
                </H1Title>
                {constent}
                <T_dialog open={dialogOpen} closeFunc={this.closeDialog}>
                    <div style={{width: '100%', height: '100%'}}>
                        <div style={{margin: '10px 0px 20px'}}>
                            {message}
                        </div>
                        <RaisedButton onClick={this.closeDialog} style={{marginBottom: '20px'}}>
                            <span style={fontColor}>確認</span>
                        </RaisedButton>
                    </div>
                </T_dialog>
            </div>
        )
    }
}

const TypeButton = (props) => {
    return (
        <RaisedButton
            style={{
                position: 'absolute',
                top: '72px',
                right: '15px',
            }}
            onClick={() => {
                dataStore.changeReportType(props.type)
            }}>
            <span style={{
                color: '#3c3c3c',
                fontSize: '18px',
                display: 'block',
            }}>{props.label}</span>
        </RaisedButton>
    )
}

const InfoButton = (props) => {
    const width = props.width || '15px'
    const onClick = props.onClick || function () {
    }

    const Button = styled.div`
        background-color: #47c7ab;
        display:flex; flex-flow:row; align-items: center; justify-content: center;
        color: #ffffff;
        width: ${width};
        height: ${width};
        border: 4px solid #47c7ab; border-radius: ${width};
        padding: 4px; margin: 5px;
        cursor: pointer;
        user-select: none;
        font-weight: bold;
        &:active{
            background: transparent;
            color: #47c7ab;
            border: 4px solid #47c7ab; border-radius: ${width};
        }
    `
    return <Button onClick={onClick}>?</Button>
}

export default observer(FeatureAndReport)
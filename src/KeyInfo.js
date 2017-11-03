import React from 'react'
import _ from 'lodash'
import {observer} from 'mobx-react'
import {toJS} from 'mobx'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import $ from 'jquery'

import SelectFieldScroll from './components/SelectFieldScroll'
import BinaryCheckbox from './components/BinaryCheckbox'
import T_dialog from './components/T_dialog'

import dataStore from './store/data'
import infoData from './store/infoData'
import optionStore from './store/option'
import styled from 'styled-components'
import {h1Title} from "./styled_share"


class KeyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false
        }
        this.confirm = this.confirm.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
        this.err = ''
    }

    componentDidMount() {

    }

    closeDialog(){
        this.setState({
            dialogOpen:false
        })
    }
    setGender(val){
        return ()=>{
            const gender = val? 'female': 'male'
            if(gender=='male') return
            infoData.setGender(gender)
        }
    }

    setAge(event, index, value){
        infoData.setAge(value)
    }
    setGrade(event, index, value){
        infoData.setGrade(value)
    }
    setStage(event, index, value){
        infoData.setStage(value)
    }
    setTumorSize(e){
        infoData.setTumorSize(e.target.value)
    }
    setLymphNode(e){
        infoData.setLymphNode(e.target.value)
    }

    confirm() {
        //--- 檢查性別與年齡是否有填 ----//
        //------ 年齡須為正整數 -------//
        // if(gender !=='male' && gender !== 'female'){
        //     console.log(gender);
        //     this.err = '請輸入您的性別'
        //     this.setState({ dialogOpen: true })
        dataStore.changePageTo('featureAndReport')
    }

    render() {
        const fontColor = {
            color: '#3c3c3c',
            fontSize: '18px',
            display: 'block'
        }

        const cancer = _.isEmpty(dataStore.cancer)?'':dataStore.cancer.label
        
        const gradeList = optionStore.grade
        const stageList = optionStore.stage
        
        const gender = infoData.gender
        const age = infoData.age
        const tumorSize = infoData.tumorSize
        const lymphNode = infoData.lymphNode
        const stage = infoData.stage
        const grade = infoData.grade
        const lab = infoData.lab
        
        const dialogOpen = this.state.dialogOpen
        const message = this.err

        const H1Title = styled.h1`
            ${() => h1Title()}
        `


        return (
            <div>
                <T_dialog open={dialogOpen} closeFunc={this.closeDialog}>
                    <div style = {{ width: '100%', height: '100%', textAlign: 'center'}}>
                        <div style={{margin:'10px 0px 20px'}}>
                            {message}
                        </div>
                        <RaisedButton onClick={this.closeDialog}>
                            <span style={fontColor}>確認</span>
                        </RaisedButton>
                    </div>
                </T_dialog>
                <H1Title>請輸入基本資料</H1Title>
                <Paper className="Paper_container"
                       style={{
                           backgroundColor: '#fff',
                           marginTop: 0,
                           paddingTop: '2px',
                       }}>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>性別</span>
                        <BinaryCheckbox value={infoData.gender=='male'?0:1} onClick={this.setGender} data={['男', '女']} />
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>年齡</span>
                            <SelectFieldScroll value={parseInt(age)} onChange={this.setAge} 
                                data = {
                                    _.map( new Array(100), (data, idx)=>(
                                        <MenuItem value={idx+1} key={idx+1} primaryText={`${idx+1}`} />
                                    ) ) 
                                }
                            />
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>癌症分期 (Stage)</span>
                            <SelectFieldScroll value={stage} onChange={this.setStage} 
                                data = {
                                    _.map( stageList, (data, idx)=>(
                                        <MenuItem value={data.value} key={idx} primaryText={data.label} />
                                    ))
                                }
                            />
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>腫瘤細胞分化程度 (Grade)</span>
                        <SelectFieldScroll value={grade} onChange={this.setGrade} 
                            data = {
                                _.map( gradeList, (data, idx)=>(
                                    <MenuItem value={data.value} key={idx} primaryText={data.label} />
                                ))
                            }
                        />
                    </div>
                    <div style={{padding: '7% 0 1% 0'}}>
                        <RaisedButton onClick={this.confirm}>
                            <span style={fontColor}>確認</span>
                        </RaisedButton>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default observer(KeyInfo)

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
import SquareSelect from './components/SquareSelect'

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
            dataStore.setRouteDirection('no')
    }

    closeDialog() {
        this.setState({
            dialogOpen: false
        })
    }

    setGender(val) {
        return () => {
            const gender = val ? 'female' : 'male'
            if (gender == 'male') return
            infoData.setGender(gender)
        }
    }

    setAge(event, index, value) {
        infoData.setAge(value)
    }

    setGrade(value) {
        infoData.setGrade(value)
    }

    setNStage(value) {
        infoData.setNStage(value)
    }
    setTStage(value) {
        infoData.setTStage(value)
    }

    setPR(value) {
        infoData.setPR(value)
    }

    setER(value) {
        infoData.setER(value)
    }

    setHER2(value) {
        infoData.setHER2(value)
    }

    setTumorSize(e) {
        infoData.setTumorSize(e.target.value)
    }

    setLymphNode(e) {
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

        const cancer = _.isEmpty(dataStore.cancer) ? '' : dataStore.cancer.label

        const gradeList = optionStore.grade
        const TstageList = optionStore.stageT
        const NstageList = optionStore.stageN
        const prList = optionStore.pr

        const gender = infoData.gender
        const age = infoData.age
        const tumorSize = infoData.tumorSize
        const lymphNode = infoData.lymphNode
        const Tstage = infoData.Tstage
        const Nstage = infoData.Nstage
        const grade = infoData.grade
        const lab = infoData.lab

        const H1Title = styled.h1`
            ${() => h1Title()}
        `


        return (
            <div className="keyInfo">
                <H1Title>請輸入癌症資料</H1Title>
                <Paper className="Paper_container"
                       style={{
                           backgroundColor: '#fff',
                           marginTop: 0,
                           paddingTop: '2px',
                           height: '100%',
                           overflowY: 'auto',
                       }}>
                    <div className="Keyinfo_position" style={{display: "none"}}>
                        <span style={fontColor}>性別</span>
                        <BinaryCheckbox value={infoData.gender == 'male' ? 0 : 1} onClick={this.setGender}
                                        data={['男', '女']}/>
                    </div>
                    <div className="Keyinfo_position" style={{marginTop:'10px'}} >
                        <span style={fontColor}>年齡</span>
                        <SelectFieldScroll value={parseInt(age)} onChange={this.setAge}
                                           data={
                                               _.map(new Array(100), (data, idx) => (
                                                   <MenuItem value={idx + 1} key={idx + 1} primaryText={`${idx + 1}`}/>
                                               ))
                                           }
                        />
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>T 分期 (腫瘤侵犯深度)</span>
                        <SquareSelect 
                            defaultOption={Tstage}
                            options={TstageList} 
                            onClick={this.setTStage}
                            groupStyle={{margin:'2px 0px'}}
                            uniOptionStyle={{
                                margin: '10px 10px 10px 0px',
                                width: '50px',
                                height: '24px',
                            }}
                        />
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>N 分期 (局部淋巴轉移程度)</span>
                        <SquareSelect 
                            defaultOption={Nstage}
                            options={NstageList} 
                            onClick={this.setNStage}
                            groupStyle={{margin:'2px 0px'}}
                            uniOptionStyle={{
                                margin: '10px 10px 10px 0px',
                                width: '50px',
                                height: '24px',
                            }}
                        />
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>Grade (腫瘤細胞分化程度)</span>
                        <SquareSelect 
                            defaultOption={grade}
                            options={gradeList} 
                            onClick={this.setGrade}
                            groupStyle={{margin:'2px 0px'}}
                            uniOptionStyle={{
                                margin: '10px 10px 10px 0px',
                                width: '50px',
                                height: '24px',
                            }}
                        />
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>PR (黃體激素受體)</span>
                        <BinaryCheckbox
                            value={infoData.pr}
                            onClick={this.setPR} 
                            data={[
                                optionStore.gene[0].label, 
                                optionStore.gene[1].label
                            ]}/>
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>ER (動情激素受體)</span>
                        <BinaryCheckbox
                            value={infoData.er}
                            onClick={this.setER} 
                            data={[
                                optionStore.gene[0].label, 
                                optionStore.gene[1].label
                            ]}/>
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>HER2 (人類表皮生長因子受體-2)</span>
                        <BinaryCheckbox
                            value={infoData.her2}
                            onClick={this.setHER2} 
                            data={[
                                optionStore.gene[0].label, 
                                optionStore.gene[1].label
                            ]}/>
                    </div>
                    <div style={{padding: '7% 0 1% 0', marginBottom: '20px'}}>
                        <RaisedButton onClick={this.confirm}>
                            <span style={fontColor}>開始分析</span>
                        </RaisedButton>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default observer(KeyInfo)

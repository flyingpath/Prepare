import React from 'react'
import _ from 'lodash'
import {observer} from 'mobx-react'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper'
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import $ from 'jquery'

import T_dialog from './components/T_dialog'

import dataStore from './store/data'
import infoData from './store/infoData'


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
    setGender(gender){
        return ()=>{
            infoData.setGender(gender)
        }
    }

    setAge(e){
        infoData.setAge(e.target.value)
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
        const gender = infoData.gender
        const age = infoData.age

        const reNonNum = /\D/

        if(gender !=='male' && gender !== 'female'){
            console.log(gender);
            this.err = '請輸入您的性別'
            this.setState({ dialogOpen: true })
        }else if(age === '' ){
            this.err = '請輸入年齡'
            this.setState({ dialogOpen: true })
        }else if( age.search(reNonNum) !== -1 || Number.isInteger(parseFloat(reNonNum))){
            this.err = '年齡請輸入正整數'
            this.setState({ dialogOpen: true })
        }else{
            dataStore.changePageTo('featureAndReport')
        }
    }

    render() {
        const fontColor = {
            color: '#3c3c3c',
            fontSize: '18px',
            display: 'block'
        }

        const cancer = this.props.cancer.label
        
        const gender = infoData.gender
        const age = infoData.age
        const tumorSize = infoData.tumorSize
        const lymphNode = infoData.lymphNode
        
        const dialogOpen = this.state.dialogOpen
        const message = this.err

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
                <h1 className='h1Title'>請輸入基本資料</h1>
                <Paper className="Paper_container"
                       style={{
                           backgroundColor: '#fff',
                           marginTop: 0,
                           paddingTop: '2px',
                       }}>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>性別</span>
                        <div className="Keyinfo_position" style={{display: 'flex', borderBottom: '1px #ccc solid'}}>
                            <div>
                                <div
                                    type="checkbox"
                                    name="check-box"
                                    className={gender === 'male' ? 'check-box checkedBox' : 'check-box'}
                                    onClick={this.setGender('male')}
                                >
                                    <i></i>
                                </div>
                                <label htmlFor="rb1" style={{paddingRight: '9px', position: 'relative', bottom: '6px'}}>男</label>
                            </div>
                            <div>
                                <div
                                    type="checkbox"
                                    name="check-box"
                                    className={gender === 'female' ? 'check-box checkedBox' : 'check-box'}
                                    onClick={this.setGender('female')}
                                >
                                    <i></i>
                                </div>
                                <label htmlFor="rb2" style={{paddingRight: '9px', position: 'relative', bottom: '6px'}}>女</label>
                            </div>
                        </div>
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>年齡</span>
                        <div className="col-3">
                            <input 
                                className="effect-5" 
                                type="text" 
                                placeholder="Age"
                                value={age}
                                onChange={this.setAge}
                            />
                            <span className="focus-border">
            	            <i/>
                        </span>
                        </div>
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>{cancer}腫瘤大小(公分)</span>
                        <div className="col-3">
                            <input className="effect-5" type="text" placeholder="Size" onChange={this.setTumorSize}/>
                            <span className="focus-border">
            	            <i/>
                        </span>
                        </div>
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>感染淋巴結數量(個數)</span>
                        <div className="col-3">
                            <input className="effect-5" type="text" placeholder="Count" onChange={this.setLymphNode}/>
                            <span className="focus-border">
            	            <i/>
                        </span>
                        </div>
                    </div>
                    <div style={{padding: '7% 0 1% 0'}}>
                        <RaisedButton onClick={this.confirm} disabled={infoData.KeyInfoButtonDisabled}>
                            <span style={fontColor}>確認</span>
                        </RaisedButton>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default observer(KeyInfo)

import React from 'react'
import _ from 'lodash'
import {observer} from 'mobx-react'
import RaisedButton from 'material-ui/RaisedButton';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import $ from 'jquery'

import dataStore from './store/data'
import infoData from './store/infoData'

import Paper from 'material-ui/Paper'

class KeyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.confirm = this.confirm.bind(this);
    }

    componentDidMount() {
    }

    confirm() {
        dataStore.changePageTo('featureAndReport')
    }

    render() {
        const fontColor = {
            color: '#3c3c3c',
            fontSize: '18px',
            display: 'block'
        }

        const gender = infoData.gender
        const age = infoData.age
        const tumorSize = infoData.tumorSize
        const lymphNode = infoData.lymphNode
        const cancer = this.props.cancer.label

        return (
            <div>
                <div style={{
                    padding: '1% 5% 1% 5%',
                    textAlign: 'right',
                    fontSize: '1.3rem',
                    fontWeight: 'bold'
                }}>
                    {cancer}
                </div>
                <h1 style={{padding: '1%', margin: '0% 4% 4% 4%', fontWeight: '600'}}>請輸入基本資料</h1>
                <Paper className="Paper_container" style={{backgroundColor: '#fff'}}>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>性別</span>
                        <div className="Keyinfo_position" style={{display: 'flex', borderBottom: '1px #ccc solid'}}>
                            <div>
                                <div
                                    type="checkbox"
                                    name="check-box"
                                    className={gender === 'male' ? 'check-box checkedBox' : 'check-box'}
                                    onClick={() => {
                                        infoData.setGender('male')
                                    }}

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
                                    onClick={() => {
                                        infoData.setGender('female')
                                    }}
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
                            <input className="effect-5" type="text" placeholder="Age"/>
                            <span className="focus-border">
            	            <i/>
                        </span>
                        </div>
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>腫瘤大小(公分)</span>
                        <div className="col-3">
                            <input className="effect-5" type="text" placeholder="Size"/>
                            <span className="focus-border">
            	            <i/>
                        </span>
                        </div>
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>感染淋巴結數量(個數)</span>
                        <div className="col-3">
                            <input className="effect-5" type="text" placeholder="Count"/>
                            <span className="focus-border">
            	            <i/>
                        </span>
                        </div>
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

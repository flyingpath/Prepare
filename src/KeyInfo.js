import React from 'react'
import _ from 'lodash'
import RaisedButton from 'material-ui/RaisedButton';

import dataStore from './store/data'

import Paper from 'material-ui/Paper'

class KeyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.confirm = this.confirm.bind(this);
    }

    confirm() {
        dataStore.changePageTo('featureAndReport')
    }

    render() {
        const fontColor = {
            color:'#3c3c3c',
            fontSize:'18px'
        }

        const cancer = this.props.cancer.label

        return (
            <div>
                <Paper className="Paper_container" style={{backgroundColor: '#fff'}}>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>{cancer}</span>
                        <div className="col-3">
                            <input className="effect-5" type="text" placeholder="Basic Info"/>
                            <span className="focus-border">
            	            <i/>
                        </span>
                        </div>
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>性別</span>
                        <div className="col-3">
                            <input className="effect-5" type="text" placeholder="Gender"/>
                            <span className="focus-border">
            	            <i/>
                        </span>
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
                        <span style={fontColor}>腫瘤大小</span>
                        <div className="col-3">
                            <input className="effect-5" type="text" placeholder="Size"/>
                            <span className="focus-border">
            	            <i/>
                        </span>
                        </div>
                    </div>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>感染淋巴結數量</span>
                        <div className="col-3">
                            <input className="effect-5" type="text" placeholder="Count"/>
                            <span className="focus-border">
            	            <i/>
                        </span>
                        </div>
                    </div>
                    <div style={{padding:'7% 0 1% 0'}}>
                        <RaisedButton onClick={this.confirm}>
                            <span style={fontColor}>確認</span>
                        </RaisedButton>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default KeyInfo
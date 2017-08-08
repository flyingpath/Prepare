import React from 'react'
import _ from 'lodash'
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import $ from 'jquery'

import dataStore from './store/data'

import Paper from 'material-ui/Paper'

class KeyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.confirm = this.confirm.bind(this);
    }

    componentDidMount() {
        $('input[name="radio-btn"]').wrap('<div class="radio-btn"><i></i></div>');
        $(".radio-btn").on('click', function () {
            var _this = $(this),
                block = _this.parent().parent();
            block.find('input:radio').attr('checked', false);
            block.find(".radio-btn").removeClass('checkedRadio');
            _this.addClass('checkedRadio');
            _this.find('input:radio').attr('checked', true);
        });
        $('input[name="check-box"]').wrap('<div class="check-box"><i></i></div>');
        $.fn.toggleCheckbox = function () {
            this.attr('checked', !this.attr('checked'));
        }
        $('.check-box').on('click', function () {
            $(this).find(':checkbox').toggleCheckbox();
            $(this).toggleClass('checkedBox');
        });
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
        // const bigFontColod = {
        //     color: '#3c3c3c',
        //     fontSize: '32',
        //     fontWeight: '600'
        // }

        // const cancer = this.props.cancer.label

        return (
            <div>
                {/*<h1 style={{padding: '1%', margin: '4%', fontWeight: '600'}}>{cancer}</h1>*/}
                <h1 style={{padding: '1%', margin: '4%', fontWeight: '600'}}>請輸入基本資料</h1>
                <Paper className="Paper_container" style={{backgroundColor: '#fff'}}>
                    <div className="Keyinfo_position">
                        <span style={fontColor}>性別</span>
                        <div className="Keyinfo_position" style={{display: 'flex', borderBottom: '1px #ccc solid'}}>
                            <div>
                                <input type="checkbox" name="check-box"/>
                                <label htmlFor="rb1" style={{paddingRight: '9px', position: 'relative', bottom: '6px'}}>男</label>
                            </div>
                            <div>
                                <input type="checkbox" name="check-box"/>
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

export default KeyInfo
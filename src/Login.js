import React, { Component } from 'react'
import _ from 'lodash'
import queryString from 'query-string'
import Rx from 'rxjs'
import LoginPic from "./pics/prepare_light_stable__.png"
import './css/login.css'
import $ from 'jquery'

import dataStore from './store/data'


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            resultText: ''
        }
        const parsed = queryString.parse(window.location.search)
        this.next = parsed.next

        if (_.isEmpty(this.next)) {
            this.next = '/'
        }
        if (this.next == '/logout') {
            this.next = '/'
        }

        this.username = ''
        this.password = ''
        this.doLogin = this.doLogin.bind(this)
        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onKeyPressEnter = this.onKeyPressEnter.bind(this)
    }

    onUsernameChange(e) {
        this.username = e.target.value
    }

    onPasswordChange(e) {
        this.password = e.target.value
    }

    onKeyPressEnter(e) {
        if (e.key == 'Enter') {
            this.doLogin()
        }
    }

    componentDidMount() {
        $(".rippleByMe").on("mousedown", function (e) {
            e.preventDefault();
            let btn = $(this);
            let circle = $('<div class="circle"></div>');
            btn.append(circle);

            let r = btn.width();
            let x = e.offsetX - r / 2;
            let y = e.offsetY - r / 2;

            let overlayColor = btn.attr("data-overlay-color");

            circle.css({
                "top": y,
                "left": x,
                "width": r,
                "height": r,
                "background-color": overlayColor
            });
            setTimeout(function () {
                return circle.remove();
            }, 500);

        });

        //flip test
        $('.btn.btn-round.website_intro_color').on('click', function () {
            $('.card').toggleClass('flipped');
        });

        // click continue
        // $('#continue').on('click', function () {
        //     $('.card').addClass('flipped')
        // });
    }

    doLogin() {
        this.setState({resultText: 'Log In...'})
        const logInObs = Rx.Observable.defer(() => fetch('/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.username,
                password: this.password
            })
        }))

        logInObs
            .flatMap((response) => response.json())
            .retryWhen((notify) => {
                const counter = Rx.Observable.interval(500).take(3)
                return (
                    notify
                        .zip(counter, (x, y) => {
                            if (y <= 1) {
                                console.log('error! retry' + (y + 1).toString())
                            } else {
                                throw 'Error!!!'
                            }
                        })
                )
            })
            .subscribe({
                next: (data) => {
                    if (data.status == 'true') {
                        window.location.href = `/redirect?next=${this.next}&token=${data.session_id}`
                    } else {
                        this.setState({resultText: '帳號密碼錯誤'})
                    }
                },
                error: (err) => {
                    this.setState({resultText: '連接伺服器錯誤'})
                }
            })
    }

    render() {
        return (
            <div className="container">
                <div className="card card-container paddingHotFix"
                     style={{position: 'absolute', backfaceVisibility: 'hidden'}}>
                    <div className="front">
                        <img src={LoginPic} className="profile-img-card rotate" style={{paddingBottom: '0px'}}/>
                        <div className="form-signin">
                            <div className="describled_content">
                                本系統是根據某醫院在二十餘年間的治療結果、統計發展出來。雖然各種可能影響結論之參數已盡量涵概於分析方法中，但仍不免於掛一漏萬。使用者於參考此一資料時，應思考資料的複雜性及有限正確性。本軟體僅供研究參考，非臨床使用。
                            </div>
                            <form>
                                <button 
                                    type="button" 
                                    className="btn btn-round website_intro_color" 
                                    id="continue"
                                    style={{width: '216px'}}
                                    onClick = { ()=>dataStore.changePageTo('cancer') }
                                >
                                    START
                                </button>
                            </form>
                            <div className="termsCondition">Terms & Conditions</div>
                        </div>
                    </div>
                </div>
                <div className="Rightreserved">© PREPARE. All RIGHTS RESERVED</div>
            </div>
        )
    }
}

Login.propTypes = {}

export default Login

// 本系統是根據和信治癌中心醫院在二十餘年間的治療結果、統計發展出來。雖然各種可能影響結論之參數已盡量涵概於分析方法中，但仍不免於掛一漏萬。使用者於參考此一資料時，應思考資料的複雜性及有限正確性。本軟體僅供研究參考，非臨床使用。

{/* <div className="card card-container">
<div className="back">
    <img src={LoginPic} className="profile-img-card rotate"/>
    <div className="form-signin">
        <form method="GET" action="/oauth2/start">
            <input type="hidden" name="rd" value="/"></input>
            <button type="submit" className="btn btn-round color-4 material-design rippleByMe">
                Google+
            </button>
        </form>
        <form method="GET" action="/fbauth/start">
            <input type="hidden" name="rd" value="/"></input>
            <button type="submit" className="btn btn-round color-1 material-design rippleByMe">
                Facebook
            </button>
        </form>
        <form method="GET" action="">
            <input type="hidden" name="rd" value="/"></input>
            <button type="submit" className="btn btn-round color-5 material-design rippleByMe">
                Guest
            </button>
        </form>
        <div className="termsCondition">Terms & Conditions</div>
    </div>
</div>
</div> */}
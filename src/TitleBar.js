import React from 'react'
import {observer} from 'mobx-react'

import _ from 'lodash'
import styled from 'styled-components'

import logo from './pics/prepare_white.png'

class TitleBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {
        const Body = this.styles.body
        const Img = this.styles.img

        return (
            <Body>
            <Img src={logo}/>
            </Body>
        )
    }

    styles = {
        body: styled.div`
            position: absolute;
            display: flex;
            flex-flow: row;
            background: #4ee4c3;
            height: 60px;
            width: 100%;
            flex-shrink: 0;
            box-shadow: 0px -1px 7px 0px;
            z-index: 101;
        `,
        img: styled.img`
            //width: 100px;love
            //padding: 5px;
            //margin-left: 10px;
            margin: 10px 0px 0px 20px;
            height: 44px;
            width: 84px;
        `
    }
}

export default observer(TitleBar)
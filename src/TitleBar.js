import React from 'react'
import {observer} from 'mobx-react'

import _ from 'lodash'
import styled from 'styled-components'

import logo from './pics/prepare_white.png'
import grandma from './pics/uxceomom-128.jpg'

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
        const ImgGrandma =  this.styles.imgGrandma

        return (
            <Body>
                <Img src={logo}/>
                <div style={{width:'100%'}} />
                <div style={{display:'flex', alignItems: 'center',padding:'0px 20px'}}>
                    <ImgGrandma src={grandma}/>
                </div>
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
            margin: 10px 0px 0px 12px;
            height: 44px;
            width: 84px;
        `,
        imgGrandma: styled.img`
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 1px 2px 2px -1px;
        `
    }
}

export default observer(TitleBar)
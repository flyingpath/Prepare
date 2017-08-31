import React from 'react'
import {observer} from 'mobx-react' 
// import mobx from 'mobx'
// import _ from 'lodash'
import styled from 'styled-components';

import './css/_color_brick_loading.scss'

class ColorBrickLoading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this); // React Component instance
    }

    render() {

        const Loader = styled.div.attrs({
            className: 'loader',
        })``;
        const Logo = styled.div.attrs({
            className: 'logo',
        })``;
        const White = styled.div.attrs({
            className: 'white',
        })``;
        const Orange = styled.div.attrs({
            className: 'orange',
        })``;
        const Red = styled.div.attrs({
            className: 'red',
        })``;
        const CustomP = styled.p`
              font-weight:600;
              font-size:26px;
        `


        return (
            <Loader>
                <Logo>
                    <White />
                    <Orange />
                    <Red />
                </Logo>
                <CustomP>LOADING</CustomP>
            </Loader>
        );
    }
}

export default observer(ColorBrickLoading)
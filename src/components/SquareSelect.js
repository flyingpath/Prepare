import React from 'react' 
import styled from 'styled-components'
import _ from 'lodash'

class SquareSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: props.defaultOption
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(value) {
        return ()=>{
            this.setState({
                active: value
            })
            this.props.onClick(value)
        }
    }

    render() {
        const GroupDiv = this.styles.group
        const ItemDivBasic = this.styles.item

        const options = this.props.options

        return (
            <GroupDiv style = {this.props.groupStyle}>
            {_.map(options, (eachOption, idx)=>{
                let ItemDiv = ItemDivBasic
                if (this.state.active === eachOption.value){
                    ItemDiv=ItemDivBasic.extend`
                        color: white;
                        background: ${this.props.color};
                    `;
                }

                return (
                    <ItemDiv 
                        key={idx}
                        style = {this.props.uniOptionStyle}
                        onClick = {this.handleClick(eachOption.value)}
                    >
                        {eachOption.label}
                    </ItemDiv>
                )
            })}
            </GroupDiv>
        )
    }

    styles = {
        group:styled.div`
            display:flex; flex-flow:row wrap; align-items: center;
        `,
        item:styled.div`
            display:flex; flex-flow:row; align-items: center; justify-content: center;
            color: ${this.props.color};
            border: 1px solid ${this.props.color}; border-radius: 6px;
            padding: 4px; margin: 5px;
            font-family: monospace;
            cursor: pointer;
            user-select: none;
        `
    }
}

SquareSelect.defaultProps = {
    options: [
        { value: 'T1', label: 'T1' },
        { value: 'T2', label: 'T2' },
        { value: 'T3', label: 'T3' },
    ],
    defaultOption: 'T2',
    uniOptionStyle: {},
    groupStyle: {},
    onClick: ()=>{},
    color: '#09b0b0',
}

export default SquareSelect
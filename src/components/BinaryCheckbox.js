import React from 'react'

const BinaryCheckbox = (props) => {
    const value = props.value
    const onClick = props.onClick
    const option = props.data
    const className = props.className ? props.className : 'Keyinfo_position'

    return (
        <div className={className} style={{display: 'flex',  paddingLeft: '4px', margin:'10px 0px'}}>
            <div style={{display: 'flex', alignItems: 'baseline'}}>
                <div
                    type="checkbox"
                    name="check-box"
                    className={value ? 'check-box' : 'check-box checkedBox'}
                    onClick={() => onClick(0)}
                >
                    <i></i>
                </div>
                <label htmlFor="rb1"
                       style={{paddingRight: '9px', position: 'relative', bottom: '6px'}}>{option[0]}</label>
            </div>
            <div>
                <div
                    type="checkbox"
                    name="check-box"
                    className={value ? 'check-box checkedBox' : 'check-box'}
                    onClick={() => onClick(1)}
                >
                    <i></i>
                </div>
                <label htmlFor="rb2"
                       style={{paddingRight: '9px', position: 'relative', bottom: '6px'}}>{option[1]}</label>
            </div>
        </div>
    )
}

export default BinaryCheckbox

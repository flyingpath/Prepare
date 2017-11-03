import React from 'react'
import SelectField from 'material-ui/SelectField'

const SelectFieldScroll = (props)=>{
    const underlineStyle = {
        borderBottom: '1.4px solid rgb(204, 204, 204)'
    }
    const labelStyle ={
        paddingLeft:'4px'
    }
    const selectedMenuItemStyle = {
        color: 'rgb(54, 187, 156)'
    }
    return(
        <div style={{width:'100%', height:'48px'}}>
            <SelectField
                value={props.value}
                onChange={props.onChange}
                maxHeight={200}
                style={{width:'100%'}}
                underlineStyle = {underlineStyle}
                labelStyle={labelStyle}
                selectedMenuItemStyle = {selectedMenuItemStyle}
            >
                { props.data }
            </SelectField>
        </div>
    )
}

export default SelectFieldScroll


import React from 'react'
import _ from 'lodash'
import {observer} from 'mobx-react'
import Paper from 'material-ui/Paper'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import styled from 'styled-components'
import ColorBrickLoading from './color_brick_loading'

import {h1Title} from "./styled_share"
import dataStore from './store/data'
import optionStore from './store/option'

class CancerSelector extends React.Component {
    constructor(props) {
        super(props)
        this.selectCancer = this.selectCancer.bind(this);
        this.ableList = ['breast']
    }

    componentWillMount(){
        optionStore.setFeatureList()
    }

    selectCancer = (cancer) => (
        () => {
            dataStore.setCancer(cancer)
            optionStore.setFeatureList()
            dataStore.cancerPageCheck()
        }
        // dataStore.changePageTo('info')
    )

    changePageToInfo = () => (
        () => {
            dataStore.changePageTo('info')
        }
    )


    render() {
        const cancerList = optionStore.cancerList?optionStore.cancerList:[]
        const cancer = dataStore.cancer.value

        const fontColor = {
            color: '#3c3c3c',
            fontSize: '18px',
            display: 'block'
        }

        const styles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
                marginBottom: 16,
            },
        };

        const H1Title = styled.h1`
            ${() => h1Title()}
        `
        if ( _.isEmpty(cancerList) ){
            return(
                <div>
                    <ColorBrickLoading/>
                </div>
            )
        }

        return (
            <div>
                <H1Title>
                    選擇一個癌症
                </H1Title>
                <Paper className="Paper_container" style={{backgroundColor: '#fff'}}>
                    <RadioButtonGroup name="prepare_cancerSelect_group" defaultSelected={cancer}>
                        {
                            _.map(cancerList, (eachCancer, idx) => {
                                const label = eachCancer.label
                                const value = eachCancer.value
                                return (
                                    <RadioButton
                                        value={value}
                                        label={label}
                                        checkedIcon={<ActionFavorite/>}
                                        uncheckedIcon={<ActionFavoriteBorder/>}
                                        style={styles.radioButton}
                                        key={`cancerType${idx}`}
                                        onClick={this.selectCancer(eachCancer)}
                                        disabled={this.ableList.indexOf(value)==-1}
                                    />
                                )
                            })
                        }
                    </RadioButtonGroup>
                    <RaisedButton onClick={this.changePageToInfo()}
                                  disabled={dataStore.confirmButton}
                    >
                        <span style={fontColor}>下一步</span>
                    </RaisedButton>
                </Paper>
            </div>
        )
    }
}

export default observer(CancerSelector)

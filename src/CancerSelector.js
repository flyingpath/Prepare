import React from 'react';
import _ from 'lodash'
import {
    graphql,
    createFragmentContainer
} from 'react-relay';

import dataStore from './store/data';
import Paper from 'material-ui/Paper'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import {h1Title} from "./styled_share";

class CancerSelector extends React.Component {
    constructor(props) {
        super(props)
        this.selectCancer = this.selectCancer.bind(this);
    }

    selectCancer = (cancer) => (
        () => {
            dataStore.setCancer(cancer)
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
        const cancerList = this.props.viewer.cancers
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
                                    />
                                )
                            })
                        }
                    </RadioButtonGroup>
                    <RaisedButton onClick={this.changePageToInfo()}
                                  disabled={dataStore.confirmButton}
                    >
                        <span style={fontColor}>確認</span>
                    </RaisedButton>
                </Paper>
            </div>
        )
    }
}

const container = createFragmentContainer(CancerSelector, {
        viewer: graphql.experimental`
        fragment CancerSelector_viewer on Viewer {
          cancers {
            value:cancer,
            label:name_cn,
            name_en
          }
        }
    `,
    }
)

export default container

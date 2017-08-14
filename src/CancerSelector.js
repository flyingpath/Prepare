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

class CancerSelector extends React.Component {
    constructor(props) {
        super(props)
        this.selectCancer = this.selectCancer.bind(this);
    }

    selectCancer = (cancer) => (
        () => {dataStore.setCancer(cancer)}
        // dataStore.changePageTo('info')
    )

    changePageToInfo = () => (
        () => {dataStore.changePageTo('info')}
    )


    render() {
        const cancerList = this.props.viewer.cancers
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

        return (
            <div>
                <h1 style={{padding: '1%', margin: '4%', fontWeight: '600'}}>
                    選擇一個癌症
                </h1>

                <Paper className="Paper_container" style={{backgroundColor: '#fff'}}>
                    <RadioButtonGroup name="prepare_cancerSelect_group">
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
                                        onTouchTap={this.selectCancer(eachCancer)}
                                    />
                                )
                            })
                        }
                    </RadioButtonGroup>
                    {/*<RaisedButton>*/}
                        {/*<span style={fontColor}>清除</span>*/}
                    {/*</RaisedButton>*/}
                    <RaisedButton  onTouchTap={this.changePageToInfo()}
                                   disabled={true}
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

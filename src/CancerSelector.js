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

class CancerSelector extends React.Component {
    constructor(props) {
        super(props)
        this.selectCancer = this.selectCancer.bind(this);
    }

    selectCancer(cancer) {
        return () => {
            dataStore.setCancer(cancer)
            dataStore.changePageTo('info')
            // _.delay(
            //     () => {
            //         dataStore.setCancer(cancer)
            //         dataStore.changePageTo('info')
            //     },
            //     200
            // )

        }
    }


    render() {
        const cancerList = this.props.viewer.cancers

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
                                            checkedIcon={<ActionFavorite style={{color: '#F44336'}}/>}
                                            uncheckedIcon={<ActionFavoriteBorder/>}
                                            style={styles.radioButton}
                                            key={`cancerType${idx}`}
                                            onTouchTap={this.selectCancer(eachCancer)}
                                        />
                                )
                            })
                        }
                    </RadioButtonGroup>
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

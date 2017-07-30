import React from 'react';
import _ from 'lodash'
import {
    graphql,
    createFragmentContainer
} from 'react-relay';

import dataStore from './store/data';

class CancerSelector extends React.Component {
    constructor(props) {
        super(props)
        this.selectCancer = this.selectCancer.bind(this);
    }

    selectCancer(cancer){
        return ()=>{
            console.log(cancer)
            dataStore.setCancer(cancer)
            dataStore.changePageTo('info')
        }
    }

    render() {
        const cancerList = this.props.viewer.cancers

        return (
            <div>
                <h1>
                    選擇一個癌症
                </h1>
                {
                    _.map(cancerList, (eachCancer, idx) => {
                        console.log(eachCancer);
                        const label = eachCancer.label
                        const value = eachCancer.value
                        return (
                            <div 
                                key = {`cancerType${idx}`}
                                onClick = {this.selectCancer(value)}
                            >
                              {label}  
                            </div>
                        )
                    })
                }

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

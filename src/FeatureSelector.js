import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
    graphql,
    createFragmentContainer
} from 'react-relay';
import _ from 'lodash'


import dataStore from './store/data';


class FeatureSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feature: props.feature
        }
    }

    onChange(e) {
        this.setState({
            feature: e.value
        })
        dataStore.setFeature(e.value);
    }

    render() {
        let features = this.props.viewer.features
        console.log(features);
        features = _.filter(features, (f)=>f.isAnalysis)

        return (
            <Select
                options={this.props.viewer.features}
                placeholder="您對哪個變項感興趣？"
                onChange={this.onChange.bind(this)}
                value={this.state.feature}
                searchable={false}
            />
        );
    }
}

const container = createFragmentContainer(FeatureSelector, {
        viewer: graphql.experimental`
        fragment FeatureSelector_viewer on Viewer 
        {
          features 
        }
    `,

    }
)

export default container

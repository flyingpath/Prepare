import React, { Component } from 'react';
import CancerSelector from './CancerSelector';
import FeatureSelector from './FeatureSelector';
import Report from './Report';
import dataStore from './store/data';
import {observer} from 'mobx-react'
import {
  QueryRenderer,
  graphql
} from 'react-relay';

import environment from './createRelayEnvironment';
// import Feed from './Feed';

@observer
class App extends Component {
  // state = {
  //   cancer: ''
  // }

          // variables={cancer: cancer, feature: feature}
  render() {
    const cancer = dataStore.cancer
    const feature = dataStore.feature
    return (
      <div className="App">
        <QueryRenderer
          environment={environment}
          variables={{cancer:cancer, feature:feature}}
          query={graphql.experimental`
            query AppQuery ($cancer:String, $feature:String){
              viewer {
                ...CancerSelector_viewer
                ...FeatureSelector_viewer @arguments(cancer: $cancer)
                ...Report_viewer @arguments(cancer: $cancer, feature:$feature)
              }
            }
          `}
          render={({error, props}) => {
            if (error) {
              return <div>{error.message}</div>;
            } else if (props) {
              return (
                <div>
                  <CancerSelector
                    cancer={cancer}
                    viewer={props.viewer} />
                  <FeatureSelector
                    cancer={cancer}
                    feature={feature}
                    viewer={props.viewer} />
                  <Report 
                    cancer={cancer}
                    feature={feature}
                    viewer={props.viewer} />

                </div>)
            }
            return <div>Loading</div>;
          }}
        />
      </div>
    );
  }
}

export default App;

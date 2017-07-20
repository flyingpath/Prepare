import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {
  graphql,
  createFragmentContainer
} from 'react-relay';

import dataStore from './store/data';

class CancerSelector extends React.Component {
  static propTypes = {
  };

  onChange(e){
    dataStore.setCancer(e.value);
  }

  render() {
    return (
      <Select
        options={this.props.viewer.cancers}
        placeholder="您對哪個癌症感興趣？"
        onChange={this.onChange.bind(this)}
        value={this.props.cancer}
      />
    );
  }
}

const container = createFragmentContainer(CancerSelector,{
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

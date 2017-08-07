import React from 'react';
import 'react-select/dist/react-select.css';
import TestLoading from './test_loading'
// import HeartPulseLoading from './circle_loading'
// import { LineChart, Line } from 'recharts';
import {
  graphql,
  createFragmentContainer
} from 'react-relay';
import _ from 'lodash';

import dataStore from './store/data'

class Report extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        
      }
      this.loadStatus=false
  }

  componentDidMount() {
    dataStore.setRouteDirection('no')
  }

  render() {
    const loading=this.props.loading
    
    if(loading){
      this.loadStatus = true
    }else if(this.loadStatus){
      _.delay(()=>{
        this.loadStatus=false
        this.forceUpdate()
      }, 500)
    }

    if(this.loadStatus){
      return(
        <div>
            <TestLoading/>
        </div>
      )
    }
    let data = []

    if(this.props.viewer.survival){
      data = this.props.viewer.survival.data;
    }

    const feature = this.props.feature

    return (
      <div>
          {_.map(data,(x, idx)=>{
          return (
            <div key={idx}>
              <h4>{`${feature}-${x.item}`}</h4>
              <div>
                {_.map(x.survival, (sur,idy)=>{
                  return (
                    <div key={`y${idy}`}>
                      {`第${sur.years}年存活率${_.ceil(100*sur.rate,2)}%`}
                    </div>
                  )
                })}
              </div>

            </div>
          )
        })}
      </div>
    );
  }
}

const container = createFragmentContainer(Report,{
    viewer: graphql.experimental`
        fragment Report_viewer on Viewer 
        @argumentDefinitions(
          cancer: {type: "String", defaultValue: ""},
          feature: {type: "String", defaultValue: ""}
        ) 
        {
          survival(cancer:$cancer, feature:$feature) {
            data {
              item,
              survival{
                years,
                rate
              }
            }
          }
        }
    `,

  }
)

export default container

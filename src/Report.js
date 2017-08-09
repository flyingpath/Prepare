import React from 'react';
import 'react-select/dist/react-select.css';
import TestLoading from './test_loading'
import LineChart from './chart/LineChart';
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

  combindStyle(styleArray, dataArray){
    if(styleArray.length >= dataArray.length){
      dataArray = _.map(dataArray, (eachData, idx)=>{
        const data = _.assign(eachData, styleArray[idx])
        return data
      })
    }else{
      const styleLength = styleArray.length
      dataArray = _.map(dataArray, (eachData, idx)=>{
        let data = eachData
        if(idx<styleLength){
          data = _.assign(data, styleArray[idx])
        }
        return data
      })
    }
    return dataArray
  }

  makeChartData(feature, data){
    console.log(data);
    const fData = _.map(data, x=>x.survival)
    const sData = _.map(fData, x=>_.map(x, y=>y.rate))
    let dataSet = []
    let finalData = []
    let styles=[]

    switch(feature){
      case 'op'://(手術)
        styles = [
          {
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ]
          }
        ]        
        
        dataSet = _.map(sData, (eachData, idx)=>{
          return(
            {
              label: idx===0?'沒做手術治療':'有做手術治療',
              data: eachData,
              borderWidth: 5,
              fill: false
            }
          ) 
        })

        finalData = this.combindStyle(styles, dataSet)

        return finalData

      case 'ct'://(化療)
        dataSet = _.map(sData, (eachData, idx)=>{
          return(
            {
              label: idx===0?'沒做化學治療':'有做化學治療',
              data: eachData,
              borderWidth: 1,
              fill: false
            }
          ) 
        })
        finalData = this.combindStyle(styles, dataSet)
        return finalData

      case 'rt'://(電療)
        dataSet = _.map(sData, (eachData, idx)=>{
          return(
            {
              label: idx===0?'沒做電療':'有做電療',
              data: eachData,
              borderWidth: 1,
              fill: false
            }
          ) 
        })
        finalData = this.combindStyle(styles, dataSet)
        return finalData
      
      case 'ht'://(賀爾蒙治療)
        dataSet = _.map(sData, (eachData, idx)=>{
          return(
            {
              label: idx===0?'沒做賀爾蒙治療':'有做賀爾蒙治療',
              data: eachData,
              borderWidth: 1,
              fill: false
            }
          ) 
        })
        finalData = this.combindStyle(styles, dataSet)
        return finalData
      
      case 'neo_adj': //(術前治療)
        return []
        break;
      default:
        return []
    }
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
    const chartData = this.makeChartData(feature, data)

    return (
      <div>
        <LineChart data={chartData} />
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

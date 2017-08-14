import React from 'react';
import 'react-select/dist/react-select.css';
import TestLoading from './test_loading'
import LineChart from './chart/LineChart';
import * as Chart from 'chart.js'
import Paper from 'material-ui/Paper'
import {
    graphql,
    createFragmentContainer
} from 'react-relay';
import _ from 'lodash';

import dataStore from './store/data'

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.loadStatus = false
    }

    componentDidMount() {
        dataStore.setRouteDirection('no')
    }

    combindStyle(styleArray, dataArray) {
        if (styleArray.length >= dataArray.length) {
            dataArray = _.map(dataArray, (eachData, idx) => {
                const data = _.assign(eachData, styleArray[idx])
                return data
            })
        } else {
            const styleLength = styleArray.length
            dataArray = _.map(dataArray, (eachData, idx) => {
                let data = eachData
                if (idx < styleLength) {
                    data = _.assign(data, styleArray[idx])
                }
                return data
            })
        }
        return dataArray
    }

    makeChartData(feature, data) {
        console.log(data);
        const fData = _.map(data, x => x.survival)
        const sData = _.map(fData, x => _.map(x, y => y.rate))
        let dataSet = []
        let finalData = []
        let styles = []
        const borderWidth = 5
        const fill = false

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
              lineTension: 0,
              fill: false
            }
          ) 
        })
          
        let chart1 = document.createElement('canvas').getContext('2d'),
            gradient1 = chart1.createLinearGradient(0, 0, 0, 450);

        gradient1.addColorStop(0, 'rgba(52, 152, 219, 0.75)');
        gradient1.addColorStop(0.5, 'rgba(52, 152, 219, 0.50)');
        gradient1.addColorStop(1, 'rgba(52, 152, 219, 0.25)');

        let chart2 = document.createElement('canvas').getContext('2d'),
            gradient2 = chart2.createLinearGradient(0, 0, 0, 450);

        gradient2.addColorStop(0, 'rgba(231, 76, 60, 0.75)');
        gradient2.addColorStop(0.5, 'rgba(231, 76, 60, 0.50)');
        gradient2.addColorStop(1, 'rgba(231, 76, 60, 0.25)');

        // switch (feature) {
        //     case 'op'://(手術)
        //         styles = [
        //             {
        //                 backgroundColor: gradient1,
        //                 // label: "Data",
        //                 borderColor: "#6590f4",
        //                 pointBorderColor: "#f4009c",
        //                 pointBackgroundColor: "#13f400",
        //                 pointHoverBackgroundColor: "#f4e100",
        //                 pointHoverBorderColor: "#9200f4",
        //                 pointBorderWidth: 10,
        //                 pointHoverRadius: 20,
        //                 pointHoverBorderWidth: 30,
        //                 pointRadius: 5,
        //             },
        //             {
        //                 backgroundColor: gradient2,
        //             }
        //
        //         ]
        //
        //         dataSet = _.map(sData, (eachData, idx) => {
        //             return (
        //                 {
        //                     label: idx === 0 ? '沒做手術治療' : '有做手術治療',
        //                     data: eachData,
        //                     borderWidth: borderWidth,
        //                     fill: fill
        //                 }
        //             )
        //         })

                finalData = this.combindStyle(styles, dataSet)

                return finalData

            case 'ct'://(化療)
                dataSet = _.map(sData, (eachData, idx) => {
                    return (
                        {
                            label: idx === 0 ? '沒做化學治療' : '有做化學治療',
                            data: eachData,
                            borderWidth: borderWidth,
                            fill: fill
                        }
                    )
                })
                finalData = this.combindStyle(styles, dataSet)
                return finalData

            case 'rt'://(電療)
                dataSet = _.map(sData, (eachData, idx) => {
                    return (
                        {
                            label: idx === 0 ? '沒做電療' : '有做電療',
                            data: eachData,
                            borderWidth: borderWidth,
                            fill: fill
                        }
                    )
                })
                finalData = this.combindStyle(styles, dataSet)
                return finalData

            case 'ht'://(賀爾蒙治療)
                dataSet = _.map(sData, (eachData, idx) => {
                    return (
                        {
                            label: idx === 0 ? '沒做賀爾蒙治療' : '有做賀爾蒙治療',
                            data: eachData,
                            borderWidth: borderWidth,
                            fill: fill
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
        const loading = this.props.loading

        if (loading) {
            this.loadStatus = true
        } else if (this.loadStatus) {
            _.delay(() => {
                this.loadStatus = false
                this.forceUpdate()
            }, 1)
        }

        if (this.loadStatus) {
            return (
                <div>
                    <TestLoading/>
                </div>
            )
        }
        let data = []

        if (this.props.viewer.survival) {
            data = this.props.viewer.survival.data;
        }

        const feature = this.props.feature
        const chartData = this.makeChartData(feature, data)

        return (
            <div>
                <Paper className="Paper_container" style={{backgroundColor: '#fff'}}>
                    <LineChart data={chartData}/>
                </Paper>
            </div>
        );
    }
}

const container = createFragmentContainer(Report, {
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

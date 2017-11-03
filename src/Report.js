import React from 'react';
import 'react-select/dist/react-select.css';
import ColorBrickLoading from './color_brick_loading'
import LineChart from './components/LineChart';
import * as Chart from 'chart.js'
import Paper from 'material-ui/Paper'
import _ from 'lodash';
import {observer} from 'mobx-react'
import {toJS} from 'mobx'

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

    makeChartData(data) {
        // let fData = _.map(data, x => x.survival)
        // let sData = _.map(fData, x => _.map(x, y => y.rate))
        let dataSet = []
        let finalData = []
        let styles = []
        const borderWidth = 3
        const fill = false
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

        const stylesArray = [
            {
                backgroundColor: gradient1,
                // label: "Data",
                borderColor: "#6590f4",
                pointBorderColor: "#50e3c2",
                pointBackgroundColor: "#50e3c2",
                pointBorderWidth: 3,
                pointRadius: 3,
            },
            {

                backgroundColor: gradient2,
                borderColor: "#ef4a4a",
                pointBorderColor: "#ffd73e",
                pointBackgroundColor: "#ffd73e",
                pointBorderWidth: 3,
                pointRadius: 3,
            }
        ]
        styles = stylesArray
        // sData = [[0.65, 0.59, 0.90, 0.81, 0.56, 0.55, 0.40], [0.50, 0.50, 0.59, 0.50, 0.50, 0.50, 0.59]]
        dataSet = _.map([toJS(data)], (eachData, idx) => {
            return (
                {
                    label: idx === 0 ? '沒做手術治療' : '有做手術治療',
                    data: eachData,
                    borderWidth: borderWidth,
                    lineTension: 0,
                    fill: fill
                }
            )
        })
        // finalData = this.combindStyle(styles, dataSet)
        return dataSet

        // switch (feature) {
        //     case 'op'://(手術)
        //         styles = stylesArray
        //         // sData = [[0.65, 0.59, 0.90, 0.81, 0.56, 0.55, 0.40], [0.50, 0.50, 0.59, 0.50, 0.50, 0.50, 0.59]]
        //         dataSet = _.map(sData, (eachData, idx) => {
        //             return (
        //                 {
        //                     label: idx === 0 ? '沒做手術治療' : '有做手術治療',
        //                     data: eachData,
        //                     borderWidth: borderWidth,
        //                     lineTension: 0,
        //                     fill: fill
        //                 }
        //             )
        //         })
        //         finalData = this.combindStyle(styles, dataSet)
        //         return finalData

        //     case 'ct'://(化療)
        //         styles = stylesArray
        //         dataSet = _.map(sData, (eachData, idx) => {
        //             return (
        //                 {
        //                     label: idx === 0 ? '沒做化學治療' : '有做化學治療',
        //                     data: eachData,
        //                     borderWidth: borderWidth,
        //                     fill: fill,
        //                     lineTension: 0
        //                 }
        //             )
        //         })
        //         finalData = this.combindStyle(styles, dataSet)
        //         return finalData

        //     case 'rt'://(放療)

        //         styles = stylesArray

        //         dataSet = _.map(sData, (eachData, idx) => {
        //             return (
        //                 {
        //                     label: idx === 0 ? '沒做放療' : '有做放療',
        //                     data: eachData,
        //                     borderWidth: borderWidth,
        //                     fill: fill,
        //                     lineTension: 0
        //                 }
        //             )
        //         })
        //         finalData = this.combindStyle(styles, dataSet)
        //         return finalData

        //     case 'ht'://(賀爾蒙治療)

        //         styles = stylesArray

        //         dataSet = _.map(sData, (eachData, idx) => {
        //             return (
        //                 {
        //                     label: idx === 0 ? '沒做賀爾蒙治療' : '有做賀爾蒙治療',
        //                     data: eachData,
        //                     borderWidth: borderWidth,
        //                     fill: fill,
        //                     lineTension: 0
        //                 }
        //             )
        //         })
        //         finalData = this.combindStyle(styles, dataSet)
        //         return finalData
        //     case 'neo_adj': //(術前治療)
        //         return []
        //         break;
        //     default:
        //         return []
        // }
    }

    render() {

        // if (loading) {
        //     this.loadStatus = true
        // } else if (this.loadStatus) {
        //     _.delay(() => {
        //         this.loadStatus = false
        //         this.forceUpdate()
        //     }, 1200)
        // }

        let data = dataStore.survivalData

        const chartData = this.makeChartData(data)
        console.log(chartData);
        return (
            <div>
                <Paper className="Paper_container" style={{backgroundColor: '#fff'}}>
                    {<LineChart data={chartData}/>}
                </Paper>
            </div>
        );
    }
}

export default observer(Report)

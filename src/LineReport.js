import React from 'react';
import 'react-select/dist/react-select.css';
import * as Chart from 'chart.js'
import _ from 'lodash';
import {observer} from 'mobx-react'
import {toJS} from 'mobx'

import Paper from 'material-ui/Paper'
import ColorBrickLoading from './color_brick_loading'
import BarChartStack from './components/BarChartStack'
import LineChart from './components/LineChart';
import RaisedButton from 'material-ui/RaisedButton'

import dataStore from './store/data'

class LineReport extends React.Component {
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
        let sData = _.map(data, x => parseFloat(parseFloat(x).toFixed(2)))
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
        dataSet = _.map([sData, sData], (eachData, idx) => {
            return (
                {
                    data: eachData,
                    borderWidth: borderWidth,
                    lineTension: 0,
                    fill: fill
                }
            )
        })
        finalData = this.combindStyle(styles, dataSet)
        return dataSet
    }

    render() {

        let data = dataStore.survivalData

        const chartData = this.makeChartData(data)

        return (
            <div>
                <Paper className="Paper_container" style={{backgroundColor: '#fff'}}>
                    {<LineChart data={chartData} labels={_.range(11)}/>}
                </Paper>
                <div style={{
                    width: '100%',
                    margin: '20px 0px',
                    textAlign: 'center'
                }}>
                    <RaisedButton onClick={() => {
                        dataStore.changeReportType('bar')
                    }}>
                        <span style={{
                            color: '#3c3c3c',
                            fontSize: '18px',
                            display: 'block'
                        }}>柱狀圖</span>
                    </RaisedButton>
                </div>
            </div>
        );
    }
}

export default observer(LineReport)

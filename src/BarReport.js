import React from 'react';
import * as Chart from 'chart.js'
import _ from 'lodash';
import {observer} from 'mobx-react'
import {toJS} from 'mobx'

import Paper from 'material-ui/Paper'
import BarChartStack from './components/BarChartStack';
import RaisedButton from 'material-ui/RaisedButton'

import dataStore from './store/data'
import optionStore from './store/option'

class LineReport extends React.Component {
    constructor(props) {
        super(props);
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

    makeBarData(data) {
        const dataOrder = optionStore.barPriority.map(x => x.order)
        const dataSet = _.map(dataOrder, (each, idx) => {
            const thisData = data.filter((x) => (
                (x.rt == each.rt) && (x.ht == each.ht) && (x.ct == each.ct)
            ))

            return (
                {
                    label: optionStore.barPriority.map(x => x.label)[idx],
                    data: [
                        parseFloat(parseFloat(thisData[0].survival[5]).toFixed(3)),
                        parseFloat(parseFloat(thisData[0].survival[10]).toFixed(3)),
                    ],
                    borderWidth: 1,
                }
            )
        })
        const stylesArray = [
            {
                // backgroundColor: 'rgba(175, 143, 152,.8)',
                // borderColor: 'rgba(255, 255, 255,.8)',
                backgroundColor: 'rgba(218,167,194,1)',
                borderColor: "rgba(255,255,255,1)",
            },
            {
                backgroundColor: 'rgba(220, 163, 174,1)',
                borderColor: "rgba(255, 255, 255,1)",
            },
            {
                backgroundColor: 'rgba(175, 143, 152,1)',
                borderColor: 'rgba(255, 255, 255,1)',
                // backgroundColor: 'rgba(218,167,194,.8)',
                // borderColor: "rgba(255,255,255,.8)",
            }
        ]
        const finalData = this.combindStyle(stylesArray, dataSet)
        return finalData
    }

    render() {

        let data = dataStore.fetchData
        const chartData = this.makeBarData(data)

        return (
            <div style={{height: '100%'}}>
                <Paper className="Paper_container" style={{backgroundColor: '#fff', minHeight: '400px'}}>
                    {<BarChartStack data={chartData} labels={['5', '10']}/>}
                </Paper>
                <div style={{
                    width: '100%',
                    margin: '20px 0px',
                    textAlign: 'center'
                }}>
                    <RaisedButton onClick={() => {
                        dataStore.changeReportType('line')
                    }}>
                        <span style={{
                            color: '#3c3c3c',
                            fontSize: '18px',
                            display: 'block'
                        }}>折線圖</span>
                    </RaisedButton>
                </div>
            </div>
        );
    }
}

export default observer(LineReport)


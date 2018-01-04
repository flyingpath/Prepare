import React from 'react';
import * as Chart from 'chart.js'
import _ from 'lodash';
import {observer} from 'mobx-react'
import {toJS} from 'mobx'

import Paper from 'material-ui/Paper'
import BarChartStack from './components/BarChartStack';

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
        const barData =  optionStore.barPriority

        const dataOrder = barData.map(x => x.order)
        const dataSet = _.map(dataOrder, (each, idx) => {
            const thisData = data.filter((x) => (
                (x.rt == each.rt) && (x.ht == each.ht) && (x.ct == each.ct)&& (x.herceptin == each.herceptin)
            ))

            console.log(
                'rt:', each.rt, 
                'ht:',each.ht, 
                'ct:',each.ct,
                'herceptin:',each.herceptin
            )
            
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
            },
            {
                backgroundColor: '#E9AC69',
                borderColor: '#E9AC69',
            },
            {
                backgroundColor: 'rgb(233, 124, 31)',
                borderColor: 'rgb(233, 124, 31)',
            }
        ]
        const finalData = this.combindStyle(stylesArray, dataSet)
        return finalData
    }

    render() {

        let data = dataStore.fetchData
        // const barBaseline = {
        //     label: optionStore.barPriority[0],
        //     data:   data.filter((x) => (
        //            (x.rt == this.label.rt) 
        //         && (x.ht == this.label.ht) 
        //         && (x.ct == this.label.ct)
        //         && (x.herceptin == this.label.herceptin)
        //     )),
        //     color:'black'
        // } 
        const chartData = this.makeBarData(data)

        return (
            <div style={{ position:'relative'}}>
                <Paper className="Paper_container" style={{backgroundColor: '#fff', minHeight: '400px'}}>
                    {
                        <BarChartStack 
                            data={chartData}
                            labels={['5', '10']}
                        />
                    }
                </Paper>
            </div>
        );
    }
}

export default observer(LineReport)


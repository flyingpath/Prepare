import React from 'react'
import Chart from 'chart.js'

class LineChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.renderChart = this.renderChart.bind(this)
        this.lineChartIsRender = false
    }

    componentDidMount(){
        this.renderChart()
    }

    componentDidUpdate(){
        this.renderChart()
    }

    findMinData(data){
        let min = 1
        data.forEach(x=>{
            x.data.forEach(subX=>{
                if (subX<min){
                    min = subX
                }
            })
        })
        return min
    }
    renderChart(){
        if(this.lineChart){
            const labels = this.props.labels
            const dataSets = this.props.data

            const minData = this.findMinData(dataSets)
            const myChart = new Chart(this.lineChart, {
                type: 'bar',
                data: {
                    labels: this.props.labels,
                    datasets: dataSets
                },
                options:{
                    scales: {
                        xAxes: [
                            {
                                stacked: true,
                                gridLines: {
                                    display: true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: ['經過幾年後']
                                },
                                ticks: {
                                    fontSize: 14
                                }
                            }
                        ],
                        yAxes: [
                            {
                                // stacked: true,
                                gridLines: {
                                    display: true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: ['存活率']
                                },
                                ticks: {
                                    fontSize: 14,
                                    min: minData>0.5?(Math.round(minData*100)/100).toFixed(2)-0.01:0,
                                    max: 1
                                }
                            }
                        ],
                    },
                    tooltips:{
                        enabled: false
                    },
                    events:[],
                    legend:{
                        display: true,
                        position:'bottom',
                        labels:{
                            boxWidth:20,
                        },
                    },
                    layout: {
                        padding: {
                            right: 5,
                            top:30
                        }
                    },
                    animation: {
                        onComplete: (object)=>{
                            if(!this.lineChartIsRender){
                                const chartInstance = object.chart
                                const ctx = chartInstance.ctx;
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                const allLineData = this.props.data
                                allLineData.forEach((dataset, i)=>{
                                    const meta = chartInstance.controller.getDatasetMeta(i)
                                    meta.data.forEach((line, index)=>{
                                        const data = dataset.data[index]; 
                                        let numData = (parseFloat(data)*100).toFixed(1)
                                        let text = String(numData)                           
                                        text += '%'
                                        ctx.fillStyle="white"

                                        let deltaX, deltaY,anotherData
                                    //---- 分上下
                                        deltaY = 15
                                        deltaX = 0
                                    //----------------
                                    //---- 左右微調    
                                        if(index == 0){
                                            deltaX += 5
                                        }else if(index == 5){
                                            deltaX -= 17
                                        }
                                        ctx.fillText(text, line._model.x+deltaX, line._model.y + deltaY);
                                    })
                                })
                            }
                        }
                    }
                },
            })
        }
    }


    handleClick() {

    }

    render() {
        const data = this.props.data
        if(data.length===0){
            return (
                <canvas>
                </canvas>
            )
        }else{
            return (
                <canvas
                    id = 'prepare-bar-chart' 
                    ref={(div)=>this.lineChart = div} 
                    height="400px"
                >
                </canvas>
            )
        }
    }
}

LineChart.defaultProps = {
    labels: ["5"],
    data: [
        {
            label: 'A',
            data: [0.4],
            backgroundColor: 'rgba(227, 80, 80, 0.5)',
            borderWidth: 1,
            fill: false
        },
        {
            label: 'B',
            data: [0.7],
            backgroundColor: 'rgba(82, 227, 80, 0.5)',
            borderWidth: 1,
            fill: false
        },
        {
            label: 'C',
            data: [0.9],
            backgroundColor: 'rgba(80, 145, 227, 0.5)',
            borderWidth: 1,
            fill: false
        },        
    ]
};

export default LineChart
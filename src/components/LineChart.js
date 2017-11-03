import React from 'react'
import Chart from 'chart.js'
// import _ from 'lodash'

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

    componentWillUpdate(){
        this.renderChart()
    }

    renderChart(){
        if(this.lineChart){
            const labels = this.props.labels
            const dataSets = this.props.data
            const myChart = new Chart(this.lineChart, {
                type: 'line',
                data: {
                    labels: [ '0', '1', '2', '3', '4', '5' ],
                    datasets: dataSets
                },
                options:{
                    scales: {
                        xAxes: [
                            {
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
                                gridLines: {
                                    display: true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: ['存活率']
                                },
                                ticks: {
                                    fontSize: 14,
                                    min: 0,
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
                                        let numData = Math.round(parseFloat(data)*100)
                                        let text = String(numData)                           
                                        text += '%'
                                        ctx.fillStyle="black"
                                        
                                        let deltaX, deltaY,anotherData
                                    //---- 分上下
                                        if(i==0) {
                                            anotherData = allLineData[1].data
                                        }else{
                                            anotherData = allLineData[0].data
                                        }
                                        if(parseFloat(anotherData[index])>parseFloat(data)){
                                            deltaX = +10; 
                                            deltaY = +20
                                        }else{ deltaX = +10; deltaY = -10 }
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
                    id = 'prepare-line-chart' 
                    ref={(div)=>this.lineChart = div} 
                    style={{width:'250px', height:'12rem'}}
                >
                </canvas>
            )
        }
    }
}

LineChart.defaultProps = {
    labels: ["1", "2", "3", "4", "5"],
    dataSets: [{
        label: '多少年後',
        data: [0.6, 0.7, 0.4, 0.1, 0.05],
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
        ],
        borderWidth: 1,
        fill: false
    }]
};

export default LineChart
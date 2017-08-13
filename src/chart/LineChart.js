import React from 'react'
import Chart from 'chart.js'
// import _ from 'lodash'

class LineChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.renderChart = this.renderChart.bind(this)
        // this.lineChart
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
            console.log(dataSets);
            const myChart = new Chart(this.lineChart, {
                type: 'line',
                data: {
                    labels: ['1', '2', '3', '4', '5' ],
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
                                    fontSize: 14
                                }
                            }
                        ]
                    }
                }
            })
        }
    }


    handleClick() {

    }

    render() {
        const data = this.props.data
        if(data.length===0){
            return (
                <div>
                
                </div>
            )
        }else{
            return (
                <canvas 
                    id = 'prepare-line-chart' 
                    ref={(div)=>this.lineChart = div} 
                    style={{width:'300px', height:'200px'}}
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
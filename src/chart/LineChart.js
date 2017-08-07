import React, { Component } from 'react' 
import Chart from 'chart.js'
import _ from 'lodash' 

class LineChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.renderChart = this.renderChart.bind(this)
        this.lineChart
    }

    componentDidMount(){
        this.renderChart()
    }

    componentWillUpdate(){
        this.renderChart()
    }

    renderChart(){
        if(!this.lineChart){
            const labels = this.props.labels
            const dataSets = this.props.dataSets
            console.log(this.lineChart)
            const myChart = new Chart(this.lineChart, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: dataSets
                }
            })
        }
    }


    handleClick() {

    }

    render() {
        const data = this.props.data
        if(data==[]){
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
        data: [0.6, 0.7, 0.4, 0.1],
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
        borderWidth: 1
    }]
};

export default LineChart
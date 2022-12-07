import { Options } from 'highcharts';
import { __values } from 'tslib';


export function brfDoughnutChartOptions(x: number, x1: number, r1: number): Options {
    return {
        chart: {
            type: 'pie',
            plotShadow: false,
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                innerSize: '80%',
                borderWidth: 1,
                borderColor: null!,
                slicedOffset: 30,
                dataLabels: {
                    connectorWidth: 0
                }

            }
        },
        title: {
            verticalAlign: 'middle',
            floating: true,
            text: (x / x1) * 100 + '%',
            style: {
                fontSize:'2rem',
                fontFamily: 'popins, sans-serif' , 
                
            }
            
        },
        legend: {
            enabled: false,
        },
        series: [
            {
                type: 'pie',
                data: [
                    {
                        name: '',  
                        y: x1,
                        color: '#fa3e89'
                    },
                    {
                        name: '',
                        y: x,
                        color: '#6176eb'
                    },
                ]
            }
        ]
    };
}
import React from 'react'
import Chart from "react-apexcharts";

const series = [
    30, 8, 8, 15, 39
];

const labels = [
    "Presale",
    "Liquidity",
    "Locked",
    "Unlocked",
    "Burned"
]

export default function DonutChart() {
    const options = {
        colors: ["#307856", "#E56060", "#239C63", "#C89211", "#585B79"],
        labels: labels,
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            fontSize: '14px',
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            color: "#464754",
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            color: "#464754",
                            offsetY: 2,
                            formatter: function (val) {
                                return val + "%"
                            }
                        },
                    }
                }
            }
        },
        stroke: {
            width: 0
        },
        fill: {
            colors: ["#307856", "#E56060", "#239C63", "#C89211", "#585B79"]
        },
        dataLabels: {
            enabled: false
        },
        chart: {
            type: 'donut',
        },

        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {

                    position: 'bottom'
                }
            }
        }],
        legend: {
            show: false,
        },
        tooltip:{
            enabled: false,
        }
    }
    return (
        <Chart
            options={options}
            series={series}
            type="donut"
            width="300"
        />
    )
}

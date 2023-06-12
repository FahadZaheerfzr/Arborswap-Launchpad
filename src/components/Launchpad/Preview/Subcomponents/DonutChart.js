import React from 'react'
import Chart from "react-apexcharts";


const labels = [
    "Presale",
    "Liquidity",
    "Locked",
    "Unlocked",
    "Burned"
]

export default function DonutChart({presale, liquidity, burned, locked, unlocked}) {
    //liquidity to integer
    const liquidityFloat = parseFloat(liquidity)
    const series = [presale, liquidityFloat, 
        // locked, unlocked, burned
    ]
    const options = {
        colors: ["#307856","#585B79","#E56060","#239C63","#C89211"],
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
            colors: ["#307856","#585B79","#E56060","#239C63","#C89211"]
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

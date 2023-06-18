import { ThemeContext } from 'context/ThemeContext/ThemeProvider';
import React, { useContext } from 'react'
import Chart from "react-apexcharts";


const labels = [
    "Presale",
    "Liquidity",
    "Locked",
    "Unlocked",
    "Burned"
]

export default function DonutChart({presale, liquidity, burned, locked,supply}) {
    const {theme} = useContext(ThemeContext)

    //liquidity to integer
    const presalePercent = presale/supply*100
    const liquidityPercent = parseFloat((liquidity/supply*100).toFixed(2))
    const unlockedPercent = parseFloat(((supply-liquidity-presale)/supply*100).toFixed(2))
    const lockedPercent = parseFloat((locked/supply*100).toFixed(2))
    const burnedPercent = parseFloat((burned/supply*100).toFixed(2))
    const series = [presalePercent, liquidityPercent ,
        lockedPercent, unlockedPercent, burnedPercent
    ]
    const options = {
        colors: ["#307856","#585B79","#E56060","#F8CF6B","#C89211"],
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
                            color: theme==="dark"? "#fff" :"#464754",
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Gilroy',
                            fontWeight: 700,
                            color: theme==="dark"? "#fff" :"#464754",
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
            colors: ["#307856","#585B79","#E56060","#F8CF6B","#C89211"]
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

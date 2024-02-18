import classNames from "classnames/bind";

import styles from './TodoChart.module.scss'
import InfoCard from '../InfoCard'
import { Calendar_Icon, Clock_Icon, Fire_Icon } from "../Icons";
import { Bar } from "react-chartjs-2"
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'
import { useState } from "react";

const cx = classNames.bind(styles);

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale
);

function TodoChart () {

    const [dataChart,setDataChart] = useState(
        {
            labels: [
              "MON",
              "TUE",
              "WED",
              "THU",
              "FRI",
              "SAT",
              "SUN"
            ],
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: [
                  "#3e95cd"
                ],
                data: [7.5, 6.5, 1, 2, 0.5, 0, 5]
              }
            ]
        }
    );


    const [optionChart, setOptionChart] = useState(
        {
            legend: { display: false },
            title: {
              display: true,
              text: "Predicted world population (millions) in 2050"
            }
        }
    );
    

    return (
        <div className={cx('container')}>
            <div className={cx('info-card-wrap')}>
                <InfoCard icon={<Clock_Icon></Clock_Icon>} title={'Giờ tập trung'}></InfoCard>
                <InfoCard icon={<Fire_Icon></Fire_Icon>} title={'Giờ tập trung'}></InfoCard>
                <InfoCard icon={<Calendar_Icon></Calendar_Icon>} title={'Giờ tập trung'}></InfoCard>
            </div>
            <div className={cx('chart-wrap')}>
                <Bar width={400} height={450} data={dataChart} options={optionChart}></Bar>
            </div>
        </div>
    );
}

export default TodoChart;
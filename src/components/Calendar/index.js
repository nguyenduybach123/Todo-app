import classNames from "classnames/bind";
import 'react-calendar/dist/Calendar.css';
import { default as Calendar_UI } from 'react-calendar';

import styles from './Calendar.module.scss'
import useTodosContext from "../../hooks/useTodosContext";
import { useState } from "react";


const cx = classNames.bind(styles);

const defFunc = () => {}

function Calendar ({onSetValueDate = defFunc}) {

    const { setIsOpenCalendar } = useTodosContext();

    const [selectDate, setSelectDate] = useState(new Date());

    const handleClose = () => {
        setIsOpenCalendar(false);
    }

    const handleSubmit = () => {
        onSetValueDate(selectDate);
        setIsOpenCalendar(false);
    }

    return (
        <div className={cx('container-background')}>
            <div className={cx('container')}>
                <h3 className={cx('title')}>Chọn ngày</h3>
                <Calendar_UI onChange={setSelectDate} value={selectDate} ></Calendar_UI>
                <div className={cx('menu-bar')}>
                    <button onClick={handleClose}>Hủy</button>
                    <button onClick={handleSubmit}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default Calendar;
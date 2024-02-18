import classNames from "classnames/bind";
import {default as TimePicker_UI} from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import styles from './TimePicker.module.scss'

const cx = classNames.bind(styles);


function TimePicker () {
    return (
        <div className={cx('container-background')}>
            <div className={cx('container')}>
                <TimePicker_UI></TimePicker_UI>
            </div>
        </div>
    )
} 

export default TimePicker;
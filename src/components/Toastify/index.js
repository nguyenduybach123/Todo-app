import classNames from "classnames/bind";

import styles from './Toastify.module.scss'
import { Close_Icon } from "../Icons";
import { useState, useEffect } from "react";

const cx = classNames.bind(styles);

function Toastify ({message, state, position = 'right', setComplete}) {

    const [isVisible, setIsVisible] = useState(true);
    const [isCountDown, setIsCountDown] = useState(false);
    const [isMoving, setIsMoving] = useState(false);


    const handleClose = () => {
        setTimeout(() => {
            setIsVisible(false);
            setComplete(false);
        }, 500);
        setIsMoving(false);
    }

    useEffect(() => {
        
        const timer_1 = setTimeout(() => {
            setIsMoving(true);
        }, 50)

        const timer_2 = setTimeout(() => {
            setIsCountDown(true);
        }, 1000)

        const timer_3 = setTimeout(() => {
          setIsMoving(false);
        }, 6500);


        const timer_4 = setTimeout(() => {
            setIsVisible(false);
            setComplete(false);
        }, 7000);
  
        return () => {
            clearTimeout(timer_1);
            clearTimeout(timer_2);
            clearTimeout(timer_3);
            clearTimeout(timer_4);
        }
    }, []);

    return (
        <>
            {
                isVisible &&
                <div className={cx('container', position,{'active': isMoving})}>
                    <div className={cx('content')}>
                        <div className={cx('message')}>{message}</div>
                        <Close_Icon className={cx('close')} onClick={handleClose}></Close_Icon>
                    </div>
                    <div className={cx('duration')}>
                        <div className={cx('time-bar',{'active': isCountDown})}></div>
                    </div>
                </div>
            }
        </>
    );
}


export default Toastify;

import classNames from "classnames/bind";

//import internal
import styles from './CheckBox.module.scss'
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);

function CheckBox ({text, className, checkedDef = false, onChecked}) {

    const inputRef = useRef();

    const handleChecked = (e) => {
        onChecked(e.target.checked)
    }

    useEffect(() => {
        inputRef.current.checked = checkedDef;
    }, [checkedDef])

    return (
        <label className={cx('container', className)}>
            <input ref={inputRef} className={cx('check-input')} type="checkbox" onChange={handleChecked}></input>
            <span className={cx('checkmark')}></span>
            <label>{text}</label>
        </label>
    );
}

export default CheckBox;
import classNames from "classnames/bind";

import { forwardRef } from "react";
import styles from './Wrapper.module.scss'

const cx = classNames.bind(styles);

function Wrapper ({className, children}, ref) {
    return (
        <div ref={ref} className={cx('container', className)}>
            {children}
        </div>
    );
}

export default forwardRef(Wrapper)
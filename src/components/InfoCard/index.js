import classNames from "classnames/bind";

import styles from './InfoCard.module.scss'


const cx = classNames.bind(styles);

function InfoCard ({title, icon, value = '--'}) {

    const Icon = icon

    console.log(Icon)

    return (
        <div className={cx('container')}>
            <div className={cx('icon-wrap')} >
            {
                icon
            }
            </div>
            <div className={cx('content-wrap')}>
                <p className={cx('content-value')}>{value}</p>
                <p className={cx('content-title')}>{title}</p>
            </div>
        </div>
    );
}

export default InfoCard;
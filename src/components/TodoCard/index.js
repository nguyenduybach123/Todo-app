import classNames from "classnames/bind";
import styles from './TodoCard.module.scss'

const cx = classNames.bind(styles);

function TodoCard({title, content}){

    return (
        <div className={cx('container')}>
            <div className={cx('menuBar')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </div>
            <div className={cx('todoHeader')}>
                <p className={cx('title')}>{title}</p>
                <div className={cx('completeBox')}>
                    <input type="checkbox"></input>
                </div>
            </div>
            <p className={cx('content')}>{content}</p>
        </div>
    );

}

export default TodoCard;
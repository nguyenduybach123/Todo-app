import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar() {

    return (
        <header>
             <div className={cx('container')}>
                <Link className={cx('title')} to={'/'}>
                    <h1>Todo List</h1>
                </Link>
             </div>
        </header>
    );
}

export default Navbar;
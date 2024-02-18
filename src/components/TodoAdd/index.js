import classNames from "classnames/bind";

import styles from "./TodoAdd.module.scss";
import useTodosContext from "../../hooks/useTodosContext";
import { Plus_Icon } from "../Icons";

const cx = classNames.bind(styles);

function TodoAdd ({className}) {

    const { setDisplay } = useTodosContext();
    
    const addTodoHandler = () => {
        setDisplay('todo-form');
    }

    return (
        <div className={cx('container', className)}>
            <button onClick={addTodoHandler} className={cx('btn-add')}>
                <Plus_Icon width="35" height="35" className={cx('btn-icon')}></Plus_Icon>
            </button>
        </div>
    )
}

export default TodoAdd;
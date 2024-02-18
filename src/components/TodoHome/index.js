import classNames from "classnames/bind";

import styles from './TodoHome.module.scss'
import TodoAdd from "../../components/TodoAdd";
import TodoList from "../../components/TodoList";
import Tabs from "../Tabs";
import { ListCheck_Icon } from "../../components/Icons";
import useTodosContext from "../../hooks/useTodosContext";
import TodoChart from "../TodoChart";


const cx = classNames.bind(styles);

function TodoHome () {


    const { display } = useTodosContext();

    const tabItems = [
        {
            title: "Lịch",
            icon: null,
            display: "todo-home"
        },
        {
            title: "Thống kê",
            icon: null,
            display: "todo-chart"
        }
    ]



    return (
        <div className={cx('home-wrapper')}>
            <div className={cx('header-container-app')}>
                <div className={cx('header-app')}>
                    <p>Todo List</p>
                </div>
                <div className={cx("tabs-wrapper")}>
                    <Tabs items={tabItems}></Tabs>
                </div>
            </div>

            {
                (display === 'todo-home') ? 
                <>
                    <div className={cx('content-container-app')}>
                        <TodoList></TodoList>
                    </div>

                    <div className={cx('add-form')}>
                        <TodoAdd className={cx('add-btn')}></TodoAdd>
                    </div> 
                </> :
                (display === 'todo-chart') ?
                <>
                    <TodoChart></TodoChart>
                </> :
                <></>
            }
        </div>
    )
}

export default TodoHome;
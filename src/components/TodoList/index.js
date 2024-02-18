// import external
import { useEffect, useState } from "react";
import classNames from "classnames/bind";


// import internal
import styles from './TodoList.module.scss'
import useTodosContext from "../../hooks/useTodosContext";
import TodoCard from "../TodoCard";
import { CheckSquare2_Icon, CheckSquareFill_Icon, Close_Icon, Search_Icon, SquareFill_Icon, ThreeDots_Icon, Trash_Icon } from "../Icons";
import Wrapper from "../Wrapper";

const cx = classNames.bind(styles);

function TodoList () {

    const { todos, dispatch, setDisplay, listTodoSelect, setListTodoSelect, setIsSelectAllTodo } = useTodosContext();
    const [isTodoChecker, setTodoChecker] = useState(false);
    const [isSelectAll, setIsSelectAll] = useState(false);
    const [isOpenSetting, setIsOpenSetting] = useState(false);
    const [isOpenCompleteList, setIsOpenCompleteList] = useState(false);


    const handleSelectAll = () => {
        if(isSelectAll === false) {
            setIsSelectAll(true);
            setIsSelectAllTodo(true);
        }
        else {
            setIsSelectAll(false);
            setIsSelectAllTodo(false);
        }
    }

    const handleSearchDisplay = () => {
        setDisplay('todo-search');
    }
    
    const handleDeleteListSelectTodo = async () => {

        const resDeleteAPI = await fetch('/api/todos/delete-multiple', {
            method: 'DELETE',
            body: JSON.stringify({list_id: listTodoSelect}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await resDeleteAPI.json();

        if (!resDeleteAPI.ok) {
            console.log('ERROR');
        }
        if (resDeleteAPI.ok) {
            dispatch({type:'DELETE_TODO', payload: json});
        }

    }

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('/api/todos');
            const json = await response.json();

            if(response.ok) {
                dispatch({type: 'SET_TODOS', payload: json});
            }

        }

        fetchTodos();

    }, [dispatch])


    return (
        <div className={cx('container')}>
            <div className={cx('menu-bar-wrap')}>
                <div className={cx('menu-bar')}>
                    {
                        isTodoChecker && 
                        <div className={cx('menu-close')}>
                            <Close_Icon width="2.3rem" height="2.3rem" 
                                onClick={() => {
                                    setTodoChecker(false);
                                    setListTodoSelect([]);
                                    setIsSelectAll(false);
                                }}>
                            </Close_Icon>
                            <p className={cx('amount-todo-select')}>{listTodoSelect.length}</p>
                        </div>
                    }
                    <div className={cx('menu-item')}>
                        {
                            (isTodoChecker === false) ?
                                <CheckSquare2_Icon width="1.7rem" height="1.7rem" onClick={() => setTodoChecker(true)}></CheckSquare2_Icon> :
                            (isSelectAll === false) ? 
                                <SquareFill_Icon onClick={handleSelectAll}></SquareFill_Icon> :
                                <CheckSquareFill_Icon onClick={handleSelectAll}></CheckSquareFill_Icon>
                        }
                    </div>
                    <div className={cx('menu-item')}>
                        {
                            (isTodoChecker === false) ?
                                <Search_Icon onClick={handleSearchDisplay}></Search_Icon> :
                                <Trash_Icon onClick={handleDeleteListSelectTodo}></Trash_Icon>
                        } 
                    </div>
                    <div className={cx('menu-item','three-dots')}>
                        <ThreeDots_Icon onClick={() => setIsOpenSetting(!isOpenSetting)}></ThreeDots_Icon>
                        {
                            isOpenSetting &&
                                <Wrapper className={cx('action-setting')}>
                                    {
                                        (isOpenCompleteList === false) ?
                                            <div className={cx('action-item')}>Đã hoàn thành</div> :
                                            <div className={cx('action-item')}>Chưa hoàn thành</div>
                                    }
                                    <div className={cx('action-item')}>Cài đặt</div>
                                </Wrapper>
                        }
                    </div>
                </div>
            </div>
            <div className={cx('list-wrap')}>
            {
                (todos !== null) ?
                    todos.map((todo) => (
                        <TodoCard key={todo._id} todo={todo} isChecker={isTodoChecker}></TodoCard>
                    )) :
                    <></>
            }
            </div>
        </div>
    )
}


export default TodoList;
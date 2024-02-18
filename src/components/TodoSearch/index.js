import classNames from "classnames/bind";

import styles from './TodoSearch.module.scss'
import SearchBox from "../SearchBox";
import { ChevronDown_Icon } from "../Icons";
import useTodosContext from "../../hooks/useTodosContext";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import TodoCard from "../TodoCard";

const cx = classNames.bind(styles);

function TodoSearch () {

    const { todos, setDisplay, dispatch } = useTodosContext();
    const [searchContent, setSearchContent] = useState('');
    const [isSearch,setIsSearch] = useState(false);
    const searchDebounce = useDebounce(searchContent, 800);



    const handleBackToHome = () => {
        setDisplay('todo-home');
    }

    useEffect(() => {

        if(searchDebounce.trim() === '') {
            dispatch({type: 'SET_TODOS', payload: []});
            return;
        }

        const fetchTodos = async () => {
            const response = await fetch(`/api/todos/search?q=${searchDebounce.trim()}`);
            const json = await response.json();

            if(response.ok) {
                dispatch({type: 'SET_TODOS', payload: json});
                setIsSearch(true);
            }
            else {
                console.log('ERROR');
            }
        }

        fetchTodos();

    }, [searchDebounce])
    
    console.log(todos);

    return (
        <div className={cx('container')}>
            <div className={cx('todo-search-wrap')}>
                <div className={cx('input-search-wrap')}>
                    <ChevronDown_Icon className={cx('btn-back')} onClick={handleBackToHome}></ChevronDown_Icon>
                    <div className={cx('input-search')}>
                        <SearchBox setTextChange={setSearchContent}></SearchBox>
                    </div>
                </div>
                <div className={cx('content-search-wrap')}>
                    {
                        todos && isSearch &&
                        todos.map((todo) => (
                            <TodoCard todo={todo}></TodoCard>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default TodoSearch;
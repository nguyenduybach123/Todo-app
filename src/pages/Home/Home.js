import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import TodoCard from "../../components/TodoCard";
import styles from './Home.module.scss'

const cx = classNames.bind(styles);

function Home () {

    const [todos,setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('/api/todos');
            const json = await response.json();

            if(response.ok) {
                setTodos(json);
            }

        }

        fetchTodos();

    },[])

    return (
        <div>
            <div className={cx('todoList')}>
                {
                    todos && todos.map((todo) => (
                        <TodoCard key={todo._id} title={todo.title} content={todo.content}></TodoCard>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;
import classNames from "classnames/bind";

// Import
import styles from './Home.module.scss'
import useTodosContext from "../../hooks/useTodosContext";
import TodoHome from "../../components/TodoHome";
import TodoForm from "../../components/TodoForm";
import TodoSearch from "../../components/TodoSearch";




const cx = classNames.bind(styles);

function Home () {

    const { display } = useTodosContext();

    return (
        <div className={cx('container')}>
            {
                (display === 'todo-home') ? 
                    <TodoHome></TodoHome> :
                (display === 'todo-form') ? 
                    <TodoForm></TodoForm> :
                (display === 'todo-search') ?
                    <TodoSearch></TodoSearch> :
                    <TodoHome></TodoHome>
            }
        </div>
    );
}

export default Home;
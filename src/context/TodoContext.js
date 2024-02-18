import { createContext, useReducer, useState } from 'react';

const TodosContext = createContext();

const todosReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TODOS':
            return {
                todos: action.payload
            }
        
        case 'CREATE_TODO':
            return {
                todos: [action.payload, ...state.todos]
            }
        
        case 'DELETE_TODO':
            return {
                todos: state.todos.filter((todo) => todo._id !== action.payload._id)
        }
            
        default:
            return state;
    }
}

function TodoProvider ({children}) {

    const [state, dispatch] = useReducer(todosReducer, {
        todos: null
    });
    
    const [display, setDisplay] = useState('todo-home');

    const [isOpenCalendar, setIsOpenCalendar] = useState(false);

    const [isStartDay, setIsStartDay] = useState(true);

    const [isOpenTimePicker, setIsOpenTimePicker] = useState(false);

    const [listTodoSelect, setListTodoSelect] = useState([]);

    const [isSelectAllTodo, setIsSelectAllTodo] = useState(false);


    return (
        <TodosContext.Provider value={{...state, display, isOpenCalendar, isOpenTimePicker, isStartDay, listTodoSelect, isSelectAllTodo,
                                        dispatch, setDisplay, setIsOpenCalendar, setIsOpenTimePicker, setIsStartDay, setListTodoSelect, setIsSelectAllTodo}}>
            {children}
        </TodosContext.Provider>
    );

}

export {TodosContext, todosReducer, TodoProvider};
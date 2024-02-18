import { TodosContext } from "../context/TodoContext";
import { useContext } from "react";

function useTodosContext () {
    const context = useContext(TodosContext);

    if (!context){
        throw Error('useTodosContext must be used inside an TodosProvider');
    }

    return context;
}

export default useTodosContext;
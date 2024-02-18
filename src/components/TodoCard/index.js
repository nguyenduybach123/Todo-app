// import external
import classNames from "classnames/bind";

//import internal
import styles from './TodoCard.module.scss'
import useTodosContext from "../../hooks/useTodosContext";
import { ChevronDown_Icon, Trash_Icon, ThreeDots_Icon, PenFill_Icon } from "../Icons";
import { useState, useEffect, useRef } from "react";
import Wrapper from "../Wrapper";
import CheckBox from "../CheckBox";



const cx = classNames.bind(styles);

function TodoCard({ todo, isChecker = false }){

    const { dispatch, setListTodoSelect, isSelectAllTodo } = useTodosContext();
    const [isExpand, setIsExpand] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const menuRef = useRef(null);


    const handleMiniContent = (content) => {
        return (content.length <= 20) ? content : content.slice(0, 20) + " . . .";
    }


    const handleDelete = async () => {
        const resDeleteAPI = await fetch('/api/todos/' + todo._id, {
            method: 'DELETE'
        });

        const json = await resDeleteAPI.json();

        if(resDeleteAPI.ok){
            dispatch({type:'DELETE_TODO', payload: json})
        }
    }


    const handleUpdateStateTodo = async () => {
        const resUpdateAPI = await fetch('/api/todos/' + todo._id, {
            method: 'PATCH',
            body: JSON.stringify({state: 1}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const json = await resUpdateAPI.json();

        if (!resUpdateAPI.ok) {
            console.log('ERROR');
        }
        if (resUpdateAPI.ok) {
            dispatch({type:'DELETE_TODO', payload: json});
        }
        
    }


    const handleExpand = () => {
        setIsExpand(prev => !prev);
    }

    const handleOpenMenu = () => {
        setIsOpenMenu(true);
    }

    const handleClickOutside = (event) => {
        if(isOpenMenu) {
            console.log(menuRef)
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpenMenu(false);
            }
        }
    }

    const handleFormatTime = (time) => {
        return `${time.getDate() < 10 ? '0' : ''}${time.getDate()} / ${time.getMonth() < 10 ? '0' : ''}${time.getMonth()} / ${time.getFullYear()}  
        -  ${time.getHours() < 10 ? '0' : ''}${time.getHours()} : ${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
          document.removeEventListener('click', handleClickOutside);
        };

    }, []);
    
    useEffect(() => {
        if(isChecked === false) {
            setListTodoSelect(prev => prev.filter(item => item !== todo._id));
        }
        else {
            setListTodoSelect(prev => [...prev, todo._id])
        } 
    },[isChecked])

    useEffect(() => {
        setIsChecked(false);
    },[isChecker])

    useEffect(() => {
        if(isSelectAllTodo === true) {
            setIsChecked(true);
        }
        else {
            setIsChecked(false);
        }
    },[isSelectAllTodo])

    return (
        <div className={cx('container')}>
            <div className={cx('cardHeader')}>
                <p className={cx('title')}>{todo.title}</p>
                <ChevronDown_Icon className={cx('expand', {'active': isExpand, 'disactive': !isExpand})} onClick={handleExpand}></ChevronDown_Icon>
            </div>
            <div className={cx('cardContent', {'active': isExpand})}>
                <div className={cx('content', {'active': isExpand})}>
                    <p>
                        {
                            (isExpand === false) ?
                                handleMiniContent(todo.content) :
                                todo.content
                        }
                    </p>
                </div>
                <div className={cx('duration')}>
                    {
                        (isExpand === false) ?
                            <>
                                <p className={cx('create-time')}>{handleFormatTime(new Date(todo.createdAt))}</p>
                            </> :
                            <>
                                <div>
                                    <div>
                                        <p className={cx('duration-time')}>{handleFormatTime(new Date(todo.timeStart))}</p>
                                    </div>
                                    <div>
                                        <p className={cx('duration-time')}>{handleFormatTime(new Date(todo.timeEnd))}</p>
                                    </div>
                                </div>
                                <div className={cx('complete')}>
                                    <button onClick={handleUpdateStateTodo}>Hoàn thành</button>
                                </div>
                            </>
                    }
                </div>
            </div>
            <div className={cx('setting-wrapper')}>
                {
                    isChecker &&
                    <div className={cx('check-complete')}>
                        <CheckBox onChecked={setIsChecked} checkedDef={isChecked}></CheckBox>
                    </div>
                }
                <div className={cx('setting')}>
                    <ThreeDots_Icon onClick={handleOpenMenu}></ThreeDots_Icon>
                </div>
                <Wrapper className={cx('menu-bar',{'active': isOpenMenu})} ref={menuRef}>
                    <div className={cx('menu-item')} onClick={handleDelete}> 
                        <p>Xoá</p>
                        <Trash_Icon></Trash_Icon>
                    </div>
                    <div className={cx('menu-item')}> 
                        <p>Sửa</p>
                        <PenFill_Icon></PenFill_Icon>
                    </div>
                </Wrapper>
            </div>
        </div>
    );

}

export default TodoCard;
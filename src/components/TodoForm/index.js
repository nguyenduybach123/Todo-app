import classNames from "classnames/bind";
import { format } from 'date-fns'

// Import 
import styles from './TodoForm.module.scss';
import { useState } from "react";
import useTodosContext from "../../hooks/useTodosContext";
import { ArrowLeft_Icon, Clock_Icon } from "../Icons";
import Calendar from "../Calendar";
import Toastify from "../Toastify";



const cx = classNames.bind(styles);

function isNumber(input) {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(input);
}


function TodoForm() {

    const { isOpenCalendar, isStartDay,
            setIsStartDay, setIsOpenCalendar, setDisplay, dispatch } = useTodosContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [dayStart, setDayStart] = useState(new Date(Date.now()));
    const [dayEnd, setDayEnd] = useState(new Date(Date.now()));
    const [timeStart, setTimeStart] = useState(0);
    const [timeEnd, setTimeEnd] = useState(0);
    const [minuteStart, setMinuteStart] = useState(0);
    const [minuteEnd, setMinuteEnd] = useState(0);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFieleds] = useState([]);
    const [messageNotification, setMessageNotification] = useState('');
    const [isNotification, setIsNotification] = useState(false);

    const handleOnChangeTime = (value, limit, setValue) => {
        console.log(value)
        if(isNumber(value)) {
            let time = Number(value)
            if(time > limit)
                return;

            setValue(time);
        }

        if(value.length === 0){
            setValue(0);
        }
    }

    const handleDurationTime = ({day, month, year, hour, minute}) => {
        let durationTime = new Date();
        durationTime.setDate(day);
        durationTime.setMonth(month); 
        durationTime.setFullYear(year); 
        durationTime.setHours(hour);
        durationTime.setMinutes(minute);
        return durationTime;
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();        
        
        const todo = {
            title: title,
            content: content,
            timeStart: handleDurationTime({
                day: dayStart.getDate(),
                month: dayStart.getMonth(),
                year: dayStart.getFullYear(),
                hour: timeStart,
                minute: minuteStart
            }),
            timeEnd: handleDurationTime({
                day: dayEnd.getDate(),
                month: dayEnd.getMonth(),
                year: dayEnd.getFullYear(),
                hour: timeEnd,
                minute: minuteEnd
            })
        };

        console.log(todo)

        const resPostAPI = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await resPostAPI.json();

        if (!resPostAPI.ok) {
            console.log('ERROR')
            setError(json.error);
            setEmptyFieleds(json.emptyFields);
        }
        if (resPostAPI.ok) {
            setTitle('');
            setContent('');
            setError(null);
            setEmptyFieleds([]);
            console.log('new todo added', json);
            dispatch({type: 'CREATE_TODO', payload: json});
            setIsNotification(true);
            setMessageNotification('Tạo thành công');
        }
    }

    const handleBackHomePage = () => {
        setDisplay('todo-home');
    }

    const handleOpenCalendar = () => {
        setIsOpenCalendar(true);
    }

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('icon')} onClick={handleBackHomePage}>
                    <ArrowLeft_Icon width="40px" height="40px" className={cx('back-icon')}></ArrowLeft_Icon>
                </div> 
                <h2>Tạo Todo</h2> 
            </div>
            <form className={cx('form-wrapper')} onSubmit={handleSubmit}>                
                <div className={cx('input_wrapper')}>
                    <label className={emptyFields.includes('title') ? cx('lbl_err') : ''} >Tiêu đề : </label>
                    <input
                        className={emptyFields.includes('title') ? cx('form_input_err') : cx('form_input')}
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>

                <div className={cx('input_wrapper')}>
                    <label className={emptyFields.includes('content') ? cx('lbl_err') : ''} >Nội dung : </label>
                    <input
                        className={emptyFields.includes('content') ? cx('form_input_err') : cx('form_input','content_input')} 
                        type="text"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                    />
                </div>

                <div className={cx('input_wrapper')}>
                    <div className={cx('header_input')}>
                        <Clock_Icon className={cx('header-icon')}></Clock_Icon>
                        <label className={emptyFields.includes('content') ? cx('lbl_err') : ''} >Thời gian : </label>
                    </div>
                    <div className={cx('time_input')}>
                        <div onClick={() => {
                                setIsStartDay(true);
                                handleOpenCalendar();
                            }} className={cx('day')}>{format(new Date(dayStart), "dd / MM / yyyy")}</div>
                        <div className={cx('time')}>
                            <input type="text" onChange={(e) => {
                                handleOnChangeTime(e.target.value, 23, setTimeStart)
                            }} value={timeStart}></input>
                            <div> : </div>
                            <input type="text" onChange={(e) => {
                                handleOnChangeTime(e.target.value, 59, setMinuteStart)
                            }} value={minuteStart}></input>
                        </div>
                    </div>
                    <div className={cx('time_input')}>
                        <div onClick={() => {
                                setIsStartDay(false);
                                handleOpenCalendar();
                            }} className={cx('day')}>{format(new Date(dayEnd), "dd / MM / yyyy")}</div>
                        <div className={cx('time')}>
                            <input type="text" onChange={(e) => {
                                handleOnChangeTime(e.target.value, 23, setTimeEnd)
                            }} value={timeEnd}></input>
                            <div> : </div>
                            <input type="text" onChange={(e) => {
                                handleOnChangeTime(e.target.value, 59, setMinuteEnd)
                            }} value={minuteEnd}></input>
                        </div>
                    </div>
                </div>

                <button className={emptyFields.length > 0 ? cx('form_btn','btn_err'): cx('form_btn')}>Tạo</button>
                
                { 
                    error && 
                    <div className={cx('error_notify')}>{error}</div>
                }
                
                {
                    isNotification && <Toastify message={messageNotification} position="top" setComplete={setIsNotification}></Toastify>
                }

            </form>
            {
                isOpenCalendar ? isStartDay ?
                <Calendar onSetValueDate={setDayStart}></Calendar> : <Calendar onSetValueDate={setDayEnd}></Calendar> : <></>
            }
            
        </div>
    );
}


export default TodoForm;
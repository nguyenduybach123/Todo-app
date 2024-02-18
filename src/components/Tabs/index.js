import classNames from "classnames/bind";

import styles from './Tabs.module.scss'
import { useState, useRef, useEffect } from 'react'
import useTodosContext from "../../hooks/useTodosContext";

const cx = classNames.bind(styles);

function Tabs({items}) {

    const { setDisplay } = useTodosContext();

    const [idxTabSelect, setIdxTabSelect] = useState(0);
    const tabRef = useRef();
    const lineRef = useRef();
    const lineLeftDef = useRef();


    useEffect(() => {
        lineLeftDef.current = lineRef.current.offsetLeft
    },[])

    useEffect(() => {
        lineRef.current.style.left =  (tabRef.current.offsetLeft - lineLeftDef.current) + "px";
        lineRef.current.style.width = tabRef.current.offsetWidth + "px";
        console.log(lineRef.current.style)
    },[idxTabSelect])

    return (
        <div className={cx('container')}>
            <div className={cx('tab-list')}>
                {
                    (items !== null) ? 
                        items.map((val, idx) => (
                            <div key={idx} className={cx('tab-item',{'active': (idxTabSelect === idx) ? true : false})} 
                                 onClick={(e) => {
                                    tabRef.current = e.target;
                                    setIdxTabSelect(idx);
                                    setDisplay(val.display);
                                 }} 
                                 ref={(idxTabSelect === idx) ? tabRef : null}>
                                <p>{val && val.title}</p>
                            </div>
                        )) : <></>
                }    
            </div>
            <div className={cx('select-bar')} ref={lineRef}></div>
        </div>
    ); 
}


export default Tabs;
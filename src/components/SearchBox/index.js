import classNames from "classnames/bind";

import { useEffect, useRef, useState } from "react";
import styles from './SearchBox.module.scss'
import { Close_Icon } from "../Icons";


const cx = classNames.bind(styles);

const funcDef = () => {}

function SearchBox ({setTextChange = funcDef}) {

    const inputRef = useRef(null);
    const [searchContent, setSearchContent] = useState('');

    const handleCleanContent = () => {
        setSearchContent('');
        inputRef.current.focus();
    }

    const handleSearchContent = (searchContent) => {
        setSearchContent(searchContent)
        setTextChange(searchContent);
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <div className={cx('container')}>
            <div className={cx('search-box-wrap')}>
                <div className={cx('content-search')}>
                    <input ref={inputRef} className={cx('input-search')} placeholder={'Tìm kiếm ghi chú'} value={searchContent} onChange={(e) => handleSearchContent(e.target.value)}></input>
                </div>
                <div className={cx('btn-reset')}>
                    {
                        (searchContent !== '') ?
                            <Close_Icon width="2.5rem" height="2.5rem" onClick={handleCleanContent}></Close_Icon> :
                            <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchBox;
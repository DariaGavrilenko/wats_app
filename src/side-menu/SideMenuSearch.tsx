import filterIcon from '../assets/img/filterIcon.svg'
import searchIcon from '../assets/img/searchIcon.svg'
import { useState, KeyboardEvent } from 'react'
import s from './SideMenu.module.css'

type SideMenuSearchPropsType = {
    createChat: (number: string) => void
}

const SideMenuSearch = ({ createChat }: SideMenuSearchPropsType) => {
    const [number, setNumber] = useState('')
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            createChat(number)
            setNumber('')
        }
    }
    return (
        <div className={s.searchContainer}>
            <div className={s.inputContainer}  >
                <img src={searchIcon} alt="" className={s.searchIcon} />
                <input placeholder='Enter number to start chat'
                    value={number}
                    onChange={e => setNumber(e.currentTarget.value)}
                    onKeyDown={onKeyHandler}
                    type="text"
                    className={s.input} />
            </div>
            <button className={s.button}>
                <img src={filterIcon} alt="filter" className={s.headersIcon} />
            </button>
        </div>

    )
}

export default SideMenuSearch;
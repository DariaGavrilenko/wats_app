import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import userIcon from '../assets/img/user.svg'
import groopIcon from '../assets/img/groopIcon.svg'
import status from '../assets/img/statusIcon.svg'
import chatsIcon from '../assets/img/chatsIcon.svg'
import menuIcon from '../assets/img/menuIcon.svg'

import s from './SideMenu.module.css'

const SideMenuHeader = () => {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

    const onLogOutHandler = () => {
        localStorage.removeItem('Green_API_Data')
        localStorage.removeItem('chats')
        navigate('/login')
    }

    return (
        <div className={s.sideMenuHeader}>
            <button className={s.button} onClick={() => setIsOpen(!isOpen)}>
                <img src={userIcon} alt="avatar" className={s.avatar} />
            </button >
            {isOpen && <div className={s.logOutContainer}>
                <button className={s.logOutButton} onClick={onLogOutHandler}>Log Out</button>
            </div>}
            <button className={s.button}>
                <img src={groopIcon} alt="groop" className={s.headersIcon} />
            </button>
            <button className={s.button}>
                <img src={status} alt="" className={s.headersIcon} />
            </button>
            <button className={s.button}>
                <img src={chatsIcon} alt="contacts" className={s.headersIcon} />
            </button>
            <button className={s.button}    >
                <img src={menuIcon} alt="menu" className={s.headersIcon} />
            </button>
        </div>
    )
}

export default SideMenuHeader;
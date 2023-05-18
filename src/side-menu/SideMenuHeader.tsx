import s from './SideMenu.module.css'

import userIcon from '../assets/img/user.svg'
import groopIcon from '../assets/img/groopIcon.svg'
import status from '../assets/img/statusIcon.svg'
import chatsIcon from '../assets/img/chatsIcon.svg'
import menuIcon from '../assets/img/menuIcon.svg'

const SideMenuHeader = () => {
    return (
        <div className={s.sideMenuHeader}>
            <img src={userIcon} alt="avatar" className={s.avatar} />
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
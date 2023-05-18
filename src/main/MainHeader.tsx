import s from './Main.module.css'

import userIcon from '../assets/img/user.svg'
import menuIcon from '../assets/img/menuIcon.svg'
import searchIcon from '../assets/img/searchIcon.svg'

type MainHeaderPropType = {
    activeChat: string
}

const MainHeader = ({ activeChat }: MainHeaderPropType) => {
    return (
        <div className={s.mainHeader}>
            <img src={userIcon} alt="avatar" className={s.avatar} />
            <h1 className={s.contactsName}>{activeChat}</h1>
            <button className={s.button} style={{ marginLeft: 'auto' }}>
                <img src={searchIcon} alt="" className={s.headersIcon} />
            </button>
            <button className={s.button} >
                <img src={menuIcon} alt="menu" className={s.headersIcon} />
            </button>
        </div>
    )
}

export default MainHeader
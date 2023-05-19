import userIcon from '../assets/img/user.svg'
import { getDate } from '../assets/helpers/getData'

import s from './SideMenu.module.css'

type SideMenuContactItemPropsType = {
    number: string,
    setActiveChat: (number: string) => void
    date?:number
    message?:string
}

const SideMenuContactItem = ({ number, setActiveChat, date, message}: SideMenuContactItemPropsType) => {
    return (
        <div className={s.contactsContainer} onClick={() => setActiveChat(number)}>
            <img src={userIcon} alt="user" className={s.contactsAvatar} />
            <div className={s.contactsInfoContainer}>
                <div className={s.contactsHeader}>
                    <h1 className={s.contactsName}>{number}</h1>
                    <span className={s.contactsData}>{getDate(date || 0)}</span>
                </div>
                <p className={s.contactsMessage}>
                    {(message && message?.length > 20 ? `${message?.slice(0, 20)}...` : message) || ''}
                </p>
            </div>
        </div>
    )
}

export default SideMenuContactItem
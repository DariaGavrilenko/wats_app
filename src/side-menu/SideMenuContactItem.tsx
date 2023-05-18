import s from './SideMenu.module.css'
import userIcon from '../assets/img/user.svg'

type SideMenuContactItemPropsType = {
    number: string,
    setActiveChat: (number: string) => void
}

const SideMenuContactItem = ({ number, setActiveChat }: SideMenuContactItemPropsType) => {
    return (
        <div className={s.contactsContainer} onClick={() => setActiveChat(number)}>
            <img src={userIcon} alt="user" className={s.contactsAvatar} />
            <div className={s.contactsInfoContainer}>
                <div className={s.contactsHeader}>
                    <h1 className={s.contactsName}>{number}</h1>
                    <span className={s.contactsData}>data</span>
                </div>
                <p className={s.contactsMessage}>Text</p>
            </div>
        </div>
    )
}

export default SideMenuContactItem
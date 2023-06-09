import SideMenuHeader from './SideMenuHeader'
import SideMenuSearch from './SideMenuSearch'
import SideMenuContactItem from './SideMenuContactItem'
import { Chat } from '../App'

import s from './SideMenu.module.css'

type SideMenuPropsType = {
    createChat: (number: string) => void,
    chats: Chat[]
    setActiveChat: (number: string) => void
}

const SideMenu = ({ createChat, chats, setActiveChat }: SideMenuPropsType) => {
    return (
        <div className={s.SideMenuContainer}>
            <SideMenuHeader />
            <SideMenuSearch createChat={createChat} />
            <div className={s.contactsList}>
                {chats.map(chat => <SideMenuContactItem 
                                        key={chat.number}
                                        number={chat.number}
                                        message={chat.text}
                                        date={chat.date}
                                        setActiveChat={setActiveChat} 
                                    />)}
                <div className={s.underLine}>Ваши личные сообщения защищены сквозным щифрованием</div>
            </div>
        </div>
    )
}

export default SideMenu;





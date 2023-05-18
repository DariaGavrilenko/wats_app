import s from './Main.module.css'

import microphoneIcon from '../assets/img/microphone.svg'
import smileIcon from '../assets/img/smile.svg'
import clipIcon from '../assets/img/clip.svg'
import send from '../assets/img/send.svg'
import { useState } from 'react'
import { getApiTokenInstance,  getIdInstance } from '../assets/helpers/getData'

type PropsType = {
    activeChat: string
    messages: any[],
    setMessages: (messages: any[]) => void
    onSendMessage: (message: string, idMessage: string) => void
}

const MainFooter = ({ setMessages, messages, onSendMessage, activeChat }: PropsType) => {
    const [message, setMessage] = useState('')

    const onSendMessagePress = () => {
        fetch(`https://api.green-api.com/waInstance${getIdInstance()}/SendMessage/${getApiTokenInstance()}`, {
            method: 'POST',
            body: JSON.stringify({
                //@ts-ignore
                chatId: `${activeChat}@c.us`,
                message: message
            })
        })
            .then(async res => {
                const isJson = res.headers
                    .get('content-type')
                    ?.includes('application/json');

                const data = isJson ? res.json() : null;
                return data
            })
            .then(({ idMessage }) => {
                onSendMessage(message, idMessage)
                setMessage('')
            })
    }

    return (
        <div className={s.mainFooter}>
            <button className={s.button} >
                <img src={smileIcon} alt="menu" className={s.headersIcon} />
            </button>
            <button className={s.button} >
                <img src={clipIcon} alt="menu" className={s.headersIcon} />
            </button>
            <input
                className={s.textarea}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                onKeyDown={(e) => { e.code === 'Enter' && onSendMessagePress() }}
            />
            {!!message.trim() ? 
            <button className={s.button} onClick={onSendMessagePress}>
                <img src={send} alt="menu" className={s.headersIcon} />
            </button>
            : 
             <button className={s.button} >
             <img src={microphoneIcon} alt="menu" className={s.headersIcon} />
         </button>}
           
        </div>
    )
}

export default MainFooter
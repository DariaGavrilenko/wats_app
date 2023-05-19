import { useState } from 'react'

import { getApiTokenInstance,  getIdInstance } from '../assets/helpers/getData'

import microphoneIcon from '../assets/img/microphone.svg'
import smileIcon from '../assets/img/smile.svg'
import clipIcon from '../assets/img/clip.svg'
import send from '../assets/img/send.svg'

import s from './Main.module.css'


type PropsType = {
    activeChat: string
    onSendMessage: (message: string, idMessage: string) => void
    getLastMessage:(text: string, date: number, id:string)=>void
}

const MainFooter = ({ onSendMessage, activeChat, getLastMessage }: PropsType) => {
    const [message, setMessage] = useState('')

    const onSendMessagePress = () => {
        fetch(`https://api.green-api.com/waInstance${getIdInstance()}/SendMessage/${getApiTokenInstance()}`, {
            method: 'POST',
            body: JSON.stringify({
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
                getLastMessage(message, Date.now(), `${activeChat}@c.us`)
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
import s from './Main.module.css'

import { useEffect, useState } from 'react'
import { getApiTokenInstance, getDate, getIdInstance, getStatusImg } from '../assets/helpers/getData'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'




type MainPropsType = {
    activeChat: string
}

export type MessageType = {
    chatId?: string,
    idMessage?: string,
    sendByApi?: boolean,
    statusMessage?: string,
    textMessage?: string,
    timestamp?: number
    type?: 'outgoing' | 'incoming',
    typeMessage?: string
    }

const Main = ({ activeChat }: MainPropsType) => {
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState<MessageType[]>([])

    console.log()
    console.log()

    useEffect(() => {
        fetch(`https://api.green-api.com/waInstance${getIdInstance()}/GetChatHistory/${getApiTokenInstance()}`, {
            method: 'POST',
            body: JSON.stringify({
                chatId: `${activeChat}@c.us`,
                count: 100
            })
        })
            .then(res => {
                const isJson = res.headers
                    .get('content-type')
                    ?.includes('application/json');

                const data = isJson ? res.json() : null;

                return data
            })
            .then(res => {
                console.log(res)
                setLoading(false)
                res && setMessages(res.reverse())
            })
    }, [activeChat])


    const handleSendMessage = (message: string, idMessage: string) => {
        setMessages(prevState => [...prevState, { idMessage, textMessage: message, type: "outgoing", statusMessage: 'loading' }])
    }

    useEffect(() => {

        const fetchData = async () => {
            if (!loading) {
                try {
                    const res = await fetch(`https://api.green-api.com/waInstance${getIdInstance()}/ReceiveNotification/${getApiTokenInstance()}`, {
                        method: 'GET',
                    })

                    const isJson = res.headers
                        .get('content-type')
                        ?.includes('application/json');

                    const data = isJson ? await res.json() : null;

                    console.log('data', data)

                    if (data) {
                        await fetch(`https://api.green-api.com/waInstance${getIdInstance()}/DeleteNotification/${getApiTokenInstance()}/${data.receiptId}`, {
                            method: 'DELETE',
                        })

                        if (data.body.typeWebhook === "outgoingMessageStatus") {
                            setMessages(prevState => {
                                return prevState.map(message => {
                                    if (message.idMessage === data.body.idMessage) {
                                        return {
                                            ...message,
                                            chatId: data.body.chatId,
                                            sendByApi: data.body.sendByApi,
                                            statusMessage: data.body.status,
                                            timestamp: data.body.timestamp,
                                        }
                                    }

                                    return message
                                })
                            })
                        }

                        if (data.body.typeWebhook === "incomingMessageReceived") {
                            setMessages(prevState => {
                                return [...prevState, {
                                    textMessage: data.body.messageData.textMessageData.textMessage,
                                    type: "incoming",
                                    chatId: data.body.chatId,
                                    sendByApi: data.body.sendByApi,
                                    statusMessage: data.body.status,
                                    timestamp: data.body.timestamp,
                                }]
                            })
                        }
                    }

                } catch (error) {
                    console.log('error', error)
                }
            }

        }

        const newInterval = setInterval(() => {
            fetchData()
        }, 5000)

        return () => clearInterval(newInterval)
    }, [loading])

    return (
        <div style={{ width: '100%', borderLeft: '1px solid rgba(134,150,160,0.4)', height: '100vh', position: 'relative' }}>
            <MainHeader activeChat={activeChat} />
            <div className={s.inner}>
                {messages.map((m: MessageType, index) => {
                    return (
                        <div key={index} className={m.type === 'outgoing' ? s.messgeoutcomingContainer : s.messgeincomingContainer} >
                            <span>{m.textMessage}</span>
                            <div className={s.dateContainer}>
                            <span>{getDate(m.timestamp ? m.timestamp : Date.now()) }</span>
                            {m.type === 'outgoing' && <img src={getStatusImg(m.statusMessage)} alt="" className={s.statusImg}/>}
                            </div>
                        </div>
                    )
                })}
            </div>
            <MainFooter onSendMessage={handleSendMessage} activeChat={activeChat} />
        </div>
    )
}

export default Main;
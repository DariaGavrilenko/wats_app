
import { useEffect, useState } from 'react'

import { getApiTokenInstance,
         getDate,
         getIdInstance, 
         getStatusImg 
        } from '../assets/helpers/getData'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'

import s from './Main.module.css'

type MainPropsType = {
    activeChat: string
    getLastMessage: (text: string, date: number, id:string) => void
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

const Main = ({ activeChat, getLastMessage }: MainPropsType) => {
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState<MessageType[]>([])

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
                setLoading(false)
                res && setMessages(res.reverse())
                getLastMessage(res[res.length - 1].textMessage, res[res.length - 1].timestamp, res[res.length - 1].chatId)
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

                

                        if (data.body.typeWebhook === "incomingMessageReceived" && data.body.senderData.chatId === `${activeChat}@c.us`) {
                            setMessages(prevState => {                     
                                const updateMessage = prevState.some(message => message.idMessage === data.body.idMessage)

                                if(updateMessage){
                                    return prevState.map(message => {
                                        if(message.idMessage === data.body.idMessage){
                                            return {...message,
                                                textMessage: data.body.messageData.textMessageData.textMessage,
                                                type: "incoming",
                                                chatId: data.body.senderData.chatId,
                                                sendByApi: data.body.sendByApi,
                                                statusMessage: data.body.status,
                                                timestamp: data.body.timestamp,        
                                            }
                                        }

                                        return message
                                    })
                                }

               
                                return [...prevState, {
                                    idMessage: data.body.idMessage,
                                    textMessage: data.body.messageData.textMessageData.textMessage,
                                    type: "incoming",
                                    chatId: data.body.senderData.chatId,
                                    sendByApi: data.body.sendByApi,
                                    statusMessage: data.body.status,
                                    timestamp: data.body.timestamp,
                                }]
                            })
                            getLastMessage( data.body.messageData.textMessageData.textMessage, data.body.timestamp,  data.body.senderData.chatId)
                        }

                        if (data.body.typeWebhook === "incomingMessageReceived" && data.body.senderData.chatId !== `${activeChat}@c.us`) {
                            getLastMessage( data.body.messageData.textMessageData.textMessage, data.body.timestamp,  data.body.senderData.chatId)
                        }
                    }

                } catch (error) {
                    console.log('error', error)
                }
            }

        }

        const newInterval = setInterval(() => {
            fetchData()
        }, 1000)


        return () => clearInterval(newInterval)
    }, [loading])

    useEffect(()=>{
        const block = document.getElementById("block");
        if(block){
            block.scrollTop = block.scrollHeight;
        }
    },[messages])

    return (
        <div className={s.mainContainer}>
            <MainHeader activeChat={activeChat} />
            <div className={s.inner} id='block'>
                {messages.map((m: MessageType, index) =>  (
                        <div key={index} className={m.type === 'outgoing' ? s.messgeoutcomingContainer : s.messgeincomingContainer} >
                            <span>{m.textMessage}</span>
                            <div className={s.dateContainer}>
                                <span>{getDate(m.timestamp ? m.timestamp : Date.now())}</span>
                                {m.type === 'outgoing' && <img src={getStatusImg(m.statusMessage)} alt="" className={s.statusImg} />}
                            </div>
                        </div>
                    )
                )}
            </div>
            <MainFooter getLastMessage={getLastMessage} onSendMessage={handleSendMessage} activeChat={activeChat} />
        </div>
    )
}

export default Main;

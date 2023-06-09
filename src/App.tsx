import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'

import ProtectAuth from './hoc/ProtectAuth';

import Main from './main/Main';
import Login from './login/Login';
import SideMenu from './side-menu/SideMenu';

import './App.css';


export type Chat = {
  number: string
  text?: string
  date?:number 
}

function App() {

  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState('')

  useEffect(() => {
    const localChats = localStorage.getItem('chats')
    if (localChats) {
      setChats(JSON.parse(localChats))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats))
  }, [chats])

  const createChat = (number: string) => {
    setChats([...chats, { number }])
  }

  const getLastMessage = (text: string, date: number, id: string) => {
    setChats(chats.map(chat => `${chat.number}@c.us` === id ? { ...chat, text, date } : chat))
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <ProtectAuth>
            <SideMenu createChat={createChat} chats={chats} setActiveChat={setActiveChat} />
            {activeChat ?
              <Main activeChat={activeChat} getLastMessage={getLastMessage} />
              :
              <div className='default'>Enter a phone number to start a chat or select a phone from the list.</div>}
          </ProtectAuth>
        } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;




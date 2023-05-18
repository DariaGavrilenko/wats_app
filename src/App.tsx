import './App.css';
import SideMenu from './side-menu/SideMenu';
import Main from './main/Main';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Login from './login/Login';
import ProtectAuth from './hoc/ProtectAuth';

function App() {

  const [chats, setChats] = useState<any>([])
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

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <ProtectAuth>
            <SideMenu createChat={createChat} chats={chats} setActiveChat={setActiveChat} />
            {activeChat ?
             <Main activeChat={activeChat} /> 
             :
              <div className='default'>Enter a phone number to start a chat or select a phone from the list.</div>}
          </ProtectAuth>
        } />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;




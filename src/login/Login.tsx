import { useState } from 'react'
import s from './Login.module.css'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [idInstance, setIdInstance] = useState('')
    const [apiTokenInstance, setApiTokenInstance] = useState('')
    const navigate = useNavigate()

    const onOkHandler = () =>{
        localStorage.setItem('Green_API_Data', JSON.stringify({idInstance,apiTokenInstance}))
        navigate('/')
    }

    return (
        <div className={s.loginContainer}>
            <p>Enter yours credentials from GREEN-API systems (idInstance, apiTokenInstance)</p>
            <input className={s.input} placeholder='idInstance' type="text" value={idInstance} onChange={(e)=>setIdInstance(e.currentTarget.value)}/>
            <input className={s.input} placeholder='apiTokenInstance' type="text" value={apiTokenInstance} onChange={(e)=>setApiTokenInstance(e.currentTarget.value)}/>
            <button disabled={!idInstance.trim() || !apiTokenInstance.trim()} onClick={onOkHandler} className={s.button}>OK</button>
        </div>
    )
}

export default Login
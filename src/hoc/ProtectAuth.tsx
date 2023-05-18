import { Navigate } from "react-router-dom"

type ProtectAuthPropsType = {
    children: React.ReactNode
}

const ProtectAuth = ({ children }: ProtectAuthPropsType) => {

    const data = localStorage.getItem('Green_API_Data') 


    if (!data) {
        return <Navigate to='/login' />
    }

    return (
        <>
            {children}
        </>

    )
}

export default ProtectAuth
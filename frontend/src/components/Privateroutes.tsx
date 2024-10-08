import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const Privateroutes: React.FC = () => {
    const { currentUser } = useSelector((state: any) => state.user);
    return currentUser ? <Outlet/> : <Navigate to={"/signin"}/>
}

export default Privateroutes

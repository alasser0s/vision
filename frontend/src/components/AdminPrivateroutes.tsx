import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
const AdminPrivateroutes: React.FC = () => {
    const { currentUser } = useSelector((state: any) => state.user);
    return currentUser.IsAdmin ? <Outlet/> : <Navigate to={"/signin"}/>
}

export default AdminPrivateroutes

import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ManagerLayout = () => {
    const user = useSelector((state) => state.Auth.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || user.role !== "manager") {
            navigate('/login') // Corrected to lowercase 'n'
        }
        navigate('/manager')
    }, [user, navigate]) // Adding dependencies to useEffect

    return <Outlet/>
}

export default ManagerLayout

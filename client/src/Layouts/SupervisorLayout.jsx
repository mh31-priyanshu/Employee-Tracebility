import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SupervisorLayout = () => {
    const user = useSelector((state) => state.Auth.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || user.role !== "supervisor") {
            navigate('/login') // Corrected to lowercase 'n'
        }
        navigate('/supervisor')
    }, [user, navigate]) // Adding dependencies to useEffect

    return <Outlet/>
}

export default SupervisorLayout

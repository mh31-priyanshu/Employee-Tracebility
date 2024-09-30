import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SupervisorLayout = () => {
    const role = useSelector((state) => state.auth.role); // Correctly access role from auth slice
    const token = useSelector((state) => state.auth.token); // Access token if needed
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || role !== "supervisor") {
            navigate('/login');
        }
        navigate('/supervisor');
    }, [role, token, navigate]); // Adding dependencies to useEffect

    return <Outlet />;
};

export default SupervisorLayout;

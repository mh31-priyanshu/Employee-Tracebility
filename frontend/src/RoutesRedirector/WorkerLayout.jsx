import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WorkerLayout = () => {
    const role = useSelector((state) => state.auth.role); // Correctly access role from auth slice
    const token = useSelector((state) => state.auth.token); // Access token if needed
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || role !== "worker") {
            navigate('/login');
        }
    }, [role, token, navigate]); // Adding dependencies to useEffect

    return <Outlet />;
};

export default WorkerLayout;

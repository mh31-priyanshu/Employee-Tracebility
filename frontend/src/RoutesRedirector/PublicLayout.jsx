import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export default function PublicLayout() {
    const role = useSelector((state) => state.auth.role); // Correctly access role from auth slice
    const token = useSelector((state) => state.auth.token); // Access token if needed
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            // Redirect users based on their role
            if (role === 'supervisor') {
                navigate('/supervisor');
            } else if (role === 'manager') {
                navigate('/manager');
            } else if (role === 'worker') {
                navigate('/worker');
            }
        }
    }, [role, token, navigate]);

    return <Outlet />;
}

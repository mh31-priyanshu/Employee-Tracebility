import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export default function PublicLayout() {
  const user = useSelector((state) => state.Auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // console.log('User Role:', user.role);
      if (user.role === 'supervisor') {
        navigate('/supervisor'); // Redirect supervisors to their specific area
      } else if (user.role === 'manager') {
        navigate('/manager');
      }
      else if (user.role === 'worker') {
        navigate('/worker'); // Redirect workers to their specific area
      }
    }
  }, [user, navigate]);

  return <Outlet />;
}

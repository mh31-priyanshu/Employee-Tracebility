import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import { Toaster } from 'react-hot-toast'

import SupervisorLayout from './RoutesRedirector/SupervisorLayout'
import PublicLayout from './RoutesRedirector/PublicLayout'
import WorkerLayout from './RoutesRedirector/WorkerLayout'
import ManagerLayout from './RoutesRedirector/ManagerLayout'


import WorkersDashboard from './Layouts/WorkerLayout/Dashboard'
import SupervisorsDashboard from './Layouts/SupervisorLayout/Dashboard'
import ManagersDashboard from './Layouts/ManagerLayout/Dashboard'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<PublicLayout/>}>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
          </Route>

          {/* Worker routes */}
          <Route path='/worker' element={<WorkerLayout />}>
            <Route index element={<WorkersDashboard/>} />
          </Route>

          {/* Supervisor routes */}
          <Route path='/supervisor' element={<SupervisorLayout />}>
            <Route index element={<SupervisorsDashboard />} />
          </Route>

          {/* MAnager routes */}
          <Route path='/manager' element={<ManagerLayout/>}>
            <Route index element={<ManagersDashboard/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
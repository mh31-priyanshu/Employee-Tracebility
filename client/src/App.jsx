import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
import Worker from './pages/Worker'
import Login from './pages/Login'
import Manager from './pages/Manager'
import { Toaster } from 'react-hot-toast'
import Supervisor from './pages/Supervisor'

import SupervisorLayout from './Layouts/SupervisorLayout'
import PublicLayout from './Layouts/PublicLayout'
import WorkerLayout from './Layouts/WorkerLayout'
import ManagerLayout from './Layouts/ManagerLayout'

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
            <Route index element={<Worker />} />
          </Route>

          {/* Supervisor routes */}
          <Route path='/supervisor' element={<SupervisorLayout />}>
            <Route index element={<Supervisor />} />
          </Route>

          {/* MAnager routes */}
          <Route path='/manager' element={<ManagerLayout/>}>
            <Route index element={<Manager/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

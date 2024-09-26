import { useState } from 'react'
import Dashboard from './Dashboard/Dashboard'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './Pages/Login'


function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

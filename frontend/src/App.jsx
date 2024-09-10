import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dashboard from './Dashboard/Dashboard'
import { GlobalProvider } from './context/GlobalContext'

function App() {
  return (
    <GlobalProvider>
        <Dashboard />
    </ GlobalProvider>
  )
}

export default App

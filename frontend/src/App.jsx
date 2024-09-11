import { useState } from 'react'
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

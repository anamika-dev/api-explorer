import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppContent from './components/AppContent'
import './styles/App.css'
const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

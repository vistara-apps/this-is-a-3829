import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Templates from './components/Templates'
import Pricing from './components/Pricing'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'

function App() {
  const [currentView, setCurrentView] = useState('home')

  return (
    <AppProvider>
      <div className="min-h-screen bg-bg">
        <Header currentView={currentView} setCurrentView={setCurrentView} />
        
        {currentView === 'home' && (
          <>
            <Hero setCurrentView={setCurrentView} />
            <Features />
            <Templates setCurrentView={setCurrentView} />
            <Pricing setCurrentView={setCurrentView} />
          </>
        )}
        
        {currentView === 'dashboard' && <Dashboard />}
        
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App
import React from 'react'
import { Heart, User, LogOut } from 'lucide-react'
import { useApp } from '../context/AppContext'

const Header = ({ currentView, setCurrentView }) => {
  const { user, logout } = useApp()

  return (
    <header className="bg-surface border-b border-border-subtle sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <Heart className="w-8 h-8 text-primary fill-current" />
            <span className="text-xl font-bold text-text-primary">PetPicShowcase</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button 
              className="btn-ghost"
              onClick={() => setCurrentView('home')}
            >
              Home
            </button>
            <button className="btn-ghost">Features</button>
            <button className="btn-ghost">Pricing</button>
            {user && (
              <button 
                className="btn-ghost"
                onClick={() => setCurrentView('dashboard')}
              >
                Dashboard
              </button>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-text-secondary" />
                  <span className="text-sm text-text-secondary">{user.email}</span>
                </div>
                <button 
                  className="btn-ghost flex items-center space-x-1"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button 
                className="btn-primary"
                onClick={() => setCurrentView('dashboard')}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
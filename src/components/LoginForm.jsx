import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

const LoginForm = () => {
  const { login } = useApp()
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      login(email)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-text-primary mb-2">
              Welcome to PetPicShowcase
            </h1>
            <p className="text-text-secondary">
              Enter your email to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="your@email.com"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Get Started
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              By continuing, you agree to our terms of service
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
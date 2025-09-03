import React from 'react'
import { Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

const plans = [
  {
    name: 'Basic',
    price: '$5',
    period: '/month',
    description: 'Perfect for getting started',
    features: [
      'Up to 3 galleries',
      '100 photos storage',
      'Mobile-responsive templates',
      'Basic customization',
      'Community access'
    ],
    popular: false
  },
  {
    name: 'Premium',
    price: '$10',
    period: '/month',
    description: 'Best for serious pet photographers',
    features: [
      'Unlimited galleries',
      'Unlimited photo storage',
      'All premium templates',
      'Advanced customization',
      'Priority support',
      'Custom domain',
      'Analytics dashboard'
    ],
    popular: true
  },
  {
    name: 'One-time',
    price: '$49',
    period: 'forever',
    description: 'Single payment, lifetime access',
    features: [
      'Static site generation',
      'Basic templates',
      '1 gallery included',
      '50 photos storage',
      'One-time setup'
    ],
    popular: false
  }
]

const Pricing = ({ setCurrentView }) => {
  const { setSubscription } = useApp()

  const handlePlanSelect = (plan) => {
    setSubscription(plan)
    setCurrentView('dashboard')
  }

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-text-primary mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Choose the plan that works best for you and your pet's digital presence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`card relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-3xl font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-secondary ml-1">{plan.period}</span>
                </div>
                <p className="text-text-secondary">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handlePlanSelect(plan)}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
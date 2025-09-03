import React from 'react'
import { ArrowRight, Star } from 'lucide-react'

const Hero = ({ setCurrentView }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-purple-700 text-white">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-center space-x-2 text-accent">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium">Trusted by 10,000+ pet owners</span>
            </div>
            
            <h1 className="text-5xl font-bold leading-tight">
              Your Pet's Digital Gallery, 
              <span className="text-accent"> Shared Instantly</span>
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              Create a beautiful, professional website for your pet's photos in minutes. 
              No coding required. Mobile-responsive templates designed specifically for showcasing your furry friends.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="bg-accent text-text-primary px-8 py-4 rounded-md font-semibold hover:bg-accent/90 transition-colors flex items-center space-x-2"
                onClick={() => setCurrentView('dashboard')}
              >
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 text-white px-8 py-4 rounded-md font-semibold hover:bg-white/20 transition-colors">
                View Examples
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-square bg-accent/30 rounded-md"></div>
                  <div className="aspect-square bg-white/20 rounded-md"></div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square bg-white/20 rounded-md"></div>
                  <div className="aspect-square bg-accent/30 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
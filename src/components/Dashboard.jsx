import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import LoginForm from './LoginForm'
import GalleryManager from './GalleryManager'
import CreateGallery from './CreateGallery'
import GalleryEditor from './GalleryEditor'

const Dashboard = () => {
  const { user, galleries } = useApp()
  const [activeView, setActiveView] = useState('overview')
  const [selectedGallery, setSelectedGallery] = useState(null)

  if (!user) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card space-y-2">
              <button 
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeView === 'overview' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-primary/10'
                }`}
                onClick={() => setActiveView('overview')}
              >
                Overview
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeView === 'galleries' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-primary/10'
                }`}
                onClick={() => setActiveView('galleries')}
              >
                My Galleries
              </button>
              <button 
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeView === 'create' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-primary/10'
                }`}
                onClick={() => setActiveView('create')}
              >
                Create Gallery
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeView === 'overview' && (
              <div className="space-y-6">
                <div className="card">
                  <h1 className="text-2xl font-semibold text-text-primary mb-4">
                    Welcome back, {user.email}!
                  </h1>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-primary/10 rounded-md p-4">
                      <div className="text-2xl font-bold text-primary">{galleries.length}</div>
                      <div className="text-text-secondary">Galleries</div>
                    </div>
                    <div className="bg-accent/10 rounded-md p-4">
                      <div className="text-2xl font-bold text-accent">
                        {galleries.reduce((total, gallery) => total + gallery.photos.length, 0)}
                      </div>
                      <div className="text-text-secondary">Photos</div>
                    </div>
                    <div className="bg-green-100 rounded-md p-4">
                      <div className="text-2xl font-bold text-green-600">{user.subscriptionTier}</div>
                      <div className="text-text-secondary">Plan</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h2 className="text-xl font-semibold text-text-primary mb-4">Recent Galleries</h2>
                  {galleries.length === 0 ? (
                    <p className="text-text-secondary">No galleries yet. Create your first one!</p>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {galleries.slice(0, 3).map((gallery) => (
                        <div key={gallery.galleryId} className="border border-border-subtle rounded-md p-4">
                          <h3 className="font-medium text-text-primary">{gallery.title}</h3>
                          <p className="text-sm text-text-secondary mt-1">
                            {gallery.photos.length} photos
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeView === 'galleries' && (
              <GalleryManager 
                onEditGallery={(gallery) => {
                  setSelectedGallery(gallery)
                  setActiveView('edit')
                }}
              />
            )}

            {activeView === 'create' && (
              <CreateGallery 
                onGalleryCreated={(gallery) => {
                  setSelectedGallery(gallery)
                  setActiveView('edit')
                }}
              />
            )}

            {activeView === 'edit' && selectedGallery && (
              <GalleryEditor 
                gallery={selectedGallery}
                onBack={() => setActiveView('galleries')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
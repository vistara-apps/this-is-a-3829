import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [galleries, setGalleries] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [subscription, setSubscription] = useState(null)

  // Mock authentication
  const login = (email) => {
    setUser({
      userId: 'user-1',
      email,
      subscriptionTier: 'basic',
      createdAt: new Date().toISOString()
    })
  }

  const logout = () => {
    setUser(null)
    setGalleries([])
    setSelectedTemplate(null)
    setSubscription(null)
  }

  // Gallery management
  const createGallery = (title, description) => {
    const newGallery = {
      galleryId: `gallery-${Date.now()}`,
      userId: user?.userId,
      title,
      description,
      templateId: selectedTemplate?.id || 'template-1',
      photos: []
    }
    setGalleries(prev => [...prev, newGallery])
    return newGallery
  }

  const updateGallery = (galleryId, updates) => {
    setGalleries(prev => 
      prev.map(gallery => 
        gallery.galleryId === galleryId 
          ? { ...gallery, ...updates }
          : gallery
      )
    )
  }

  const deleteGallery = (galleryId) => {
    setGalleries(prev => prev.filter(gallery => gallery.galleryId !== galleryId))
  }

  // Photo management
  const addPhoto = (galleryId, photo) => {
    const newPhoto = {
      photoId: `photo-${Date.now()}`,
      galleryId,
      imageUrl: photo.url,
      caption: photo.caption || '',
      order: photo.order || 0
    }
    
    updateGallery(galleryId, {
      photos: [...(galleries.find(g => g.galleryId === galleryId)?.photos || []), newPhoto]
    })
  }

  const removePhoto = (galleryId, photoId) => {
    const gallery = galleries.find(g => g.galleryId === galleryId)
    if (gallery) {
      updateGallery(galleryId, {
        photos: gallery.photos.filter(photo => photo.photoId !== photoId)
      })
    }
  }

  const updatePhoto = (galleryId, photoId, updates) => {
    const gallery = galleries.find(g => g.galleryId === galleryId)
    if (gallery) {
      updateGallery(galleryId, {
        photos: gallery.photos.map(photo => 
          photo.photoId === photoId 
            ? { ...photo, ...updates }
            : photo
        )
      })
    }
  }

  const value = {
    user,
    galleries,
    selectedTemplate,
    subscription,
    login,
    logout,
    createGallery,
    updateGallery,
    deleteGallery,
    addPhoto,
    removePhoto,
    updatePhoto,
    setSelectedTemplate,
    setSubscription
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
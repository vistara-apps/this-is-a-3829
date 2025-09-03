import React, { useState } from 'react'
import { ArrowLeft, Upload, X, Edit2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

const GalleryEditor = ({ gallery, onBack }) => {
  const { updateGallery, addPhoto, removePhoto, updatePhoto } = useApp()
  const [draggedOver, setDraggedOver] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState(null)
  const [editCaption, setEditCaption] = useState('')

  const handleDragOver = (e) => {
    e.preventDefault()
    setDraggedOver(true)
  }

  const handleDragLeave = () => {
    setDraggedOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDraggedOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    files.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        // In a real app, you'd upload to a service like Cloudinary
        const mockUrl = URL.createObjectURL(file)
        addPhoto(gallery.galleryId, {
          url: mockUrl,
          caption: `Photo ${gallery.photos.length + index + 1}`,
          order: gallery.photos.length + index
        })
      }
    })
  }

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file, index) => {
      if (file.type.startsWith('image/')) {
        const mockUrl = URL.createObjectURL(file)
        addPhoto(gallery.galleryId, {
          url: mockUrl,
          caption: `Photo ${gallery.photos.length + index + 1}`,
          order: gallery.photos.length + index
        })
      }
    })
  }

  const handleEditCaption = (photo) => {
    setEditingPhoto(photo.photoId)
    setEditCaption(photo.caption)
  }

  const handleSaveCaption = () => {
    if (editingPhoto) {
      updatePhoto(gallery.galleryId, editingPhoto, { caption: editCaption })
      setEditingPhoto(null)
      setEditCaption('')
    }
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <button 
            className="p-2 hover:bg-primary/10 rounded-md transition-colors"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5 text-text-secondary" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">
              {gallery.title}
            </h1>
            <p className="text-text-secondary">{gallery.photos.length} photos</p>
          </div>
        </div>

        {/* Upload Area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            draggedOver 
              ? 'border-primary bg-primary/5' 
              : 'border-border-subtle hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-8 h-8 text-text-secondary mx-auto mb-4" />
          <p className="text-text-primary font-medium mb-2">
            Drag & drop photos here, or click to select
          </p>
          <p className="text-text-secondary text-sm mb-4">
            Supports JPG, PNG, and GIF files
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="btn-primary cursor-pointer">
            Choose Files
          </label>
        </div>
      </div>

      {/* Photo Grid */}
      {gallery.photos.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            Gallery Photos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.photos.map((photo) => (
              <div key={photo.photoId} className="group relative">
                <div className="aspect-square bg-primary/10 rounded-lg overflow-hidden">
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1">
                    <button 
                      className="p-1 bg-surface rounded-md shadow-sm hover:bg-primary hover:text-white transition-colors"
                      onClick={() => handleEditCaption(photo)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-1 bg-surface rounded-md shadow-sm hover:bg-red-500 hover:text-white transition-colors"
                      onClick={() => removePhoto(gallery.galleryId, photo.photoId)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  {editingPhoto === photo.photoId ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        className="input text-sm"
                        placeholder="Photo caption..."
                      />
                      <div className="flex space-x-2">
                        <button 
                          className="btn-primary text-xs px-3 py-1"
                          onClick={handleSaveCaption}
                        >
                          Save
                        </button>
                        <button 
                          className="btn-ghost text-xs px-3 py-1"
                          onClick={() => setEditingPhoto(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-text-secondary">
                      {photo.caption || 'No caption'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryEditor
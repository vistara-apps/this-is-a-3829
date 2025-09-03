import React from 'react'
import { Edit, Trash2, Image } from 'lucide-react'
import { useApp } from '../context/AppContext'

const GalleryManager = ({ onEditGallery }) => {
  const { galleries, deleteGallery } = useApp()

  return (
    <div className="card">
      <h1 className="text-2xl font-semibold text-text-primary mb-6">
        My Galleries
      </h1>

      {galleries.length === 0 ? (
        <div className="text-center py-8">
          <Image className="w-12 h-12 text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary">No galleries yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div key={gallery.galleryId} className="border border-border-subtle rounded-md p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">{gallery.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {gallery.photos.length} photos
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-1 text-text-secondary hover:text-primary"
                    onClick={() => onEditGallery(gallery)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-1 text-text-secondary hover:text-red-500"
                    onClick={() => deleteGallery(gallery.galleryId)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {gallery.description && (
                <p className="text-sm text-text-secondary mb-4">
                  {gallery.description}
                </p>
              )}

              {gallery.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {gallery.photos.slice(0, 4).map((photo) => (
                    <div 
                      key={photo.photoId}
                      className="aspect-square bg-primary/10 rounded-md flex items-center justify-center"
                    >
                      <Image className="w-6 h-6 text-primary" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GalleryManager
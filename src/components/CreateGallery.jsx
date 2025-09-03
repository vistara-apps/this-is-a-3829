import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

const CreateGallery = ({ onGalleryCreated }) => {
  const { createGallery } = useApp()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title) {
      const gallery = createGallery(title, description)
      onGalleryCreated(gallery)
    }
  }

  return (
    <div className="card">
      <h1 className="text-2xl font-semibold text-text-primary mb-6">
        Create New Gallery
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Gallery Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="My Pet's Adventures"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
            rows={4}
            placeholder="Tell us about your pet and this gallery..."
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="btn-primary">
            Create Gallery
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateGallery
import React from 'react'
import { useApp } from '../context/AppContext'

const templates = [
  {
    id: 'template-1',
    name: 'Classic Gallery',
    description: 'Clean, minimal design perfect for showcasing your pet photos',
    preview: 'bg-gradient-to-br from-blue-100 to-purple-100'
  },
  {
    id: 'template-2',
    name: 'Playful Pets',
    description: 'Fun, colorful layout with playful elements for energetic pets',
    preview: 'bg-gradient-to-br from-yellow-100 to-orange-100'
  },
  {
    id: 'template-3',
    name: 'Elegant Showcase',
    description: 'Sophisticated design for professional pet photography',
    preview: 'bg-gradient-to-br from-gray-100 to-slate-100'
  }
]

const Templates = ({ setCurrentView }) => {
  const { setSelectedTemplate } = useApp()

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setCurrentView('dashboard')
  }

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-text-primary mb-4">
            Choose your perfect template
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Professional designs crafted specifically for pet photography
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="card group cursor-pointer hover:shadow-lg transition-shadow">
              <div className={`h-48 rounded-md mb-4 ${template.preview} flex items-center justify-center`}>
                <div className="grid grid-cols-2 gap-2 w-32">
                  <div className="aspect-square bg-white/60 rounded-sm"></div>
                  <div className="aspect-square bg-white/40 rounded-sm"></div>
                  <div className="aspect-square bg-white/40 rounded-sm"></div>
                  <div className="aspect-square bg-white/60 rounded-sm"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {template.name}
              </h3>
              <p className="text-text-secondary mb-4">
                {template.description}
              </p>
              <button 
                className="btn-primary w-full"
                onClick={() => handleTemplateSelect(template)}
              >
                Select Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Templates
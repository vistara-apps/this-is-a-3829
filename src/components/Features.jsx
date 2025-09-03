import React from 'react'
import { Image, Smartphone, Users, Award } from 'lucide-react'

const features = [
  {
    icon: Image,
    title: "One-Click Photo Gallery Site",
    description: "Pre-designed, mobile-responsive website templates optimized for showcasing animal photos. Select from curated templates and go live instantly."
  },
  {
    icon: Smartphone,
    title: "Simple Content Management",
    description: "Intuitive drag-and-drop interface to upload photos, write descriptions, and organize galleries. Update your site in real-time."
  },
  {
    icon: Users,
    title: "Pet-Focused Social Feed",
    description: "Connect with other pet lovers in our dedicated community. Share your favorite photos and discover inspiring animal content."
  },
  {
    icon: Award,
    title: "Themed Photo Challenges",
    description: "Participate in weekly photo contests with fun prompts like 'Cutest Nap' or 'Silly Face' and gain community recognition."
  }
]

const Features = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-text-primary mb-4">
            Everything you need to showcase your pet
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Professional tools designed specifically for pet photography and community sharing
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card text-center animate-fade-in">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features
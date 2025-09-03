import { Image, Settings, Users, Award } from "lucide-react";

export default function Features() {
  const features = [
    {
      name: "One-Click Photo Gallery Site",
      description: "Create a professional-looking website for your pet's photos without any coding. Choose from curated templates optimized for showcasing animal photos.",
      icon: Image,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      name: "Simple Content Management System",
      description: "Easily manage your pet's photo albums with our intuitive interface. Upload photos, write descriptions, and organize galleries with drag-and-drop simplicity.",
      icon: Settings,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      name: "Pet-Focused Social Feed",
      description: "Connect with other pet lovers and discover inspiring animal photos. Like, comment, and share your favorite pet moments in our dedicated community space.",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      name: "Themed Photo Challenges",
      description: "Participate in fun photo contests with weekly or monthly prompts like 'Cutest Nap' or 'Silly Face'. Gain community recognition and showcase your pet's personality.",
      icon: Award,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
  ];
  
  return (
    <div className="py-12 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Everything you need for your pet's online presence
          </p>
          <p className="mt-4 max-w-2xl text-xl text-text-secondary lg:mx-auto">
            Showcase your pet's photos with beautiful galleries, connect with other pet lovers, and participate in fun challenges.
          </p>
        </div>
        
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className={`absolute flex items-center justify-center h-12 w-12 rounded-md ${feature.bgColor} ${feature.color}`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-text-primary">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-text-secondary">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}


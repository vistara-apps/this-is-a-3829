import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";

export default function Templates() {
  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "A clean, minimalist design that puts your photos front and center.",
      image: "/images/templates/classic.jpg",
    },
    {
      id: "modern",
      name: "Modern",
      description: "Bold typography and dynamic layouts for a contemporary feel.",
      image: "/images/templates/modern.jpg",
    },
    {
      id: "playful",
      name: "Playful",
      description: "Fun, colorful design perfect for showcasing pets with personality.",
      image: "/images/templates/playful.jpg",
    },
  ];
  
  return (
    <div className="py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Templates</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Beautiful designs for your pet's gallery
          </p>
          <p className="mt-4 max-w-2xl text-xl text-text-secondary lg:mx-auto">
            Choose from our curated collection of templates designed specifically for showcasing pet photos.
          </p>
        </div>
        
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <div key={template.id} className="flex flex-col rounded-lg shadow-card overflow-hidden">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={template.image} alt={template.name} />
                </div>
                <div className="flex-1 bg-surface p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-primary">{template.name}</h3>
                    <p className="mt-3 text-base text-text-secondary">{template.description}</p>
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/templates/${template.id}`}
                      className="text-primary hover:text-primary/80 font-medium flex items-center"
                    >
                      Preview template
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link
              to="/templates"
              className="btn-secondary inline-flex items-center"
            >
              View all templates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


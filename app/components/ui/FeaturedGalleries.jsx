import { Link } from "@remix-run/react";

export default function FeaturedGalleries({ galleries }) {
  return (
    <section className="py-16 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Featured Galleries</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore these amazing pet galleries created by our community members
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="card overflow-hidden group">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={gallery.coverImage || "/images/placeholder-gallery.jpg"}
                  alt={gallery.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {gallery.title}
                </h3>
                <p className="text-text-secondary mb-4 line-clamp-2">
                  {gallery.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      {gallery.user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="ml-2 text-sm text-text-secondary">
                      {gallery.user.name}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary">
                    {gallery.photoCount} photos
                  </div>
                </div>
                <Link
                  to={`/gallery/${gallery.id}`}
                  className="btn-primary w-full mt-4"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/galleries" className="btn-secondary">
            Explore All Galleries
          </Link>
        </div>
      </div>
    </section>
  );
}


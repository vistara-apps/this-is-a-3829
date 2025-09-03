import { Link } from "@remix-run/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-surface border-t border-border-subtle">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-primary font-bold text-xl">
              PetPicShowcase
            </Link>
            <p className="mt-2 text-sm text-text-secondary">
              Your Pet's Digital Gallery, Shared Instantly.
            </p>
            <p className="mt-4 text-sm text-text-secondary">
              Create beautiful, mobile-responsive websites for showcasing your pet photos with ease.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/templates" className="text-sm text-text-secondary hover:text-text-primary">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-text-secondary hover:text-text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-sm text-text-secondary hover:text-text-primary">
                  Challenges
                </Link>
              </li>
              <li>
                <Link to="/social" className="text-sm text-text-secondary hover:text-text-primary">
                  Social Feed
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-sm text-text-secondary hover:text-text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-text-secondary hover:text-text-primary">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-text-secondary hover:text-text-primary">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-text-secondary hover:text-text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border-subtle pt-8">
          <p className="text-sm text-text-secondary text-center">
            &copy; {currentYear} PetPicShowcase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


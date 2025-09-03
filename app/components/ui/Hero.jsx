import { Link } from "@remix-run/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-bg sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-text-primary sm:text-5xl md:text-6xl">
                <span className="block">Your Pet's Digital</span>
                <span className="block text-primary">Gallery, Shared Instantly</span>
              </h1>
              <p className="mt-3 text-base text-text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Create a beautiful, mobile-responsive website for showcasing your pet photos in minutes. 
                No coding required, just upload your photos and share with friends and family.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:opacity-90 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/templates"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-surface border-primary hover:bg-primary hover:text-white md:py-4 md:text-lg md:px-10"
                  >
                    View Templates
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-accent/20 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <img
            className="h-full w-full object-cover lg:w-full lg:h-full rounded-l-lg shadow-lg"
            src="/images/hero-pet.jpg"
            alt="Pet photo gallery showcase"
          />
        </div>
      </div>
    </div>
  );
}


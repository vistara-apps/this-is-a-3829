import { useState } from "react";
import { Link, NavLink, Form } from "@remix-run/react";
import { Menu, X, User } from "lucide-react";

export default function Header({ user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-surface shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">PetPicShowcase</span>
            </Link>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? "border-primary text-text-primary"
                      : "border-transparent text-text-secondary hover:border-primary/30 hover:text-text-primary"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/templates"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? "border-primary text-text-primary"
                      : "border-transparent text-text-secondary hover:border-primary/30 hover:text-text-primary"
                  }`
                }
              >
                Templates
              </NavLink>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? "border-primary text-text-primary"
                      : "border-transparent text-text-secondary hover:border-primary/30 hover:text-text-primary"
                  }`
                }
              >
                Pricing
              </NavLink>
              <NavLink
                to="/challenges"
                className={({ isActive }) =>
                  `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive
                      ? "border-primary text-text-primary"
                      : "border-transparent text-text-secondary hover:border-primary/30 hover:text-text-primary"
                  }`
                }
              >
                Challenges
              </NavLink>
            </nav>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center text-text-primary hover:text-primary transition-colors">
                  <User className="w-5 h-5 mr-2" />
                  <span>{user.email.split('@')[0]}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-primary/10 hover:text-text-primary"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/galleries"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-primary/10 hover:text-text-primary"
                  >
                    My Galleries
                  </Link>
                  <Link
                    to="/dashboard/subscription"
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-primary/10 hover:text-text-primary"
                  >
                    Subscription
                  </Link>
                  <Form action="/logout" method="post">
                    <button
                      type="submit"
                      className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-primary/10 hover:text-text-primary"
                    >
                      Sign out
                    </button>
                  </Form>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm py-2"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-primary/10 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? "border-primary text-primary bg-primary/10"
                    : "border-transparent text-text-secondary hover:bg-primary/5 hover:border-primary/30 hover:text-text-primary"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/templates"
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? "border-primary text-primary bg-primary/10"
                    : "border-transparent text-text-secondary hover:bg-primary/5 hover:border-primary/30 hover:text-text-primary"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Templates
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? "border-primary text-primary bg-primary/10"
                    : "border-transparent text-text-secondary hover:bg-primary/5 hover:border-primary/30 hover:text-text-primary"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/challenges"
              className={({ isActive }) =>
                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive
                    ? "border-primary text-primary bg-primary/10"
                    : "border-transparent text-text-secondary hover:bg-primary/5 hover:border-primary/30 hover:text-text-primary"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Challenges
            </NavLink>
          </div>
          
          <div className="pt-4 pb-3 border-t border-border-subtle">
            {user ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-text-primary">{user.email.split('@')[0]}</div>
                    <div className="text-sm font-medium text-text-secondary">{user.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-base font-medium text-text-secondary hover:bg-primary/5 hover:text-text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/galleries"
                    className="block px-4 py-2 text-base font-medium text-text-secondary hover:bg-primary/5 hover:text-text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Galleries
                  </Link>
                  <Link
                    to="/dashboard/subscription"
                    className="block px-4 py-2 text-base font-medium text-text-secondary hover:bg-primary/5 hover:text-text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Subscription
                  </Link>
                  <Form action="/logout" method="post">
                    <button
                      type="submit"
                      className="block w-full text-left px-4 py-2 text-base font-medium text-text-secondary hover:bg-primary/5 hover:text-text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign out
                    </button>
                  </Form>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-base font-medium text-text-secondary hover:bg-primary/5 hover:text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-base font-medium text-text-secondary hover:bg-primary/5 hover:text-text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


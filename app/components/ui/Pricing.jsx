import { Link } from "@remix-run/react";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$5",
      description: "Perfect for casual pet owners who want to share their pet photos.",
      features: [
        "Create up to 3 galleries",
        "Upload up to 50 photos per gallery",
        "Basic templates",
        "Standard image quality",
        "Community access",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$10",
      description: "For dedicated pet owners who want the best showcase experience.",
      features: [
        "Unlimited galleries",
        "Unlimited photos per gallery",
        "All premium templates",
        "High-resolution image quality",
        "Custom domain support",
        "Priority support",
        "Advanced analytics",
      ],
      cta: "Upgrade to Premium",
      popular: true,
    },
  ];
  
  return (
    <div className="py-12 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Pricing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Simple, transparent pricing
          </p>
          <p className="mt-4 max-w-2xl text-xl text-text-secondary lg:mx-auto">
            Choose the plan that's right for you and your pet's online presence.
          </p>
        </div>
        
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`flex flex-col rounded-lg shadow-card overflow-hidden ${
                  plan.popular ? "border-2 border-primary" : "border border-border-subtle"
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-center py-2 font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="bg-surface p-6 flex-1">
                  <h3 className="text-2xl font-bold text-text-primary">{plan.name}</h3>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold text-text-primary">{plan.price}</span>
                    <span className="text-base font-medium text-text-secondary">/month</span>
                  </p>
                  <p className="mt-4 text-text-secondary">{plan.description}</p>
                  
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check className="h-5 w-5 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-text-secondary">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-surface p-6 border-t border-border-subtle">
                  <Link
                    to={`/subscribe/${plan.id}`}
                    className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${
                      plan.popular
                        ? "text-white bg-primary hover:opacity-90"
                        : "text-primary bg-surface border-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-text-secondary">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


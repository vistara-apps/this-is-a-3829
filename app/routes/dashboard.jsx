import { json } from "@remix-run/node";
import { Outlet, useLoaderData, Link, NavLink } from "@remix-run/react";
import { requireUser } from "~/utils/session.server";
import { getUserStats } from "~/models/user.server";
import { getGalleriesByUserId } from "~/models/gallery.server";
import { getUserSubscription } from "~/models/subscription.server";

import Header from "~/components/ui/Header";
import Footer from "~/components/ui/Footer";

export const meta = () => {
  return [
    { title: "Dashboard - PetPicShowcase" },
    { name: "description", content: "Manage your pet photo galleries" },
  ];
};

export async function loader({ request }) {
  const user = await requireUser(request);
  
  const [userStats, galleries, subscription] = await Promise.all([
    getUserStats(user.id),
    getGalleriesByUserId(user.id),
    getUserSubscription(user.id),
  ]);
  
  return json({
    user,
    userStats,
    galleries,
    subscription,
  });
}

export default function Dashboard() {
  const { user, userStats, galleries, subscription } = useLoaderData();
  
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Header user={user} />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="card space-y-2">
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-primary/10"
                    }`
                  }
                >
                  Overview
                </NavLink>
                <NavLink
                  to="/dashboard/galleries"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-primary/10"
                    }`
                  }
                >
                  My Galleries
                </NavLink>
                <NavLink
                  to="/dashboard/create-gallery"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-primary/10"
                    }`
                  }
                >
                  Create Gallery
                </NavLink>
                <NavLink
                  to="/dashboard/subscription"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-primary/10"
                    }`
                  }
                >
                  Subscription
                </NavLink>
                <NavLink
                  to="/dashboard/challenges"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-primary/10"
                    }`
                  }
                >
                  Challenges
                </NavLink>
                <NavLink
                  to="/dashboard/social"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-primary/10"
                    }`
                  }
                >
                  Social Feed
                </NavLink>
              </div>
              
              <div className="mt-6 card">
                <div className="text-sm font-medium text-text-secondary mb-2">
                  Subscription
                </div>
                <div className="text-lg font-semibold text-text-primary capitalize">
                  {user.subscriptionTier} Plan
                </div>
                {subscription ? (
                  <div className="text-xs text-text-secondary mt-1">
                    {subscription.status === "active" ? (
                      <>Active until {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</>
                    ) : (
                      <>Status: {subscription.status}</>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-text-secondary mt-1">
                    Free tier
                  </div>
                )}
                <div className="mt-4">
                  <Link to="/dashboard/subscription" className="btn-secondary text-sm py-2 px-4 w-full text-center">
                    {user.subscriptionTier === "basic" ? "Upgrade Plan" : "Manage Plan"}
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <Outlet context={{ user, userStats, galleries, subscription }} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}


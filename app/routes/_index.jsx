import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "~/utils/session.server";
import { getPublishedGalleries } from "~/models/gallery.server";
import { getActiveChallenges } from "~/models/challenge.server";
import { createInitialTemplates } from "~/models/template.server";

import Header from "~/components/ui/Header";
import Hero from "~/components/ui/Hero";
import Features from "~/components/ui/Features";
import Templates from "~/components/ui/Templates";
import Pricing from "~/components/ui/Pricing";
import Footer from "~/components/ui/Footer";
import FeaturedGalleries from "~/components/ui/FeaturedGalleries";
import ActiveChallenges from "~/components/ui/ActiveChallenges";

export const meta = () => {
  return [
    { title: "PetPicShowcase - Your Pet's Digital Gallery" },
    { name: "description", content: "Create a beautiful online gallery for your pet photos" },
  ];
};

export async function loader({ request }) {
  const user = await getUser(request);
  
  // Ensure templates exist
  await createInitialTemplates();
  
  // Get featured galleries and active challenges
  const [featuredGalleries, activeChallenges] = await Promise.all([
    getPublishedGalleries(6),
    getActiveChallenges(),
  ]);
  
  return json({
    user,
    featuredGalleries,
    activeChallenges,
  });
}

export default function Index() {
  const { user, featuredGalleries, activeChallenges } = useLoaderData();
  
  return (
    <div className="min-h-screen bg-bg">
      <Header user={user} />
      
      <main>
        <Hero />
        <Features />
        <Templates />
        
        {featuredGalleries.length > 0 && (
          <FeaturedGalleries galleries={featuredGalleries} />
        )}
        
        {activeChallenges.length > 0 && (
          <ActiveChallenges challenges={activeChallenges} />
        )}
        
        <Pricing />
      </main>
      
      <Footer />
    </div>
  );
}


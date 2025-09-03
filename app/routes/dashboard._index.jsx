import { useOutletContext } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { Image, Plus, Users, Heart, MessageSquare, Trophy } from "lucide-react";

export const meta = () => {
  return [
    { title: "Dashboard - PetPicShowcase" },
    { name: "description", content: "Manage your pet photo galleries" },
  ];
};

export default function DashboardIndex() {
  const { user, userStats, galleries } = useOutletContext();
  
  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold text-text-primary mb-4">
          Welcome back, {user.email}!
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/10 rounded-md p-4">
            <div className="flex items-center mb-2">
              <Image className="w-5 h-5 text-primary mr-2" />
              <div className="text-sm font-medium text-text-secondary">Galleries</div>
            </div>
            <div className="text-2xl font-bold text-primary">{userStats.galleryCount}</div>
          </div>
          
          <div className="bg-accent/10 rounded-md p-4">
            <div className="flex items-center mb-2">
              <Image className="w-5 h-5 text-accent mr-2" />
              <div className="text-sm font-medium text-text-secondary">Photos</div>
            </div>
            <div className="text-2xl font-bold text-accent">{userStats.photoCount}</div>
          </div>
          
          <div className="bg-green-100 rounded-md p-4">
            <div className="flex items-center mb-2">
              <Trophy className="w-5 h-5 text-green-600 mr-2" />
              <div className="text-sm font-medium text-text-secondary">Subscription</div>
            </div>
            <div className="text-2xl font-bold text-green-600 capitalize">{user.subscriptionTier}</div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Recent Galleries</h2>
          <Link to="/dashboard/galleries" className="text-primary text-sm hover:underline">
            View all
          </Link>
        </div>
        
        {galleries.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-text-secondary mb-4">You haven't created any galleries yet.</div>
            <Link to="/dashboard/create-gallery" className="btn-primary inline-flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Create your first gallery
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleries.slice(0, 3).map((gallery) => (
              <Link
                key={gallery.id}
                to={`/dashboard/galleries/${gallery.id}`}
                className="border border-border-subtle rounded-md p-4 hover:border-primary transition-colors"
              >
                <h3 className="font-medium text-text-primary">{gallery.title}</h3>
                <p className="text-sm text-text-secondary mt-1">
                  {gallery.photos.length} photos
                </p>
                <div className="text-xs text-text-secondary mt-2">
                  Template: {gallery.template.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">Social Activity</h2>
            <Link to="/dashboard/social" className="text-primary text-sm hover:underline">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Heart className="w-5 h-5 text-red-500 mr-2" />
                <div className="text-text-secondary">Likes received</div>
              </div>
              <div className="font-semibold text-text-primary">{userStats.likeCount}</div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-blue-500 mr-2" />
                <div className="text-text-secondary">Comments received</div>
              </div>
              <div className="font-semibold text-text-primary">{userStats.commentCount}</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">Challenges</h2>
            <Link to="/dashboard/challenges" className="text-primary text-sm hover:underline">
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                <div className="text-text-secondary">Challenges created</div>
              </div>
              <div className="font-semibold text-text-primary">{userStats.challengeCount}</div>
            </div>
            
            <div className="mt-4">
              <Link to="/dashboard/challenges" className="btn-secondary text-sm py-2 px-4 w-full text-center">
                Browse Active Challenges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


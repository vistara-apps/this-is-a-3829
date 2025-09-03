import { Link } from "@remix-run/react";

export default function ActiveChallenges({ challenges }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Active Challenges</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Participate in our themed photo challenges and showcase your pet's unique personality
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="card overflow-hidden group">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={challenge.coverImage || "/images/placeholder-challenge.jpg"}
                  alt={challenge.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                {challenge.endDate && new Date(challenge.endDate) > new Date() && (
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {challenge.title}
                </h3>
                <p className="text-text-secondary mb-4">
                  {challenge.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-text-secondary">
                    <span className="font-medium">Theme:</span> {challenge.theme}
                  </div>
                  <div className="text-sm text-text-secondary">
                    <span className="font-medium">Entries:</span> {challenge.submissionCount}
                  </div>
                </div>
                {challenge.endDate && (
                  <div className="mb-4">
                    <div className="text-sm text-text-secondary mb-1">
                      Ends in:
                    </div>
                    <div className="bg-bg-secondary rounded-md p-2">
                      <div className="flex justify-center space-x-4">
                        {getRemainingTime(challenge.endDate).map((unit) => (
                          <div key={unit.label} className="text-center">
                            <div className="text-xl font-bold text-primary">
                              {unit.value}
                            </div>
                            <div className="text-xs text-text-secondary">
                              {unit.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <Link
                  to={`/challenges/${challenge.id}`}
                  className="btn-primary w-full"
                >
                  View Challenge
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/challenges" className="btn-secondary">
            View All Challenges
          </Link>
        </div>
      </div>
    </section>
  );
}

function getRemainingTime(endDateStr) {
  const endDate = new Date(endDateStr);
  const now = new Date();
  
  if (now >= endDate) {
    return [
      { value: 0, label: 'Days' },
      { value: 0, label: 'Hours' },
      { value: 0, label: 'Mins' },
    ];
  }
  
  const diffMs = endDate - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return [
    { value: diffDays, label: 'Days' },
    { value: diffHours, label: 'Hours' },
    { value: diffMinutes, label: 'Mins' },
  ];
}


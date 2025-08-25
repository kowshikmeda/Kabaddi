import React from 'react';
import { Trophy, Users, Flame } from 'lucide-react';

const LandingPage = () => {
  const teams = [
    {
      id: 1,
      name: "Bengal Warriors",
      photo: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300&h=200&fit=crop&crop=faces",
      score: 42,
      matches: 15,
      wins: 10,
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: 2,
      name: "Patna Pirates",
      photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=faces",
      score: 38,
      matches: 14,
      wins: 9,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 3,
      name: "Dabang Delhi",
      photo: "https://images.unsplash.com/photo-1594736797933-d0201ba2fe65?w=300&h=200&fit=crop&crop=faces",
      score: 45,
      matches: 16,
      wins: 11,
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: 4,
      name: "U Mumba",
      photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
      score: 35,
      matches: 13,
      wins: 8,
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      id: 5,
      name: "Tamil Thalaivas",
      photo: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300&h=200&fit=crop&crop=center",
      score: 41,
      matches: 15,
      wins: 10,
      gradient: "from-pink-500 to-rose-600"
    },
    {
      id: 6,
      name: "Jaipur Pink Panthers",
      photo: "https://images.unsplash.com/photo-1594736797933-d0201ba2fe65?w=300&h=200&fit=crop&crop=faces",
      score: 39,
      matches: 14,
      wins: 9,
      gradient: "from-indigo-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm"></div>
        <div className="relative z-10 container mx-auto px-6 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-2xl">
              <Flame className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold  mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            KABADDI LEAGUE
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the thrill of India's most intense sport. Watch your favorite teams battle it out in the ultimate test of strength and strategy.
          </p>
          <div className="flex justify-center space-x-8 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">12</div>
              <div className="text-sm">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">156</div>
              <div className="text-sm">Matches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">2.5M</div>
              <div className="text-sm">Fans</div>
            </div>
          </div>
        </div>
      </div>

      {/* Teams Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Championship Teams</h2>
          <p className="text-gray-400 text-lg">Meet the warriors competing for ultimate glory</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${team.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
              
              {/* Team Photo */}
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img
                  src={team.photo}
                  alt={team.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                  <span className="text-white font-semibold text-sm">#{team.id}</span>
                </div>
              </div>

              {/* Team Info */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                  {team.name}
                </h3>
                
                {/* Score Section */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span className="text-gray-300">Score</span>
                  </div>
                  <span className="text-3xl font-bold text-orange-400">{team.score}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                    <div className="text-2xl font-bold text-blue-400">{team.matches}</div>
                    <div className="text-gray-400 text-sm">Matches</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                    <div className="text-2xl font-bold text-green-400">{team.wins}</div>
                    <div className="text-gray-400 text-sm">Wins</div>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center justify-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>View Team</span>
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-orange-400/30 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Join the Action</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't miss out on the most exciting Kabaddi matches of the season. Get your tickets now!
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Book Tickets Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
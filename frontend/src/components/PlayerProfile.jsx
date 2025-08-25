import React, { useState } from 'react';
import { Trophy, Target, Shield, Star, Calendar, MapPin, TrendingUp, Award, Users, ArrowUp, ArrowDown } from 'lucide-react';

const PlayerProfile = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(0);

  const players = [
    {
      id: 1,
      name: "Pardeep Narwal",
      nickname: "The Dubki King",
      photo: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop&crop=face",
      team: "Patna Pirates",
      teamLogo: "https://images.unsplash.com/photo-1594736797933-d0201ba2fe65?w=100&h=100&fit=crop",
      position: "Raider",
      jerseyNumber: 16,
      age: 27,
      height: "5'9\"",
      weight: "75 kg",
      hometown: "Rindhana, Haryana",
      debut: "2014",
      
      careerStats: {
        totalMatches: 142,
        totalPoints: 1674,
        raidPoints: 1589,
        tacklePoints: 85,
        successfulRaids: 892,
        raidSuccessRate: 65.8,
        averagePoints: 11.8,
        superRaids: 156,
        super10s: 89,
        doOrDieRaidSuccess: 72.3
      },
      
      seasonStats: {
        matches: 22,
        points: 298,
        raidPoints: 284,
        tacklePoints: 14,
        avgPoints: 13.5,
        rank: 2
      },
      
      achievements: [
        "Most raid points in PKL history",
        "3x PKL Champion",
        "Season 5 MVP",
        "Fastest to 1000 raid points",
        "Asian Games Gold Medalist"
      ],
      
      lastFiveMatches: [
        {
          date: "2024-08-20",
          opponent: "Bengal Warriors",
          venue: "EKA Arena",
          result: "Won",
          score: "34-28",
          playerPoints: 15,
          raidPoints: 14,
          tacklePoints: 1,
          performance: "excellent"
        },
        {
          date: "2024-08-17",
          opponent: "Dabang Delhi",
          venue: "Thyagaraj Complex",
          result: "Lost",
          score: "26-31",
          playerPoints: 12,
          raidPoints: 11,
          tacklePoints: 1,
          performance: "good"
        },
        {
          date: "2024-08-14",
          opponent: "U Mumba",
          venue: "NSCI Dome",
          result: "Won",
          score: "38-29",
          playerPoints: 18,
          raidPoints: 16,
          tacklePoints: 2,
          performance: "excellent"
        },
        {
          date: "2024-08-11",
          opponent: "Tamil Thalaivas",
          venue: "Nehru Stadium",
          result: "Won",
          score: "35-30",
          playerPoints: 13,
          raidPoints: 12,
          tacklePoints: 1,
          performance: "good"
        },
        {
          date: "2024-08-08",
          opponent: "Jaipur Pink Panthers",
          venue: "Sawai Mansingh Stadium",
          result: "Lost",
          score: "28-33",
          playerPoints: 8,
          raidPoints: 7,
          tacklePoints: 1,
          performance: "average"
        }
      ]
    },
    {
      id: 2,
      name: "Fazel Atrachali",
      nickname: "The Wall",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      team: "U Mumba",
      teamLogo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
      position: "Defender",
      jerseyNumber: 8,
      age: 31,
      height: "6'2\"",
      weight: "85 kg",
      hometown: "Isfahan, Iran",
      debut: "2016",
      
      careerStats: {
        totalMatches: 98,
        totalPoints: 412,
        raidPoints: 23,
        tacklePoints: 389,
        successfulTackles: 298,
        tackleSuccessRate: 58.2,
        averagePoints: 4.2,
        superTackles: 67,
        highFives: 34,
        doOrDieDefenseSuccess: 65.8
      },
      
      seasonStats: {
        matches: 18,
        points: 78,
        raidPoints: 2,
        tacklePoints: 76,
        avgPoints: 4.3,
        rank: 3
      },
      
      achievements: [
        "Best Defender Season 6",
        "PKL Champion Season 6",
        "Most tackle points by foreign player",
        "Iran National Team Captain",
        "Asian Games Silver Medalist"
      ],
      
      lastFiveMatches: [
        {
          date: "2024-08-19",
          opponent: "Haryana Steelers",
          venue: "Tau Devi Lal Stadium",
          result: "Won",
          score: "29-25",
          playerPoints: 6,
          raidPoints: 0,
          tacklePoints: 6,
          performance: "excellent"
        },
        {
          date: "2024-08-16",
          opponent: "Puneri Paltan",
          venue: "Shree Shivchhatrapati Complex",
          result: "Lost",
          score: "24-28",
          playerPoints: 3,
          raidPoints: 0,
          tacklePoints: 3,
          performance: "average"
        },
        {
          date: "2024-08-13",
          opponent: "Telugu Titans",
          venue: "Gachibowli Stadium",
          result: "Won",
          score: "31-26",
          playerPoints: 7,
          raidPoints: 1,
          tacklePoints: 6,
          performance: "excellent"
        },
        {
          date: "2024-08-10",
          opponent: "Gujarat Giants",
          venue: "EKA Arena",
          result: "Won",
          score: "33-27",
          playerPoints: 4,
          raidPoints: 0,
          tacklePoints: 4,
          performance: "good"
        },
        {
          date: "2024-08-07",
          opponent: "Bengal Warriors",
          venue: "Netaji Subhash Chandra Bose Indoor Stadium",
          result: "Lost",
          score: "22-30",
          playerPoints: 2,
          raidPoints: 0,
          tacklePoints: 2,
          performance: "poor"
        }
      ]
    }
  ];

  const player = players[selectedPlayer];

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'excellent': return 'text-green-400 bg-green-500/20';
      case 'good': return 'text-blue-400 bg-blue-500/20';
      case 'average': return 'text-yellow-400 bg-yellow-500/20';
      case 'poor': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getResultColor = (result) => {
    return result === 'Won' ? 'text-green-400' : 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto max-w-7xl">
        
        {/* Player Selector */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold  mb-6 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Player Profile
          </h1>
          <div className="flex justify-center space-x-4">
            {players.map((p, index) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlayer(index)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                  selectedPlayer === index 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <img src={p.photo} alt={p.name} className="w-8 h-8 rounded-full" />
                <span className="font-medium">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column - Player Info & Career Stats */}
          <div className="xl:col-span-1 space-y-6">
            
            {/* Player Card */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden">
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-orange-500 to-red-600"></div>
                <div className="absolute -bottom-16 left-6">
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-32 h-32 rounded-2xl border-4 border-white/20 shadow-2xl object-cover"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                  <span className="text-white font-bold text-lg">#{player.jerseyNumber}</span>
                </div>
              </div>
              
              <div className="pt-20 p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-white">{player.name}</h2>
                  <img src={player.teamLogo} alt={player.team} className="w-8 h-8 rounded-full" />
                </div>
                <p className="text-orange-400 font-medium mb-1">"{player.nickname}"</p>
                <p className="text-gray-300 mb-4">{player.position} • {player.team}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-orange-400 font-bold">Age</div>
                    <div className="text-white text-lg">{player.age}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-orange-400 font-bold">Height</div>
                    <div className="text-white text-lg">{player.height}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-orange-400 font-bold">Weight</div>
                    <div className="text-white text-lg">{player.weight}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-orange-400 font-bold">Debut</div>
                    <div className="text-white text-lg">{player.debut}</div>
                  </div>
                </div>
                
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <div className="text-gray-400 text-sm">Hometown</div>
                  <div className="text-white font-medium">{player.hometown}</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Award className="w-6 h-6 text-yellow-400" />
                <span>Achievements</span>
              </h3>
              <div className="space-y-2">
                {player.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                    <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Recent Matches */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Season vs Career Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Season Stats */}
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <span>Current Season</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl">
                    <div className="text-3xl font-bold text-blue-400 mb-1">{player.seasonStats.matches}</div>
                    <div className="text-gray-300 text-sm">Matches</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl">
                    <div className="text-3xl font-bold text-orange-400 mb-1">{player.seasonStats.points}</div>
                    <div className="text-gray-300 text-sm">Total Points</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-2xl">
                    <div className="text-3xl font-bold text-green-400 mb-1">{player.seasonStats.avgPoints}</div>
                    <div className="text-gray-300 text-sm">Avg Points</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl">
                    <div className="text-3xl font-bold text-yellow-400 mb-1">#{player.seasonStats.rank}</div>
                    <div className="text-gray-300 text-sm">League Rank</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-300 flex items-center space-x-2">
                      <Target className="w-4 h-4 text-red-400" />
                      <span>Raid Points</span>
                    </span>
                    <span className="text-red-400 font-bold">{player.seasonStats.raidPoints}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                    <span className="text-gray-300 flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-blue-400" />
                      <span>Tackle Points</span>
                    </span>
                    <span className="text-blue-400 font-bold">{player.seasonStats.tacklePoints}</span>
                  </div>
                </div>
              </div>

              {/* Career Stats */}
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span>Career Stats</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl">
                    <div className="text-4xl font-bold text-purple-400 mb-1">{player.careerStats.totalPoints}</div>
                    <div className="text-gray-300">Career Points</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {player.careerStats.raidPoints} raids • {player.careerStats.tacklePoints} tackles
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-white mb-1">{player.careerStats.totalMatches}</div>
                      <div className="text-gray-400 text-sm">Matches</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-xl">
                      <div className="text-2xl font-bold text-orange-400 mb-1">{player.careerStats.averagePoints}</div>
                      <div className="text-gray-400 text-sm">Avg Points</div>
                    </div>
                  </div>
                  
                  {player.position === 'Raider' ? (
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-300 text-sm">Success Rate</span>
                        <span className="text-green-400 font-bold">{player.careerStats.raidSuccessRate}%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-300 text-sm">Super Raids</span>
                        <span className="text-yellow-400 font-bold">{player.careerStats.superRaids}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-300 text-sm">Super 10s</span>
                        <span className="text-purple-400 font-bold">{player.careerStats.super10s}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-300 text-sm">Tackle Rate</span>
                        <span className="text-blue-400 font-bold">{player.careerStats.tackleSuccessRate}%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-300 text-sm">Super Tackles</span>
                        <span className="text-yellow-400 font-bold">{player.careerStats.superTackles}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-white/5 rounded-xl">
                        <span className="text-gray-300 text-sm">High 5s</span>
                        <span className="text-green-400 font-bold">{player.careerStats.highFives}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Last 5 Matches */}
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-blue-400" />
                <span>Recent Matches</span>
              </h3>
              
              <div className="space-y-4">
                {player.lastFiveMatches.map((match, index) => (
                  <div key={index} className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-gray-400 text-sm">{match.date}</div>
                        <span className="text-gray-500">•</span>
                        <div className="flex items-center space-x-2 text-gray-300 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{match.venue}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${getPerformanceColor(match.performance)}`}>
                        {match.performance.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-white font-bold">vs {match.opponent}</div>
                        <div className={`font-bold ${getResultColor(match.result)}`}>
                          {match.result} {match.score}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {match.result === 'Won' ? (
                          <ArrowUp className="w-4 h-4 text-green-400" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl">
                        <div className="text-2xl font-bold text-orange-400 mb-1">{match.playerPoints}</div>
                        <div className="text-gray-300 text-xs">Total Points</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl">
                        <div className="text-2xl font-bold text-red-400 mb-1">{match.raidPoints}</div>
                        <div className="text-gray-300 text-xs">Raid Points</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{match.tacklePoints}</div>
                        <div className="text-gray-300 text-xs">Tackle Points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Performance Trend */}
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">Last 5 Matches Average</span>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-400">
                        {Math.round((player.lastFiveMatches.reduce((sum, match) => sum + match.playerPoints, 0) / 5) * 10) / 10}
                      </div>
                      <div className="text-xs text-gray-400">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">
                        {player.lastFiveMatches.filter(match => match.result === 'Won').length}/5
                      </div>
                      <div className="text-xs text-gray-400">Wins</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
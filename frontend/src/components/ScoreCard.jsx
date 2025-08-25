import React, { useState } from 'react';
import { Trophy, Clock, MapPin, Flame, Users, Target, Shield, Star } from 'lucide-react';

const ScoreCard = () => {
  const [selectedTeam, setSelectedTeam] = useState('team1');

  // Match data is now a single object instead of an array
  const match = {
    id: 1,
    team1: {
      name: "Bengal Warriors",
      photo: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=150&h=150&fit=crop&crop=faces",
      score: 34,
      gradient: "from-orange-500 to-red-600",
      players: [
        { name: "Maninder Singh", raidPoints: 12, tacklePoints: 2, totalPoints: 14 },
        { name: "Ran Singh", raidPoints: 2, tacklePoints: 4, totalPoints: 6 },
        { name: "Girish Ernak", raidPoints: 1, tacklePoints: 3, totalPoints: 4 },
        { name: "Baldev Singh", raidPoints: 5, tacklePoints: 1, totalPoints: 6 },
        { name: "Mohammad Nabibakhsh", raidPoints: 0, tacklePoints: 2, totalPoints: 2 },
        { name: "Deepak Hooda", raidPoints: 1, tacklePoints: 1, totalPoints: 2 }
      ]
    },
    team2: {
      name: "Patna Pirates",
      photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=faces",
      score: 28,
      gradient: "from-blue-500 to-purple-600",
      players: [
        { name: "Pardeep Narwal", raidPoints: 8, tacklePoints: 1, totalPoints: 9 },
        { name: "Monu", raidPoints: 3, tacklePoints: 3, totalPoints: 6 },
        { name: "Neeraj Kumar", raidPoints: 1, tacklePoints: 2, totalPoints: 3 },
        { name: "Sajin C", raidPoints: 4, tacklePoints: 0, totalPoints: 4 },
        { name: "Mohammadreza Chiyaneh", raidPoints: 0, tacklePoints: 3, totalPoints: 3 },
        { name: "Sunil", raidPoints: 2, tacklePoints: 1, totalPoints: 3 }
      ]
    },
    status: "FINISHED",
    time: "40:00",
    venue: "Jawaharlal Nehru Indoor Stadium",
    date: "Today, 8:00 PM"
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'LIVE': return 'bg-red-500 text-white animate-pulse';
      case 'FINISHED': return 'bg-green-500 text-white';
      case 'UPCOMING': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  const winner = match.status === 'FINISHED' 
    ? (match.team1.score > match.team2.score ? 'team1' : 
      (match.team2.score > match.team1.score ? 'team2' : 'draw')) 
    : null;

  const currentTeamData = selectedTeam === 'team1' ? match.team1 : match.team2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Navbar Style Header */}
        <div className="flex items-center justify-between bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-lg">
                    <Flame className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    KABADDI LEAGUE SCORECARD
                </h1>
            </div>
          
        </div>

        {/* Match Scorecard Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden">
          {/* Score Display Header */}
          <div className="p-8 border-b border-white/10">
            <div className="flex justify-between items-center mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(match.status)}`}>
                    {match.status}
                </span>
              
                 <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>{match.venue}</span>
                <span>{match.date}</span>
            </div>
            </div>

            <div className="flex items-center justify-around">
                {/* Team 1 */}
                <div className={`flex-1 text-center ${winner === 'team1' ? 'scale-105' : ''} transition-transform duration-300`}>
                    <div className="relative mb-3 inline-block">
                        <img src={match.team1.photo} alt={match.team1.name} className={`w-24 h-24 rounded-full mx-auto object-cover border-4 ${winner === 'team1' ? 'border-yellow-400' : 'border-white/20'}`} />
                        {winner === 'team1' && <Trophy className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 bg-slate-800 rounded-full p-1" />}
                    </div>
                    <h3 className={`font-bold text-lg mb-2 ${winner === 'team1' ? 'text-yellow-400' : 'text-white'}`}>{match.team1.name}</h3>
                    <div className={`text-5xl font-bold ${winner === 'team1' ? 'text-yellow-400' : 'text-orange-400'}`}>{match.team1.score}</div>
                </div>

                {/* VS Separator */}
                <div className="px-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-3">
                        <span className="text-white font-bold text-lg">VS</span>
                    </div>
                </div>

                {/* Team 2 */}
                <div className={`flex-1 text-center ${winner === 'team2' ? 'scale-105' : ''} transition-transform duration-300`}>
                    <div className="relative mb-3 inline-block">
                        <img src={match.team2.photo} alt={match.team2.name} className={`w-24 h-24 rounded-full mx-auto object-cover border-4 ${winner === 'team2' ? 'border-yellow-400' : 'border-white/20'}`} />
                        {winner === 'team2' && <Trophy className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 bg-slate-800 rounded-full p-1" />}
                    </div>
                    <h3 className={`font-bold text-lg mb-2 ${winner === 'team2' ? 'text-yellow-400' : 'text-white'}`}>{match.team2.name}</h3>
                    <div className={`text-5xl font-bold ${winner === 'team2' ? 'text-yellow-400' : 'text-orange-400'}`}>{match.team2.score}</div>
                </div>
            </div>
          </div>
          
          {/* Team Toggle Bar for Stats */}
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white text-center mb-4">View Player Statistics</h3>
            <div className="flex bg-white/10 rounded-2xl p-2 max-w-md mx-auto">
              <button onClick={() => setSelectedTeam('team1')} className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedTeam === 'team1' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}>
                <img src={match.team1.photo} alt="" className="w-6 h-6 rounded-full" />
                <span>{match.team1.name}</span>
              </button>
              <button onClick={() => setSelectedTeam('team2')} className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedTeam === 'team2' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}>
                <img src={match.team2.photo} alt="" className="w-6 h-6 rounded-full" />
                <span>{match.team2.name}</span>
              </button>
            </div>
          </div>

          {/* Player Statistics */}
          <div className="p-6">
            <div className="grid grid-cols-6 gap-4 mb-4 p-4 bg-white/10 rounded-xl">
              <div className="col-span-2 text-gray-400 font-semibold">Player</div>
              <div className="text-center text-gray-400 font-semibold flex items-center justify-center space-x-1"><Target className="w-4 h-4" /><span>Raids</span></div>
              <div className="text-center text-gray-400 font-semibold flex items-center justify-center space-x-1"><Shield className="w-4 h-4" /><span>Tackles</span></div>
              <div className="text-center text-gray-400 font-semibold flex items-center justify-center space-x-1"><Star className="w-4 h-4" /><span>Total</span></div>
              <div className="text-center text-gray-400 font-semibold">Performance</div>
            </div>

            <div className="space-y-3">
              {currentTeamData.players.map((player, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 items-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                  <div className="col-span-2 text-white font-semibold">{player.name}</div>
                  <div className="text-center"><span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg font-bold">{player.raidPoints}</span></div>
                  <div className="text-center"><span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg font-bold">{player.tacklePoints}</span></div>
                  <div className="text-center"><span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-lg font-bold">{player.totalPoints}</span></div>
                  <div className="text-center">
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((player.totalPoints / 15) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">{currentTeamData.players.reduce((sum, p) => sum + p.raidPoints, 0)}</div>
                  <div className="text-gray-300 text-sm">Total Raid Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{currentTeamData.players.reduce((sum, p) => sum + p.tacklePoints, 0)}</div>
                  <div className="text-gray-300 text-sm">Total Tackle Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">{currentTeamData.players.reduce((sum, p) => sum + p.totalPoints, 0)}</div>
                  <div className="text-gray-300 text-sm">Team Total Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
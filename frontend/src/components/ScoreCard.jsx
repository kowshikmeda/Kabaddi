import React, { useState } from 'react';
import { Trophy, Clock, MapPin, Flame, Users, Target, Shield, Star } from 'lucide-react';

const ScoreCard = () => {
  const [selectedMatch, setSelectedMatch] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState('team1');

  const matches = [
    {
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
    },
    {
      id: 2,
      team1: {
        name: "Dabang Delhi",
        photo: "https://images.unsplash.com/photo-1594736797933-d0201ba2fe65?w=150&h=150&fit=crop&crop=faces",
        score: 26,
        gradient: "from-green-500 to-teal-600",
        players: [
          { name: "Naveen Kumar", raidPoints: 11, tacklePoints: 0, totalPoints: 11 },
          { name: "Ashu Malik", raidPoints: 4, tacklePoints: 1, totalPoints: 5 },
          { name: "Krishan", raidPoints: 1, tacklePoints: 2, totalPoints: 3 },
          { name: "Sandeep Narwal", raidPoints: 0, tacklePoints: 3, totalPoints: 3 },
          { name: "Joginder Narwal", raidPoints: 1, tacklePoints: 2, totalPoints: 3 },
          { name: "Ravi Kumar", raidPoints: 0, tacklePoints: 1, totalPoints: 1 }
        ]
      },
      team2: {
        name: "UP Yoddhas",
        photo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=center",
        score: 26,
        gradient: "from-blue-600 to-indigo-600",
        players: [
          { name: "Pardeep Narwal", raidPoints: 9, tacklePoints: 0, totalPoints: 9 },
          { name: "Surender Gill", raidPoints: 5, tacklePoints: 1, totalPoints: 6 },
          { name: "Nitesh Kumar", raidPoints: 0, tacklePoints: 4, totalPoints: 4 },
          { name: "Sumit", raidPoints: 2, tacklePoints: 1, totalPoints: 3 },
          { name: "Babu Murugasan", raidPoints: 1, tacklePoints: 2, totalPoints: 3 },
          { name: "Gurdeep", raidPoints: 0, tacklePoints: 1, totalPoints: 1 }
        ]
      },
      status: "LIVE",
      time: "25:12",
      venue: "Shree Shivchhatrapati Sports Complex",
      date: "Today, 9:00 PM"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'LIVE': return 'bg-red-500 text-white animate-pulse';
      case 'FINISHED': return 'bg-green-500 text-white';
      case 'UPCOMING': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getWinner = (match) => {
    if (match.status !== 'FINISHED') return null;
    return match.team1.score > match.team2.score ? 'team1' : 
           match.team2.score > match.team1.score ? 'team2' : 'draw';
  };

  const currentMatch = matches[selectedMatch];
  const currentTeamData = selectedTeam === 'team1' ? currentMatch.team1 : currentMatch.team2;

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
            Live scores, detailed player statistics, and comprehensive match analysis
          </p>
        </div>
      </div>

      {/* Matches Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Live Matches</h2>
          <p className="text-gray-400 text-lg">Select a match to view detailed statistics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {matches.map((match, index) => {
            const winner = getWinner(match);
            const isSelected = selectedMatch === index;
            return (
              <div
                key={match.id}
                onClick={() => setSelectedMatch(index)}
                className={`group relative cursor-pointer bg-white/5 backdrop-blur-lg rounded-3xl p-6 border transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 ${
                  isSelected ? 'border-orange-500 shadow-lg shadow-orange-500/30' : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Status Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(match.status)}`}>
                    {match.status}
                  </span>
                  {match.status === 'LIVE' && (
                    <div className="flex items-center space-x-2 text-orange-400">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono text-sm">{match.time}</span>
                    </div>
                  )}
                </div>

                {/* Teams and Score */}
                <div className="flex items-center justify-between mb-6">
                  {/* Team 1 */}
                  <div className={`flex-1 text-center ${winner === 'team1' ? 'scale-105' : ''} transition-transform duration-300`}>
                    <div className="relative mb-3">
                      <img
                        src={match.team1.photo}
                        alt={match.team1.name}
                        className={`w-16 h-16 rounded-full mx-auto object-cover border-4 ${
                          winner === 'team1' ? 'border-yellow-400 shadow-lg shadow-yellow-400/50' : 'border-white/20'
                        }`}
                      />
                      {winner === 'team1' && (
                        <Trophy className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 bg-slate-800 rounded-full p-1" />
                      )}
                    </div>
                    <h3 className={`font-bold mb-2 text-sm ${winner === 'team1' ? 'text-yellow-400' : 'text-white'}`}>
                      {match.team1.name}
                    </h3>
                    <div className={`text-3xl font-bold ${
                      winner === 'team1' ? 'text-yellow-400' : 'text-orange-400'
                    }`}>
                      {match.team1.score}
                    </div>
                  </div>

                  {/* VS Separator */}
                  <div className="px-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-2">
                      <span className="text-white font-bold text-sm">VS</span>
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className={`flex-1 text-center ${winner === 'team2' ? 'scale-105' : ''} transition-transform duration-300`}>
                    <div className="relative mb-3">
                      <img
                        src={match.team2.photo}
                        alt={match.team2.name}
                        className={`w-16 h-16 rounded-full mx-auto object-cover border-4 ${
                          winner === 'team2' ? 'border-yellow-400 shadow-lg shadow-yellow-400/50' : 'border-white/20'
                        }`}
                      />
                      {winner === 'team2' && (
                        <Trophy className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 bg-slate-800 rounded-full p-1" />
                      )}
                    </div>
                    <h3 className={`font-bold mb-2 text-sm ${winner === 'team2' ? 'text-yellow-400' : 'text-white'}`}>
                      {match.team2.name}
                    </h3>
                    <div className={`text-3xl font-bold ${
                      winner === 'team2' ? 'text-yellow-400' : 'text-orange-400'
                    }`}>
                      {match.team2.score}
                    </div>
                  </div>
                </div>

                {/* Match Details */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex items-center justify-center text-sm text-gray-300 mb-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{match.venue}</span>
                  </div>
                  <div className="text-center text-sm text-gray-400">
                    {match.date}
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Match Summary Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 border-b border-white/10">
            <h2 className="text-3xl font-bold text-white mb-2">Match Summary</h2>
            <p className="text-gray-300">Detailed player statistics and performance analysis</p>
          </div>

          {/* Team Toggle Bar */}
          <div className="p-6 border-b border-white/10">
            <div className="flex bg-white/10 rounded-2xl p-2 max-w-md mx-auto">
              <button
                onClick={() => setSelectedTeam('team1')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  selectedTeam === 'team1' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <img src={currentMatch.team1.photo} alt="" className="w-6 h-6 rounded-full" />
                <span>{currentMatch.team1.name}</span>
              </button>
              <button
                onClick={() => setSelectedTeam('team2')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  selectedTeam === 'team2' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <img src={currentMatch.team2.photo} alt="" className="w-6 h-6 rounded-full" />
                <span>{currentMatch.team2.name}</span>
              </button>
            </div>
          </div>

          {/* Player Statistics */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span>{currentTeamData.name} Players</span>
              </h3>
              <div className="text-3xl font-bold text-orange-400">
                {selectedTeam === 'team1' ? currentMatch.team1.score : currentMatch.team2.score}
              </div>
            </div>

            {/* Stats Header */}
            <div className="grid grid-cols-5 gap-4 mb-4 p-4 bg-white/10 rounded-xl">
              <div className="text-gray-400 font-semibold">Player</div>
              <div className="text-center text-gray-400 font-semibold flex items-center justify-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Raids</span>
              </div>
              <div className="text-center text-gray-400 font-semibold flex items-center justify-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Tackles</span>
              </div>
              <div className="text-center text-gray-400 font-semibold flex items-center justify-center space-x-1">
                <Star className="w-4 h-4" />
                <span>Total</span>
              </div>
              <div className="text-center text-gray-400 font-semibold">Performance</div>
            </div>

            {/* Player Rows */}
            <div className="space-y-3">
              {currentTeamData.players.map((player, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300">
                  <div className="text-white font-semibold">{player.name}</div>
                  <div className="text-center">
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg font-bold">
                      {player.raidPoints}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg font-bold">
                      {player.tacklePoints}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-lg font-bold">
                      {player.totalPoints}
                    </span>
                  </div>
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

            {/* Team Totals */}
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">
                    {currentTeamData.players.reduce((sum, p) => sum + p.raidPoints, 0)}
                  </div>
                  <div className="text-gray-300 text-sm">Total Raid Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {currentTeamData.players.reduce((sum, p) => sum + p.tacklePoints, 0)}
                  </div>
                  <div className="text-gray-300 text-sm">Total Tackle Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">
                    {currentTeamData.players.reduce((sum, p) => sum + p.totalPoints, 0)}
                  </div>
                  <div className="text-gray-300 text-sm">Total Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {Math.round((currentTeamData.players.reduce((sum, p) => sum + p.totalPoints, 0) / currentTeamData.players.length) * 10) / 10}
                  </div>
                  <div className="text-gray-300 text-sm">Avg per Player</div>
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
import React, { useState } from 'react';
import { Trophy, Users, Clock, Plus, Minus } from 'lucide-react';

const UpdateMatch = () => {
  const [matchData, setMatchData] = useState({
    teamA: {
      name: 'Patna Pirates',
      score: 28,
      color: 'from-red-500 to-red-600'
    },
    teamB: {
      name: 'Bengal Warriors',
      score: 24,
      color: 'from-blue-500 to-blue-600'
    },
    timeRemaining: '12:45',
    half: 'Second Half',
    status: 'Live'
  });

  const [updateForm, setUpdateForm] = useState({
    selectedTeam: 'teamA',
    pointType: 'raid',
    points: 1
  });

  const pointTypes = [
    { value: 'raid', label: 'Raid Point', points: [1, 2, 3, 4, 5] },
    { value: 'tackle', label: 'Tackle Point', points: [1, 2] },
    { value: 'bonus', label: 'Bonus Point', points: [1] },
    { value: 'technical', label: 'Technical Point', points: [1, 2] },
    { value: 'allout', label: 'All Out', points: [2] }
  ];

  const handleScoreUpdate = () => {
    setMatchData(prev => ({
      ...prev,
      [updateForm.selectedTeam]: {
        ...prev[updateForm.selectedTeam],
        score: prev[updateForm.selectedTeam].score + updateForm.points
      }
    }));
  };

  const handleScoreDeduct = () => {
    setMatchData(prev => ({
      ...prev,
      [updateForm.selectedTeam]: {
        ...prev[updateForm.selectedTeam],
        score: Math.max(0, prev[updateForm.selectedTeam].score - updateForm.points)
      }
    }));
  };

  const getSelectedPointType = () => {
    return pointTypes.find(type => type.value === updateForm.pointType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Match Scorecard Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <h1 className="text-3xl font-bold text-white">Pro Kabaddi League</h1>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className={`px-3 py-1 rounded-full ${
                matchData.status === 'Live' ? 'bg-red-500 animate-pulse' : 'bg-gray-500'
              } text-white font-semibold`}>
                {matchData.status}
              </span>
              <span className="text-white/80 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {matchData.timeRemaining}
              </span>
              <span className="text-white/80">{matchData.half}</span>
            </div>
          </div>

          {/* Teams and Scores */}
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Team A */}
            <div className="text-center">
              <div className={`bg-gradient-to-r ${matchData.teamA.color} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg`}>
                <div className="text-white mb-4">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <h2 className="text-xl font-bold">{matchData.teamA.name}</h2>
                </div>
                <div className="text-6xl font-black text-white mb-2">
                  {matchData.teamA.score}
                </div>
                <div className="text-white/80 text-sm font-semibold">POINTS</div>
              </div>
            </div>

            {/* VS Divider */}
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto border border-white/30">
                <span className="text-2xl font-black text-white">VS</span>
              </div>
            </div>

            {/* Team B */}
            <div className="text-center">
              <div className={`bg-gradient-to-r ${matchData.teamB.color} rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg`}>
                <div className="text-white mb-4">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <h2 className="text-xl font-bold">{matchData.teamB.name}</h2>
                </div>
                <div className="text-6xl font-black text-white mb-2">
                  {matchData.teamB.score}
                </div>
                <div className="text-white/80 text-sm font-semibold">POINTS</div>
              </div>
            </div>
          </div>

          {/* Match Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Raids', value: '42' },
              { label: 'Successful Tackles', value: '18' },
              { label: 'All Outs', value: '3' },
              { label: 'Bonus Points', value: '12' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Update Control Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Score Update Panel</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {/* Team Selection */}
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">Select Team</label>
              <select 
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                value={updateForm.selectedTeam}
                onChange={(e) => setUpdateForm(prev => ({ ...prev, selectedTeam: e.target.value }))}
              >
                <option value="teamA" className="bg-slate-800">{matchData.teamA.name}</option>
                <option value="teamB" className="bg-slate-800">{matchData.teamB.name}</option>
              </select>
            </div>

            {/* Point Type Selection */}
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">Point Type</label>
              <select 
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                value={updateForm.pointType}
                onChange={(e) => {
                  const selectedType = pointTypes.find(type => type.value === e.target.value);
                  setUpdateForm(prev => ({ 
                    ...prev, 
                    pointType: e.target.value,
                    points: selectedType?.points[0] || 1
                  }));
                }}
              >
                {pointTypes.map(type => (
                  <option key={type.value} value={type.value} className="bg-slate-800">
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Points Selection */}
            <div>
              <label className="block text-white/80 text-sm font-semibold mb-2">Points</label>
              <select 
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                value={updateForm.points}
                onChange={(e) => setUpdateForm(prev => ({ ...prev, points: parseInt(e.target.value) }))}
              >
                {getSelectedPointType()?.points.map(point => (
                  <option key={point} value={point} className="bg-slate-800">
                    {point} {point === 1 ? 'Point' : 'Points'}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <label className="block text-white/80 text-sm font-semibold mb-2">Actions</label>
              <button
                onClick={handleScoreUpdate}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add Points
              </button>
              <button
                onClick={handleScoreDeduct}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Minus className="w-4 h-4" />
                Deduct Points
              </button>
            </div>
          </div>

          {/* Current Selection Display */}
          <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/20">
            <div className="text-white text-center">
              <span className="text-white/70">Selected: </span>
              <span className="font-bold">
                {matchData[updateForm.selectedTeam].name}
              </span>
              <span className="text-white/70"> • </span>
              <span className="font-bold">
                {getSelectedPointType()?.label}
              </span>
              <span className="text-white/70"> • </span>
              <span className="font-bold text-green-400">
                {updateForm.points} {updateForm.points === 1 ? 'Point' : 'Points'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMatch;
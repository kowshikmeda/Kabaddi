import React, { useState } from 'react';
import { Trophy, Users, Clock, Plus, Minus, Play, Pause } from 'lucide-react';

const UpdateMatch = () => {
  // Simulating a user ID. In a real app, this would come from authentication.
  const currentUserID = 'admin123';
  const allowedUserID = 'admin123';

  const [matchData, setMatchData] = useState({
    teamA: {
      name: 'Patna Pirates',
      score: 28,
      color: 'from-red-500 to-red-600',
      players: ['Sachin', 'Manjeet', 'Neeraj Kumar', 'Rohit Gulia', 'Sandeep Kumar']
    },
    teamB: {
      name: 'Bengal Warriors',
      score: 24,
      color: 'from-blue-500 to-blue-600',
      players: ['Maninder Singh', 'Shrikant Jadhav', 'Girish Maruti Ernak', 'Vaibhav Garje', 'Deepak Hooda']
    },
    timeRemaining: '12:45',
    half: 'Second Half',
    status: 'Live',
    isPaused: false,
  });

  const [updateForm, setUpdateForm] = useState({
    selectedTeam: 'teamA',
    selectedPlayer: 'Sachin',
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

  const togglePause = () => {
    setMatchData(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
      status: prev.isPaused ? 'Live' : 'Paused'
    }));
  };

  const getSelectedPointType = () => {
    return pointTypes.find(type => type.value === updateForm.pointType);
  };

  const handleTeamChange = (e) => {
    const newTeam = e.target.value;
    const newTeamPlayers = matchData[newTeam].players;
    setUpdateForm(prev => ({
      ...prev,
      selectedTeam: newTeam,
      selectedPlayer: newTeamPlayers[0] || ''
    }));
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

          {/* Admin Controls */}
          {currentUserID === allowedUserID && (
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={togglePause}
                className={`flex items-center justify-center gap-2 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg ${
                  matchData.isPaused 
                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                    : 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                }`}
              >
                {matchData.isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                {matchData.isPaused ? 'Resume Match' : 'Pause Match'}
              </button>
            </div>
          )}
        </div>

        {/* Score Update Control Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Score Update Panel</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Team & Player Selection */}
            <div className="md:col-span-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">Select Team</label>
                  <select
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    value={updateForm.selectedTeam}
                    onChange={handleTeamChange}
                  >
                    <option value="teamA" className="bg-slate-800">{matchData.teamA.name}</option>
                    <option value="teamB" className="bg-slate-800">{matchData.teamB.name}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-semibold mb-2">Select Player</label>
                  <select
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    value={updateForm.selectedPlayer}
                    onChange={(e) => setUpdateForm(prev => ({ ...prev, selectedPlayer: e.target.value }))}
                  >
                    {matchData[updateForm.selectedTeam].players.map(player => (
                      <option key={player} value={player} className="bg-slate-800">
                        {player}
                      </option>
                    ))}
                  </select>
                </div>
            </div>

            {/* Point Type & Points Selection */}
            <div className="md:col-span-1 grid grid-cols-2 gap-4">
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
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-1 flex items-end gap-3">
              <button
                onClick={handleScoreUpdate}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
              <button
                onClick={handleScoreDeduct}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Minus className="w-4 h-4" />
                Deduct
              </button>
            </div>
          </div>

          {/* Current Selection Display */}
          <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/20">
            <div className="text-white text-center flex flex-wrap justify-center items-center gap-x-2">
              <span className="text-white/70">Selected: </span>
              <span className="font-bold">
                {matchData[updateForm.selectedTeam].name}
              </span>
              <span className="text-white/70"> • </span>
              <span className="font-bold">
                {updateForm.selectedPlayer}
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
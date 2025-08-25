import React, { useState } from 'react';
import { Plus, Minus, Calendar, MapPin, Users, Trophy, Clock, Save, X, Camera } from 'lucide-react';

const CreateMatch = () => {
  const [formData, setFormData] = useState({
    // Match Details
    venue: '',
    date: '',
    time: '',
    matchType: 'league',
    season: '',
    
    // Team 1 Details
    team1: {
      name: '',
      logo: '',
      players: [
        { name: '', position: 'raider', captain: false },
        { name: '', position: 'defender', captain: false },
        { name: '', position: 'all-rounder', captain: false },
        { name: '', position: 'raider', captain: false },
        { name: '', position: 'defender', captain: false },
        { name: '', position: 'defender', captain: false },
        { name: '', position: 'raider', captain: false }
      ]
    },
    
    // Team 2 Details
    team2: {
      name: '',
      logo: '',
      players: [
        { name: '', position: 'raider', captain: false },
        { name: '', position: 'defender', captain: false },
        { name: '', position: 'all-rounder', captain: false },
        { name: '', position: 'raider', captain: false },
        { name: '', position: 'defender', captain: false },
        { name: '', position: 'defender', captain: false },
        { name: '', position: 'raider', captain: false }
      ]
    }
  });

  const [activeStep, setActiveStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const positions = [
    { value: 'raider', label: 'Raider', color: 'text-red-400' },
    { value: 'defender', label: 'Defender', color: 'text-blue-400' },
    { value: 'all-rounder', label: 'All-Rounder', color: 'text-green-400' }
  ];

  const venues = [
    'Jawaharlal Nehru Indoor Stadium',
    'Thyagaraj Sports Complex',
    'Kanteerava Indoor Stadium',
    'EKA Arena',
    'Shree Shivchhatrapati Sports Complex',
    'Gachibowli Indoor Stadium',
    'Custom Venue'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTeamChange = (team, field, value) => {
    setFormData(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        [field]: value
      }
    }));
  };

  const handlePlayerChange = (team, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        players: prev[team].players.map((player, i) => 
          i === index ? { ...player, [field]: value } : player
        )
      }
    }));
  };

  const addPlayer = (team) => {
    if (formData[team].players.length < 12) {
      setFormData(prev => ({
        ...prev,
        [team]: {
          ...prev[team],
          players: [...prev[team].players, { name: '', position: 'raider', captain: false }]
        }
      }));
    }
  };

  const removePlayer = (team, index) => {
    if (formData[team].players.length > 7) {
      setFormData(prev => ({
        ...prev,
        [team]: {
          ...prev[team],
          players: prev[team].players.filter((_, i) => i !== index)
        }
      }));
    }
  };

  const setCaptain = (team, index) => {
    setFormData(prev => ({
      ...prev,
      [team]: {
        ...prev[team],
        players: prev[team].players.map((player, i) => ({
          ...player,
          captain: i === index
        }))
      }
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.venue) errors.push('Venue is required');
    if (!formData.date) errors.push('Date is required');
    if (!formData.time) errors.push('Time is required');
    if (!formData.team1.name) errors.push('Team 1 name is required');
    if (!formData.team2.name) errors.push('Team 2 name is required');
    
    const team1EmptyPlayers = formData.team1.players.filter(p => !p.name).length;
    const team2EmptyPlayers = formData.team2.players.filter(p => !p.name).length;
    
    if (team1EmptyPlayers > 0) errors.push(`Team 1 has ${team1EmptyPlayers} players without names`);
    if (team2EmptyPlayers > 0) errors.push(`Team 2 has ${team2EmptyPlayers} players without names`);
    
    const team1Captain = formData.team1.players.some(p => p.captain);
    const team2Captain = formData.team2.players.some(p => p.captain);
    
    if (!team1Captain) errors.push('Team 1 needs a captain');
    if (!team2Captain) errors.push('Team 2 needs a captain');
    
    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm();
    if (errors.length === 0) {
      setShowPreview(true);
    } else {
      alert('Please fix the following errors:\n' + errors.join('\n'));
    }
  };

  const steps = [
    { id: 1, title: 'Match Details', icon: Calendar },
    { id: 2, title: 'Team 1', icon: Users },
    { id: 3, title: 'Team 2', icon: Users },
    { id: 4, title: 'Review', icon: Trophy }
  ];

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Match Created Successfully!</h2>
                  <p className="text-gray-300">Your Kabaddi match has been scheduled</p>
                </div>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-8">
              {/* Match Info */}
              <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Match Information</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div><span className="text-orange-400">Venue:</span> {formData.venue}</div>
                  <div><span className="text-orange-400">Date:</span> {formData.date}</div>
                  <div><span className="text-orange-400">Time:</span> {formData.time}</div>
                  <div><span className="text-orange-400">Type:</span> {formData.matchType}</div>
                </div>
              </div>

              {/* Teams Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[formData.team1, formData.team2].map((team, teamIndex) => (
                  <div key={teamIndex} className="bg-white/5 rounded-2xl border border-white/10 p-6">
                    <h3 className="text-xl font-bold text-white mb-4">{team.name}</h3>
                    <div className="space-y-2">
                      {team.players.map((player, playerIndex) => (
                        <div key={playerIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-white font-medium">{player.name}</span>
                            {player.captain && (
                              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-bold">
                                CAPTAIN
                              </span>
                            )}
                          </div>
                          <span className={`text-sm font-medium ${
                            positions.find(p => p.value === player.position)?.color || 'text-gray-400'
                          }`}>
                            {positions.find(p => p.value === player.position)?.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button 
                  onClick={() => {
                    setShowPreview(false);
                    setActiveStep(1);
                    setFormData({
                      venue: '', date: '', time: '', matchType: 'league', season: '',
                      team1: { name: '', logo: '', players: Array(7).fill({ name: '', position: 'raider', captain: false }) },
                      team2: { name: '', logo: '', players: Array(7).fill({ name: '', position: 'raider', captain: false }) }
                    });
                  }}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Create Another Match
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold  mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Create Kabaddi Match
          </h1>
          <p className="text-xl text-gray-300">Set up a new match with teams, players, and venue details</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-8">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeStep === step.id 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
                    : activeStep > step.id 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-white/10 text-gray-400'
                }`}
              >
                <step.icon className="w-5 h-5" />
                <span className="font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden">
          {/* Step 1: Match Details */}
          {activeStep === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Match Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Venue</label>
                  <select
                    value={formData.venue}
                    onChange={(e) => handleInputChange('venue', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="" className="bg-slate-800">Select Venue</option>
                    {venues.map(venue => (
                      <option key={venue} value={venue} className="bg-slate-800">{venue}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 font-medium mb-2">Match Type</label>
                  <select
                    value={formData.matchType}
                    onChange={(e) => handleInputChange('matchType', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="league" className="bg-slate-800">League Match</option>
                    <option value="playoff" className="bg-slate-800">Playoff</option>
                    <option value="final" className="bg-slate-800">Final</option>
                    <option value="friendly" className="bg-slate-800">Friendly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-300 font-medium mb-2">Season (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., PKL Season 10"
                    value={formData.season}
                    onChange={(e) => handleInputChange('season', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 & 3: Team Details */}
          {(activeStep === 2 || activeStep === 3) && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                {activeStep === 2 ? 'Team 1 Details' : 'Team 2 Details'}
              </h2>
              
              {/* Team Basic Info */}
              <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Team Name</label>
                    <input
                      type="text"
                      placeholder="Enter team name"
                      value={formData[`team${activeStep - 1}`].name}
                      onChange={(e) => handleTeamChange(`team${activeStep - 1}`, 'name', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">Team Logo URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={formData[`team${activeStep - 1}`].logo}
                      onChange={(e) => handleTeamChange(`team${activeStep - 1}`, 'logo', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Players List */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Squad Players</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">
                      {formData[`team${activeStep - 1}`].players.length} / 12 players
                    </span>
                    <button
                      onClick={() => addPlayer(`team${activeStep - 1}`)}
                      disabled={formData[`team${activeStep - 1}`].players.length >= 12}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {formData[`team${activeStep - 1}`].players.map((player, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <input
                            type="text"
                            placeholder="Player name"
                            value={player.name}
                            onChange={(e) => handlePlayerChange(`team${activeStep - 1}`, index, 'name', e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <select
                            value={player.position}
                            onChange={(e) => handlePlayerChange(`team${activeStep - 1}`, index, 'position', e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            {positions.map(pos => (
                              <option key={pos.value} value={pos.value} className="bg-slate-800">
                                {pos.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => setCaptain(`team${activeStep - 1}`, index)}
                            className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${
                              player.captain 
                                ? 'bg-yellow-500/20 text-yellow-400' 
                                : 'bg-white/10 text-gray-400 hover:bg-white/20'
                            }`}
                          >
                            {player.captain ? 'CAPTAIN' : 'Make Captain'}
                          </button>
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => removePlayer(`team${activeStep - 1}`, index)}
                            disabled={formData[`team${activeStep - 1}`].players.length <= 7}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {activeStep === 4 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Review Match Details</h2>
              
              <div className="space-y-6">
                {/* Match Summary */}
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4">Match Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
                    <div><span className="text-orange-400">Venue:</span> {formData.venue}</div>
                    <div><span className="text-orange-400">Date:</span> {formData.date}</div>
                    <div><span className="text-orange-400">Time:</span> {formData.time}</div>
                    <div><span className="text-orange-400">Type:</span> {formData.matchType}</div>
                  </div>
                </div>

                {/* Teams Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[formData.team1, formData.team2].map((team, teamIndex) => (
                    <div key={teamIndex} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4">{team.name}</h3>
                      <div className="text-gray-400 text-sm mb-3">
                        {team.players.length} players • Captain: {team.players.find(p => p.captain)?.name || 'Not selected'}
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {team.players.map((player, playerIndex) => (
                          <div key={playerIndex} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                            <span className="text-white text-sm">{player.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`text-xs ${positions.find(p => p.value === player.position)?.color}`}>
                                {positions.find(p => p.value === player.position)?.label}
                              </span>
                              {player.captain && (
                                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">C</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="bg-white/5 px-8 py-6 border-t border-white/10">
            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {activeStep < 4 ? (
                <button
                  onClick={() => setActiveStep(Math.min(4, activeStep + 1))}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Create Match</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMatch;
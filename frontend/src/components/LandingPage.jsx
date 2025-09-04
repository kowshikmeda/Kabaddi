import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Flame, Search, Clock, MapPin, Plus, Loader2 } from 'lucide-react';
import { baseURL } from '../utils/constants';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import webSocketService from '../service/websocket'; // Import your WebSocket service

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("user");

  // Ref to hold individual match countdown timers
  const matchTimersRef = useRef({});

  // Helper function to format time
  const formatTimeFromSeconds = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      return "00:00";
    }
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = Math.floor(totalSeconds % 60);
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  // Function to manage individual match countdowns
  const manageIndividualMatchCountdown = useCallback((matchId, status, initialRemainingDuration) => {
    // Always clear existing timer first to avoid multiple intervals for the same match
    if (matchTimersRef.current[matchId]) {
      clearInterval(matchTimersRef.current[matchId]);
      delete matchTimersRef.current[matchId];
    }

    if (status === 'LIVE' && initialRemainingDuration > 0) {
      let currentRemaining = initialRemainingDuration;

      matchTimersRef.current[matchId] = setInterval(() => {
        currentRemaining -= 1;
        setMatches(prevMatches => prevMatches.map(m =>
          m.id === matchId
            ? {
                ...m,
                time: formatTimeFromSeconds(currentRemaining),
                remainingDuration: currentRemaining,
                // Only mark as COMPLETED locally if it was LIVE and time runs out
                status: currentRemaining <= 0 && m.status === 'LIVE' ? 'COMPLETED' : m.status
              }
            : m
        ));

        if (currentRemaining <= 0) {
          clearInterval(matchTimersRef.current[matchId]);
          delete matchTimersRef.current[matchId];
        }
      }, 1000);
    } else {
        // If not LIVE, ensure display time matches the last known duration and no timer is running
        setMatches(prevMatches => prevMatches.map(m =>
            m.id === matchId
                ? {
                    ...m,
                    time: formatTimeFromSeconds(initialRemainingDuration),
                    remainingDuration: initialRemainingDuration,
                    status: initialRemainingDuration <= 0 && m.status === 'LIVE' ? 'COMPLETED' : status
                }
                : m
        ));
    }
  }, []);

  // Fetch initial matches and setup WebSocket
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get(baseURL + '/matches/all');

        const transformedData = response.data.map(match => ({
          id: match.id,
          matchName: match.matchName,
          team1: {
            name: match.team1Name,
            photo: match.team1PhotoUrl,
            score: match.team1Score
          },
          team2: {
            name: match.team2Name,
            photo: match.team2PhotoUrl,
            score: match.team2Score
          },
          status: match.status,
          venue: match.location,
          creatorName: match.creatorName,
          date: new Date(match.createdAt).toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric'
          }),
          remainingDuration: match.remainingDuration, // Store raw seconds
          time: formatTimeFromSeconds(match.remainingDuration), // Formatted for display
        }));
        setLoading(false);
        setMatches(transformedData);

        // After setting initial matches, start timers for LIVE matches
        transformedData.forEach(match => {
          manageIndividualMatchCountdown(match.id, match.status, match.remainingDuration);
        });

      } catch (error) {
        setLoading(false);
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatches();

    // WebSocket setup for general live match updates
    const liveMatchesSummaryTopic = `/topic/liveMatchesSummary`; // This must match your backend topic

    webSocketService.connect(() => {
      webSocketService.subscribe(liveMatchesSummaryTopic, (matchDto) => {
        // matchDto is expected to be the MatchDto from backend
        console.log('Received live match summary (WebSocket):', matchDto);

        setMatches(prevMatches => {
          const updatedMatches = prevMatches.map(match => {
            if (match.id === matchDto.id) {
              const newRemainingDuration = matchDto.remainingDuration !== undefined ? matchDto.remainingDuration : match.remainingDuration;
              const newStatus = matchDto.status || match.status;

              // Immediately update the individual match timer based on new data
              manageIndividualMatchCountdown(matchDto.id, newStatus, newRemainingDuration);

              return {
                ...match,
                team1: {
                  ...match.team1,
                  name: matchDto.team1Name, // Update name in case it changes (unlikely)
                  photo: matchDto.team1PhotoUrl || match.team1.photo,
                  score: matchDto.team1Score
                },
                team2: {
                  ...match.team2,
                  name: matchDto.team2Name, // Update name
                  photo: matchDto.team2PhotoUrl || match.team2.photo,
                  score: matchDto.team2Score
                },
                status: newStatus,
                venue: matchDto.location || match.venue,
                creatorName: matchDto.creatorName || match.creatorName,
                date: new Date(matchDto.createdAt).toLocaleDateString("en-US", {
                    year: 'numeric', month: 'long', day: 'numeric'
                  }) || match.date,
                remainingDuration: newRemainingDuration,
                time: formatTimeFromSeconds(newRemainingDuration), // Update formatted time based on new duration
              };
            }
            return match;
          });

          // If the matchDto received is for a match not currently in our 'matches' state,
          // it means it just became LIVE/PAUSED, and we should add it.
          // This ensures newly started matches appear without full page refresh.
          if (!updatedMatches.some(m => m.id === matchDto.id)) {
             const newMatchForDisplay = {
                id: matchDto.id,
                team1: {
                    name: matchDto.team1Name,
                    photo: matchDto.team1PhotoUrl,
                    score: matchDto.team1Score
                },
                team2: {
                    name: matchDto.team2Name,
                    photo: matchDto.team2PhotoUrl,
                    score: matchDto.team2Score
                },
                status: matchDto.status,
                venue: matchDto.location,
                creatorName: matchDto.creatorName,
                date: new Date(matchDto.createdAt).toLocaleDateString("en-US", {
                    year: 'numeric', month: 'long', day: 'numeric'
                }),
                remainingDuration: matchDto.remainingDuration,
                time: formatTimeFromSeconds(matchDto.remainingDuration),
             };
             updatedMatches.push(newMatchForDisplay);
             // Start timer for this newly added match
             manageIndividualMatchCountdown(newMatchForDisplay.id, newMatchForDisplay.status, newMatchForDisplay.remainingDuration);
          }

          // Filter out matches that become 'COMPLETED' (or 'UPCOMING' again, if applicable)
          // and are no longer relevant for the live summary
          return updatedMatches.filter(m => m.status !== 'COMPLETED' && m.status !== 'UPCOMING');
        });
      });
    });

    // Cleanup function for useEffect
    return () => {
      // Clear all individual match timers
      for (const matchId in matchTimersRef.current) {
        clearInterval(matchTimersRef.current[matchId]);
      }
      matchTimersRef.current = {}; // Reset the ref

      // Unsubscribe from the all matches topic
      webSocketService.unsubscribe(liveMatchesSummaryTopic);
      // Disconnect WebSocket only if no other components are using it
      webSocketService.disconnect();
    };
  }, [manageIndividualMatchCountdown]); // Added manageIndividualMatchCountdown to dependencies

  const getStatusColor = (status) => {
    switch (status) {
      case 'LIVE': return 'bg-red-500 text-white animate-pulse';
      case 'COMPLETED': return 'bg-green-500 text-white';
      case 'UPCOMING': return 'bg-blue-500 text-white';
      case 'PAUSED': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getWinner = (match) => {
    if (match.status !== 'COMPLETED') return null;
    return match.team1.score > match.team2.score ? 'team1' :
      match.team2.score > match.team1.score ? 'team2' : 'draw';
  };

  const filteredMatches = matches
    .filter(match => {
      // The backend should already filter for non-UPCOMING and non-COMPLETED.
      // But we keep this filter for local UI filtering (all, live, completed, paused).
      // Note: If a match becomes COMPLETED via WS, it's filtered out of `matches` state,
      // so the 'completed' filter might not show it unless we retain them in state.
      // For this requirement, we'll assume 'completed' matches are filtered out of the live stream.
      if (activeFilter === 'all') return true;
      return match.status.toLowerCase() === activeFilter;
    })
    .filter(match => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return match.matchName.toLowerCase().includes(term) //|| match.team2.name.toLowerCase().includes(term);
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm"></div>
        <div className="relative z-10 container mx-auto px-6 py-8">

          {/* Header Row */}
          <div className="flex justify-between items-center gap-4 mb-8">
            {/* Left side: Logo & Title */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-2xl">
                <Link to={"/"}> <Flame className="w-8 h-8 text-white" /></Link>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                KABADDI LEAGUE
              </h1>
            </div>

            {/* Right side: Auth Buttons */}
            {user ? (
              <>
                <div className="flex items-center gap-4">
                  <Link to="/mymatches" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300">
                    Mymatches
                  </Link>
                  <div className="flex items-center gap-4">
                    <Link to="/create-match" className="p-3 bg-white/10 rounded-full hover:bg-white/20"><Plus className="w-6 h-6 text-white" /></Link>
                    <ProfileDropdown />
                  </div>
                </div>

              </>
            ) :
              (
                <>
                  <div className="flex items-center gap-4">
                    <Link to="/login" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300">
                      Login
                    </Link>
                    <Link to="/signup" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
                      Sign Up
                    </Link>
                  </div>
                </>
              )}


          </div>

          {/* Search Bar remains centered */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">

              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white z-5" />
              <input
                type="text"
                placeholder="Search for a team..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl py-4 pl-14 pr-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-6 pt-8 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center bg-white/5 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
            {['all', 'live', 'completed', 'upcoming', 'paused'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${activeFilter === filter
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-white/10'
                  }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Matches Section */}
      {loading ? (
        <div className="min-h-screen flex  items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white text-xl">
          <Loader2 className="animate-spin h-10 w-10  text-orange-500" />
          <span className='text-3xl'>Loading Matches...</span>
        </div>
      ) :
        (<div className="container mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match) => {
                const winner = getWinner(match);
                return (
                  <div key={match.id} onClick={() => navigate(`/scorecard/${match.id}`)} className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 border border-white/10 transition-all duration-500 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer">
                    <div className="flex justify-between items-center mb-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(match.status)}`}>
                        {match.status}
                      </span>
                      {(match.status === 'LIVE' || match.status === 'PAUSED') && (
                        <div className="flex items-center space-x-2 text-orange-400">
                          <Clock className="w-4 h-4" />
                          <span className="font-mono text-sm">{match.time}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className={`flex-1 text-center ${winner === 'team1' ? 'scale-105' : ''} transition-transform duration-300`}>
                        <div className="relative mb-3 inline-block">
                          <img src={match.team1.photo} alt={match.team1.name} className={`w-20 h-20 rounded-full mx-auto object-cover border-4 ${winner === 'team1' ? 'border-yellow-400' : 'border-white/20'}`} />
                          {winner === 'team1' && <Trophy className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 bg-slate-800 rounded-full p-1" />}
                        </div>
                        <h3 className={`font-bold mb-2 ${winner === 'team1' ? 'text-yellow-400' : 'text-white'}`}>{match.team1.name}</h3>
                        <div className={`text-4xl font-bold ${winner === 'team1' ? 'text-yellow-400' : 'text-orange-400'}`}>{match.status !== 'UPCOMING' ? match.team1.score : '-'}</div>
                      </div>

                      <div className="px-4">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-2">
                          <span className="text-white font-bold text-sm">VS</span>
                        </div>
                      </div>

                      <div className={`flex-1 text-center ${winner === 'team2' ? 'scale-105' : ''} transition-transform duration-300`}>
                        <div className="relative mb-3">
                          <img src={match.team2.photo} alt={match.team2.name} className={`w-20 h-20 rounded-full mx-auto object-cover border-4 ${winner === 'team2' ? 'border-yellow-400' : 'border-white/20'}`} />
                          {winner === 'team2' && <Trophy className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 bg-slate-800 rounded-full p-1" />}
                        </div>

                        <h3 className={`font-bold mb-2 ${winner === 'team2' ? 'text-yellow-400' : 'text-white'}`}>{match.team2.name}</h3>
                        <div className={`text-4xl font-bold ${winner === 'team2' ? 'text-yellow-400' : 'text-orange-400'}`}>{match.status !== 'UPCOMING' ? match.team2.score : '-'}</div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="flex items-center justify-center text-sm text-gray-300">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{match.venue}, {match.date}</span>
                      </div>
                      <div className="text-right text-gray-300 text-sm mt-1">
                        {`created by-${match.creatorName}`}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="lg:col-span-2 text-center py-16 bg-white/5 rounded-3xl">
                <h3 className="text-2xl font-bold text-white">No Matches Found</h3>
                <p className="text-gray-400 mt-2">Try adjusting your search or filter.</p>
              </div>
            )}
          </div>
        </div>)}
      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Join the Action</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't miss out on the most exciting Kabaddi matches of the season. Get your tickets now!
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Enjoy the Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
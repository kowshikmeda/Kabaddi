import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage'
import ScoreCard from './components/ScoreCard';
import PlayerProfile from './components/PlayerProfile';
import CreateMatch from './components/CreateMatch';
import UpdateMatch from './components/UpdateMatch';
import UserProfile from './components/UserProfile';

const App = () => {
  return (
   <Routes>
     
      <Route path="/" element={<LandingPage />} />
      <Route path="/scorecard" element={<ScoreCard />} />
      <Route path="/profile" element={<PlayerProfile/>} />
      <Route path="/new-match" element={<CreateMatch />} />
       <Route path="/update-match" element={<UpdateMatch />} />
       <Route path="/user-profile" element={<UserProfile/>} />


    </Routes>
  )
}

export default App
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Edit2, Save, X,Lock } from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    password: '********',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: '2022-03-15',
    bio: 'Passionate full-stack developer with 5+ years of experience creating innovative web solutions. Love working with React, Node.js, and modern web technologies.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const handleEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-8 relative">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              
              {/* Avatar Section */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full ring-4 ring-white/20 overflow-hidden shadow-2xl">
                  <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Basic Info */}
              <div className="text-center sm:text-left text-white flex-grow">
                <h1 className="text-4xl font-bold mb-2">{profileData.name}</h1>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm mt-4">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-300">{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-300">Joined {formatDate(profileData.joinDate)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-shrink-0">
                {!isEditing ? (
                  <button onClick={handleEdit} className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105">
                    <Edit2 className="w-5 h-5" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={handleSave} className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"><Save className="w-4 h-4" />Save</button>
                    <button onClick={handleCancel} className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"><X className="w-4 h-4" />Cancel</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Contact Information & Bio */}
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                <div className="space-y-4">
                  {['name', 'email','password', 'phone', 'location'].map(field => {
                    const icons = { name: User, email: Mail, phone: Phone,password: Lock, location: MapPin };
                    const Icon = icons[field];
                    return (
                      <div key={field}>
                        <label className="block text-sm font-semibold text-gray-400 mb-2 capitalize">{field}</label>
                        {isEditing ? (
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            value={tempData[field]}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-xl">
                            <Icon className="w-5 h-5 text-orange-400" />
                            <span className="text-gray-300 font-medium">{profileData[field]}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="lg:col-span-3">
                 <h2 className="text-2xl font-bold text-white mb-6">About Me</h2>
                 {isEditing ? (
                    <textarea
                      value={tempData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows="8"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 ">
                      <p className="text-gray-400 leading-relaxed">{profileData.bio}</p>
                    </div>
                  )}
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Camera, Edit2, Save, X, Building2, Globe } from 'lucide-react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    company: 'Tech Solutions Inc.',
    website: 'alexjohnson.dev',
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-cyan-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 px-8 py-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                
                {/* Avatar Section */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full ring-4 ring-white/30 overflow-hidden shadow-xl">
                    <img 
                      src={profileData.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Basic Info */}
                <div className="text-center sm:text-left text-white">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">{profileData.name}</h1>
                  <p className="text-white/80 text-lg mb-4">{profileData.company}</p>
                  <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {formatDate(profileData.joinDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="sm:ml-auto">
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 font-semibold"
                    >
                      <Edit2 className="w-5 h-5" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-500/20 backdrop-blur-sm hover:bg-green-500/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500/20 backdrop-blur-sm hover:bg-red-500/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  {/* Name */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-800 font-medium">{profileData.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={tempData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-800 font-medium">{profileData.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={tempData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-800 font-medium">{profileData.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-800 font-medium">{profileData.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Professional Information</h2>
                
                <div className="space-y-4">
                  {/* Company */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Company</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                        <Building2 className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-800 font-medium">{profileData.company}</span>
                      </div>
                    )}
                  </div>

                  {/* Website */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={tempData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                        <Globe className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-800 font-medium">{profileData.website}</span>
                      </div>
                    )}
                  </div>

                  {/* Join Date */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">Member Since</label>
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-800 font-medium">{formatDate(profileData.joinDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
              {isEditing ? (
                <textarea
                  value={tempData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Projects', value: '24', color: 'from-blue-500 to-blue-600' },
                  { label: 'Reviews', value: '4.9★', color: 'from-yellow-500 to-yellow-600' },
                  { label: 'Clients', value: '156', color: 'from-green-500 to-green-600' },
                  { label: 'Experience', value: '5+ Years', color: 'from-purple-500 to-purple-600' }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gradient-to-r rounded-xl text-white shadow-lg transform hover:scale-105 transition-all duration-200" style={{background: `linear-gradient(to right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})`}}>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
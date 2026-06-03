import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye,
  FiAward,
  FiCalendar,
  FiUser,
  FiStar,
  FiImage,
  FiFileText
} from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Achievements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const queryClient = useQueryClient();

  // Fetch achievements from API
  const { data: achievements, isLoading, error } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const response = await api.get('/achievements');
      return response.data;
    }
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'academic', label: 'Academic' },
    { value: 'sports', label: 'Sports' },
    { value: 'competition', label: 'Competition' },
    { value: 'recognition', label: 'Recognition' },
    { value: 'award', label: 'Award' },
    { value: 'other', label: 'Other' }
  ];

  const filteredAchievements = achievements?.filter(achievement => {
    const matchesCategory = categoryFilter === 'all' || achievement.category === categoryFilter;
    const matchesSearch = (achievement.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (achievement.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (achievement.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  // Add achievement mutation
  const addAchievementMutation = useMutation({
    mutationFn: async (achievementData) => {
      const response = await api.post('/achievements', achievementData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['achievements']);
      toast.success('Achievement added successfully!');
      setShowAddModal(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add achievement');
    }
  });

  // Update achievement mutation
  const updateAchievementMutation = useMutation({
    mutationFn: async ({ id, ...achievementData }) => {
      const response = await api.put(`/achievements/${id}`, achievementData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['achievements']);
      toast.success('Achievement updated successfully!');
      setEditingAchievement(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update achievement');
    }
  });

  // Delete achievement mutation
  const deleteAchievementMutation = useMutation({
    mutationFn: async (achievementId) => {
      await api.delete(`/achievements/${achievementId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['achievements']);
      toast.success('Achievement deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete achievement');
    }
  });

  const handleDelete = (achievementId) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      deleteAchievementMutation.mutate(achievementId);
    }
  };

  const AchievementForm = ({ achievement, onClose }) => {
    const [formData, setFormData] = useState({
      title: achievement?.title || '',
      description: achievement?.description || '',
      achievementDate: achievement?.achievementDate ? achievement.achievementDate.split('T')[0] : '',
      category: achievement?.category || 'academic',
      studentName: achievement?.studentName || '',
      studentClass: achievement?.studentClass || '',
      position: achievement?.position || '',
      competition: achievement?.competition || '',
      imageUrl: achievement?.imageUrl || '',
      certificateUrl: achievement?.certificateUrl || '',
      isPublished: achievement?.isPublished !== undefined ? achievement.isPublished : true,
      isFeatured: achievement?.isFeatured || false
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (achievement) {
        updateAchievementMutation.mutate({ id: achievement.id, ...formData });
      } else {
        addAchievementMutation.mutate(formData);
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <div className="mt-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {achievement ? 'Edit Achievement' : 'Add New Achievement'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Achievement Title *</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter achievement title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter achievement description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Achievement Date *</label>
                  <input
                    type="date"
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={formData.achievementDate}
                    onChange={(e) => setFormData({...formData, achievementDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.slice(1).map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Student Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    placeholder="Enter student name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Student Class</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={formData.studentClass}
                    onChange={(e) => setFormData({...formData, studentClass: e.target.value})}
                    placeholder="e.g., JSS 2A, SS 3B"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position/Rank</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    placeholder="e.g., 1st Place, Winner, Participant"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Competition/Event</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={formData.competition}
                    onChange={(e) => setFormData({...formData, competition: e.target.value})}
                    placeholder="Name of competition or event"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Achievement Image URL</label>
                <input
                  type="url"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Certificate URL</label>
                <input
                  type="url"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.certificateUrl}
                  onChange={(e) => setFormData({...formData, certificateUrl: e.target.value})}
                  placeholder="https://example.com/certificate.pdf"
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    className="h-4 w-4 text-blue-950 focus:ring-blue-950 border-gray-300 rounded"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Publish achievement (visible on website)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    className="h-4 w-4 text-blue-950 focus:ring-blue-950 border-gray-300 rounded"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                  />
                  <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Feature achievement (highlight on homepage)
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addAchievementMutation.isLoading || updateAchievementMutation.isLoading}
                  className="px-6 py-3 bg-blue-950 dark:bg-yellow-400 text-white dark:text-blue-950 rounded-lg hover:bg-blue-900 dark:hover:bg-yellow-500 font-medium disabled:opacity-50"
                >
                  {(addAchievementMutation.isLoading || updateAchievementMutation.isLoading) 
                    ? 'Saving...' 
                    : achievement ? 'Update' : 'Add'} Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading achievements</h3>
          <p className="text-red-600 text-sm mt-1">
            {error.response?.data?.message || 'Failed to load achievements'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Achievements Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage student achievements and recognitions
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-950 dark:bg-yellow-400 text-white dark:text-blue-950 rounded-lg hover:bg-blue-900 dark:hover:bg-yellow-500 font-medium"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Achievement
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search achievements..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FiFilter className="w-5 h-5 text-gray-400" />
            <select
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      {filteredAchievements.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <FiAward className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No achievements found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || categoryFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start by adding your first achievement'
            }
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-950 dark:bg-yellow-400 text-white dark:text-blue-950 rounded-lg hover:bg-blue-900 dark:hover:bg-yellow-500 font-medium"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Add First Achievement
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <div key={achievement.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
              {achievement.imageUrl && (
                <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                  <img
                    src={achievement.imageUrl}
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-2">{achievement.title}</h3>
                  {achievement.isFeatured && (
                    <FiStar className="w-5 h-5 text-yellow-500 ml-2 flex-shrink-0" />
                  )}
                </div>
                
                {achievement.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{achievement.description}</p>
                )}
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FiCalendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{new Date(achievement.achievementDate).toLocaleDateString()}</span>
                  </div>
                  
                  {achievement.studentName && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FiUser className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{achievement.studentName}</span>
                      {achievement.studentClass && (
                        <span className="ml-1">- {achievement.studentClass}</span>
                      )}
                    </div>
                  )}
                  
                  {achievement.position && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FiAward className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{achievement.position}</span>
                      {achievement.competition && (
                        <span className="ml-1">in {achievement.competition}</span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 capitalize">
                      {achievement.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      {!achievement.isPublished && (
                        <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Draft</span>
                      )}
                      {achievement.certificateUrl && (
                        <FiFileText className="w-4 h-4 text-blue-600 dark:text-blue-400" title="Has Certificate" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => setSelectedAchievement(achievement)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                    title="View Details"
                  >
                    <FiEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingAchievement(achievement)}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 p-1"
                    title="Edit"
                  >
                    <FiEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(achievement.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                    title="Delete"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Achievement Modal */}
      {(showAddModal || editingAchievement) && (
        <AchievementForm
          achievement={editingAchievement}
          onClose={() => {
            setShowAddModal(false);
            setEditingAchievement(null);
          }}
        />
      )}

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Achievement Details</h3>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {selectedAchievement.imageUrl && (
                  <img
                    src={selectedAchievement.imageUrl}
                    alt={selectedAchievement.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedAchievement.title}</h2>
                    {selectedAchievement.isFeatured && (
                      <FiStar className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 capitalize">
                      {selectedAchievement.category}
                    </span>
                    {selectedAchievement.certificateUrl && (
                      <a
                        href={selectedAchievement.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800"
                      >
                        <FiFileText className="w-4 h-4 mr-1" />
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>

                {selectedAchievement.description && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedAchievement.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Achievement Date</h4>
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <FiCalendar className="w-4 h-4 mr-2" />
                      <span>{new Date(selectedAchievement.achievementDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {selectedAchievement.studentName && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Student</h4>
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <FiUser className="w-4 h-4 mr-2" />
                        <span>{selectedAchievement.studentName}</span>
                        {selectedAchievement.studentClass && (
                          <span className="ml-1">- {selectedAchievement.studentClass}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {(selectedAchievement.position || selectedAchievement.competition) && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Competition Details</h4>
                    <div className="space-y-2">
                      {selectedAchievement.position && (
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <FiAward className="w-4 h-4 mr-2" />
                          <span>Position: {selectedAchievement.position}</span>
                        </div>
                      )}
                      {selectedAchievement.competition && (
                        <div className="text-gray-700 dark:text-gray-300">
                          <span>Competition: {selectedAchievement.competition}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>Created: {new Date(selectedAchievement.createdAt).toLocaleDateString()}</p>
                  {selectedAchievement.creator && (
                    <p>By: {selectedAchievement.creator.name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import { 
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiBookOpen,
  FiSave,
  FiRefreshCw
} from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Statistics = () => {
  const [formData, setFormData] = useState({});
  const queryClient = useQueryClient();

  // Fetch statistics from API
  const { data: statistics, isLoading, error } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const response = await api.get('/statistics');
      return response.data;
    },
    onSuccess: (data) => {
      // Initialize form data with current values
      const initialData = {};
      data.forEach(stat => {
        initialData[stat.key] = {
          value: stat.value,
          label: stat.label,
          description: stat.description
        };
      });
      setFormData(initialData);
    }
  });

  // Update statistics mutation
  const updateStatisticsMutation = useMutation({
    mutationFn: async (statisticsData) => {
      const response = await api.put('/statistics/bulk', { statistics: statisticsData });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['statistics']);
      toast.success('Statistics updated successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update statistics');
    }
  });

  const handleInputChange = (key, field, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const statisticsArray = Object.entries(formData).map(([key, data]) => ({
      key,
      value: data.value,
      label: data.label,
      description: data.description
    }));

    updateStatisticsMutation.mutate(statisticsArray);
  };

  const getIcon = (key) => {
    const icons = {
      students_enrolled: FiUsers,
      years_experience: FiTrendingUp,
      programs_offered: FiBookOpen,
      graduates_annually: FiAward,
      teachers: FiUsers,
      facilities: FiBookOpen
    };
    return icons[key] || FiTrendingUp;
  };

  const getColor = (key) => {
    const colors = {
      students_enrolled: 'bg-blue-500',
      years_experience: 'bg-green-500',
      programs_offered: 'bg-purple-500',
      graduates_annually: 'bg-yellow-500',
      teachers: 'bg-red-500',
      facilities: 'bg-indigo-500'
    };
    return colors[key] || 'bg-gray-500';
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading statistics</h3>
          <p className="text-red-600 text-sm mt-1">
            {error.response?.data?.message || 'Failed to load statistics'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Website Statistics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Update the numbers displayed on your website's achievement section
        </p>
      </div>

      {/* Current Statistics Preview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statistics?.map((stat) => {
            const Icon = getIcon(stat.key);
            const colorClass = getColor(stat.key);
            
            return (
              <div key={stat.key} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                    {stat.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{stat.description}</p>
                    )}
                  </div>
                  <div className={`${colorClass} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Update Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Update Statistics</h2>
          <button
            onClick={() => queryClient.invalidateQueries(['statistics'])}
            className="inline-flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <FiRefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statistics?.map((stat) => {
              const Icon = getIcon(stat.key);
              const colorClass = getColor(stat.key);
              
              return (
                <div key={stat.key} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className={`${colorClass} p-2 rounded-lg mr-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white capitalize">
                      {stat.key.replace(/_/g, ' ')}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Value (Number)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={formData[stat.key]?.value || ''}
                        onChange={(e) => handleInputChange(stat.key, 'value', e.target.value)}
                        placeholder="e.g., 500+, 15+, 6+"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Label
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={formData[stat.key]?.label || ''}
                        onChange={(e) => handleInputChange(stat.key, 'label', e.target.value)}
                        placeholder="e.g., Students Enrolled"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description (Optional)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        value={formData[stat.key]?.description || ''}
                        onChange={(e) => handleInputChange(stat.key, 'description', e.target.value)}
                        placeholder="e.g., Enrolled across all programs"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              type="submit"
              disabled={updateStatisticsMutation.isLoading}
              className="inline-flex items-center px-6 py-3 bg-blue-950 dark:bg-yellow-400 text-white dark:text-blue-950 rounded-lg hover:bg-blue-900 dark:hover:bg-yellow-500 font-medium disabled:opacity-50"
            >
              {updateStatisticsMutation.isLoading ? (
                <>
                  <FiRefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4 mr-2" />
                  Update Statistics
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">How to use</h3>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <p>• <strong>Value:</strong> The number to display (e.g., "500+", "15+", "6+")</p>
          <p>• <strong>Label:</strong> The text that appears below the number (e.g., "Students Enrolled")</p>
          <p>• <strong>Description:</strong> Additional text that appears below the label (optional)</p>
          <p>• These statistics will appear in the "Our Achievements" section of your website</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
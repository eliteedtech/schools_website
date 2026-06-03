import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import { 
  FiSearch, 
  FiFilter, 
  FiMail, 
  FiPhone, 
  FiUser,
  FiCalendar,
  FiMessageSquare,
  FiCornerUpLeft,
  FiArchive,
  FiTrash2,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiPlus
} from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Contact = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const queryClient = useQueryClient();

  // Fetch contact messages from API
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const response = await api.get('/contact');
      return response.data;
    }
  });

  const statusOptions = [
    { value: 'all', label: 'All Messages' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
    { value: 'replied', label: 'Replied' }
  ];

  const filteredMessages = messages?.filter(message => {
    const matchesSearch = (message.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (message.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (message.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (message.message || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  // Update message status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ messageId, status }) => {
      const response = await api.put(`/contact/${messageId}`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contact-messages']);
      toast.success('Message status updated');
    },
    onError: () => {
      toast.error('Failed to update message status');
    }
  });

  // Delete message mutation
  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId) => {
      await api.delete(`/contact/${messageId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contact-messages']);
      toast.success('Message deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete message');
    }
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      unread: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: FiAlertCircle },
      read: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200', icon: FiEye },
      replied: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: FiCheckCircle }
    };

    const config = statusConfig[status] || statusConfig.unread;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const handleStatusUpdate = (messageId, newStatus) => {
    updateStatusMutation.mutate({ messageId, status: newStatus });
  };

  const handleDelete = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessageMutation.mutate(messageId);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading messages</h3>
          <p className="text-red-600 text-sm mt-1">
            {error.response?.data?.message || 'Failed to load messages'}
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage contact inquiries from website visitors
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Unread: {messages?.filter(m => m.status === 'unread').length || 0}
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Replied: {messages?.filter(m => m.status === 'replied').length || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search messages..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <FiMessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No messages found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'No contact messages have been received yet'
            }
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMessages.map((message) => (
              <div key={message.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <FiUser className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                            {message.name}
                          </h3>
                          {getStatusBadge(message.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span className="flex items-center">
                            <FiMail className="w-4 h-4 mr-1" />
                            {message.email}
                          </span>
                          {message.phone && (
                            <span className="flex items-center">
                              <FiPhone className="w-4 h-4 mr-1" />
                              {message.phone}
                            </span>
                          )}
                          <span className="flex items-center">
                            <FiCalendar className="w-4 h-4 mr-1" />
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-13">
                      <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                        {message.subject}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {message.message}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setSelectedMessage(message)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900"
                      title="View Details"
                    >
                      <FiEye className="w-5 h-5" />
                    </button>
                    {message.status === 'unread' && (
                      <button
                        onClick={() => handleStatusUpdate(message.id, 'read')}
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                        title="Mark as Read"
                      >
                        <FiCheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900"
                      title="Delete"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Message Details</h3>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedMessage.subject}</h4>
                    <div className="flex items-center space-x-2 mt-2">
                      {getStatusBadge(selectedMessage.status)}
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <p className="text-base text-gray-900 dark:text-white">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <p className="text-base text-gray-900 dark:text-white">{selectedMessage.email}</p>
                  </div>
                  {selectedMessage.phone && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                      <p className="text-base text-gray-900 dark:text-white">{selectedMessage.phone}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Received</label>
                    <p className="text-base text-gray-900 dark:text-white">
                      {new Date(selectedMessage.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Message</label>
                  <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <p className="text-gray-900 dark:text-white whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex space-x-3">
                    {selectedMessage.status === 'unread' && (
                      <button
                        onClick={() => {
                          handleStatusUpdate(selectedMessage.id, 'read');
                          setSelectedMessage({ ...selectedMessage, status: 'read' });
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
                      >
                        <FiCheckCircle className="w-4 h-4 mr-2" />
                        Mark as Read
                      </button>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Contact the sender directly via email or phone
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
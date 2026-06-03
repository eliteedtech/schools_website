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
  FiCalendar,
  FiClock,
  FiMapPin,
  FiImage,
  FiUpload,
  FiTag,
  FiRefreshCw
} from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const queryClient = useQueryClient();

  // Fetch events from API
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await api.get('/events');
      return response.data;
    }
  });

  const statuses = [
    { value: 'all', label: 'All Announcements' },
    { value: 'NOW ON SALE', label: 'Now On Sale' },
    { value: 'ONGOING', label: 'Ongoing' },
    { value: 'AVAILABLE', label: 'Available' },
    { value: 'CLOSED', label: 'Closed' },
    { value: 'COMING SOON', label: 'Coming Soon' }
  ];

  const priorities = [
    { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' }
  ];

  const filteredEvents = events?.filter(event => {
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesSearch = (event.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  }) || [];

  // Add event mutation
  const addEventMutation = useMutation({
    mutationFn: async (eventData) => {
      const response = await api.post('/events', eventData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      toast.success('Event added successfully!');
      setShowAddModal(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add event');
    }
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async ({ id, ...eventData }) => {
      const response = await api.put(`/events/${id}`, eventData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      toast.success('Event updated successfully!');
      setEditingEvent(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update event');
    }
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (eventId) => {
      await api.delete(`/events/${eventId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      toast.success('Event deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete event');
    }
  });

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEventMutation.mutate(eventId);
    }
  };

  const EventForm = ({ event, onClose }) => {
    const [formData, setFormData] = useState({
      title: event?.title || '',
      description: event?.description || '',
      status: event?.status || 'AVAILABLE',
      priority: event?.priority || 'medium',
      startDate: event?.startDate ? event.startDate.split('T')[0] : '',
      endDate: event?.endDate ? event.endDate.split('T')[0] : '',
      link: event?.link || '',
      imageUrl: event?.imageUrl || '',
      isPublished: event?.isPublished !== undefined ? event.isPublished : true
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (event) {
        updateEventMutation.mutate({ id: event.id, ...formData });
      } else {
        addEventMutation.mutate(formData);
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <div className="mt-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {event ? 'Edit Announcement' : 'Add New Announcement'}
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Announcement Title *</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., 2025/2026 Session e-Application Form"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
                <textarea
                  rows={4}
                  required
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="e.g., Get your application form for the upcoming academic session"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status *</label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    {statuses.slice(1).map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                  <select
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Link (Optional)</label>
                <input
                  type="url"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  placeholder="https://example.com/application-form"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image URL (Optional)</label>
                <input
                  type="url"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  className="h-4 w-4 text-blue-950 focus:ring-blue-950 border-gray-300 rounded"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                />
                <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Publish announcement (visible on website)
                </label>
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
                  disabled={addEventMutation.isLoading || updateEventMutation.isLoading}
                  className="px-6 py-3 bg-blue-950 dark:bg-yellow-400 text-white dark:text-blue-950 rounded-lg hover:bg-blue-900 dark:hover:bg-yellow-500 font-medium disabled:opacity-50"
                >
                  {(addEventMutation.isLoading || updateEventMutation.isLoading) 
                    ? 'Saving...' 
                    : event ? 'Update' : 'Add'} Announcement
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
          <h3 className="text-red-800 font-medium">Error loading events</h3>
          <p className="text-red-600 text-sm mt-1">
            {error.response?.data?.message || 'Failed to load events'}
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Announcements & Events</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage school announcements and upcoming events
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-950 dark:bg-yellow-400 text-white dark:text-blue-950 rounded-lg hover:bg-blue-900 dark:hover:bg-yellow-500 font-medium"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add Announcement
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
                placeholder="Search announcements..."
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
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <FiCalendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No announcements found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start by adding your first announcement'
            }
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-950 dark:bg-yellow-400 text-white dark:text-blue-950 rounded-lg hover:bg-blue-900 dark:hover:bg-yellow-500 font-medium"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Add First Announcement
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const priorityColor = priorities.find(p => p.value === event.priority)?.color || 'bg-gray-100 text-gray-800';
            const statusColor = 
              event.status === 'NOW ON SALE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              event.status === 'ONGOING' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              event.status === 'AVAILABLE' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
              event.status === 'CLOSED' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' :
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';

            return (
              <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                {event.imageUrl && (
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-2">{event.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${statusColor}`}>
                      {event.status}
                    </span>
                  </div>
                  
                  {event.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    {(event.startDate || event.endDate) && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <FiCalendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>
                          {event.startDate && new Date(event.startDate).toLocaleDateString()}
                          {event.startDate && event.endDate && ' - '}
                          {event.endDate && new Date(event.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {event.link && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <FiMapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 truncate">
                          View Link
                        </a>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColor}`}>
                        {event.priority} priority
                      </span>
                      {!event.isPublished && (
                        <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">Draft</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                      title="View Details"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 p-1"
                      title="Edit"
                    >
                      <FiEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {(showAddModal || editingEvent) && (
        <EventForm
          event={editingEvent}
          onClose={() => {
            setShowAddModal(false);
            setEditingEvent(null);
          }}
        />
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Announcement Details</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {selectedEvent.imageUrl && (
                  <img
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedEvent.title}</h2>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      selectedEvent.status === 'NOW ON SALE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      selectedEvent.status === 'ONGOING' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      selectedEvent.status === 'AVAILABLE' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      selectedEvent.status === 'CLOSED' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {selectedEvent.status}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      priorities.find(p => p.value === selectedEvent.priority)?.color || 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedEvent.priority} priority
                    </span>
                  </div>
                </div>

                {selectedEvent.description && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedEvent.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(selectedEvent.startDate || selectedEvent.endDate) && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Duration</h4>
                      <div className="space-y-2">
                        {selectedEvent.startDate && (
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <FiCalendar className="w-4 h-4 mr-2" />
                            <span>Start: {new Date(selectedEvent.startDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {selectedEvent.endDate && (
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <FiCalendar className="w-4 h-4 mr-2" />
                            <span>End: {new Date(selectedEvent.endDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {selectedEvent.link && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Link</h4>
                      <div className="flex items-center text-gray-700 dark:text-gray-300">
                        <FiMapPin className="w-4 h-4 mr-2" />
                        <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 break-all">
                          {selectedEvent.link}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <p>Created: {new Date(selectedEvent.createdAt).toLocaleDateString()}</p>
                  {selectedEvent.creator && (
                    <p>By: {selectedEvent.creator.name}</p>
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

export default Events;
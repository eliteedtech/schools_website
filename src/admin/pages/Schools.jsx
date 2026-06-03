import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  School,
  Users,
  MapPin,
  Calendar,
  Globe,
  Palette,
  Settings,
  Copy,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Schools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [editingSchool, setEditingSchool] = useState(null);
  const queryClient = useQueryClient();

  // Mock data - replace with actual API call
  const { data: schools, isLoading } = useQuery('schools', async () => {
    return [
      {
        id: 1,
        name: 'Dr. Kabiru Gwarzo Academy',
        slug: 'dr-kabiru-gwarzo-academy',
        location: 'Kano, Nigeria',
        address: 'No. 123 Ahmadu Bello Way, Kano State, Nigeria',
        phone: '+234 XXX XXX XXXX',
        email: 'info@drkgacademy.edu.ng',
        website: 'https://drkgacademy.edu.ng',
        status: 'active',
        students: 450,
        staff: 35,
        admins: 3,
        createdAt: '2024-01-15T00:00:00Z',
        lastActive: '2025-02-04T10:30:00Z',
        templateId: null,
        theme: {
          primaryColor: '#3B82F6',
          secondaryColor: '#10B981',
          logo: '/api/uploads/schools/1/logo.png'
        },
        subscription: {
          plan: 'premium',
          status: 'active',
          expiresAt: '2025-12-31T23:59:59Z'
        }
      },
      {
        id: 2,
        name: 'Al-Hikmah Islamic School',
        slug: 'al-hikmah-islamic-school',
        location: 'Lagos, Nigeria',
        address: 'No. 456 Victoria Island, Lagos State, Nigeria',
        phone: '+234 XXX XXX XXXX',
        email: 'info@alhikmah.edu.ng',
        website: 'https://alhikmah.edu.ng',
        status: 'active',
        students: 320,
        staff: 28,
        admins: 2,
        createdAt: '2024-03-20T00:00:00Z',
        lastActive: '2025-02-03T14:20:00Z',
        templateId: 1,
        theme: {
          primaryColor: '#059669',
          secondaryColor: '#DC2626',
          logo: '/api/uploads/schools/2/logo.png'
        },
        subscription: {
          plan: 'standard',
          status: 'active',
          expiresAt: '2025-08-20T23:59:59Z'
        }
      },
      {
        id: 3,
        name: 'Madinah Academy',
        slug: 'madinah-academy',
        location: 'Abuja, Nigeria',
        address: 'No. 789 Garki District, Abuja, Nigeria',
        phone: '+234 XXX XXX XXXX',
        email: 'info@madinahacademy.edu.ng',
        website: 'https://madinahacademy.edu.ng',
        status: 'inactive',
        students: 180,
        staff: 15,
        admins: 1,
        createdAt: '2024-06-10T00:00:00Z',
        lastActive: '2025-01-28T09:15:00Z',
        templateId: 1,
        theme: {
          primaryColor: '#7C3AED',
          secondaryColor: '#F59E0B',
          logo: '/api/uploads/schools/3/logo.png'
        },
        subscription: {
          plan: 'basic',
          status: 'expired',
          expiresAt: '2025-01-31T23:59:59Z'
        }
      }
    ];
  });

  const statusOptions = [
    { value: 'all', label: 'All Schools' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const filteredSchools = schools?.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || school.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const deleteSchoolMutation = useMutation(
    async (schoolId) => {
      // API call to delete school
      console.log('Deleting school:', schoolId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('schools');
        toast.success('School deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete school');
      }
    }
  );

  const duplicateSchoolMutation = useMutation(
    async (schoolId) => {
      // API call to duplicate school
      console.log('Duplicating school:', schoolId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('schools');
        toast.success('School duplicated successfully');
      },
      onError: () => {
        toast.error('Failed to duplicate school');
      }
    }
  );

  const handleDelete = (schoolId) => {
    if (window.confirm('Are you sure you want to delete this school? This action cannot be undone.')) {
      deleteSchoolMutation.mutate(schoolId);
    }
  };

  const handleDuplicate = (schoolId) => {
    duplicateSchoolMutation.mutate(schoolId);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      inactive: { color: 'bg-red-100 text-red-800', icon: XCircle },
      suspended: { color: 'bg-yellow-100 text-yellow-800', icon: Clock }
    };

    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.toUpperCase()}
      </span>
    );
  };

  const getSubscriptionBadge = (subscription) => {
    const isExpired = new Date(subscription.expiresAt) < new Date();
    const color = subscription.status === 'active' && !isExpired 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {subscription.plan.toUpperCase()}
      </span>
    );
  };

  const SchoolForm = ({ school, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: school?.name || '',
      location: school?.location || '',
      address: school?.address || '',
      phone: school?.phone || '',
      email: school?.email || '',
      website: school?.website || '',
      templateId: school?.templateId || null
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {school ? 'Edit School' : 'Add New School'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">School Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Template (Optional)</label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.templateId || ''}
                  onChange={(e) => setFormData({...formData, templateId: e.target.value || null})}
                >
                  <option value="">Create from scratch</option>
                  <option value="1">Dr. Kabiru Gwarzo Academy Template</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Select a template to copy design and structure from an existing school
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {school ? 'Update' : 'Create'} School
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading schools..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schools Management</h1>
          <p className="text-gray-600">Manage all schools in the system</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New School
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search schools..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

      {/* Schools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <div key={school.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="h-12 w-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: school.theme.primaryColor + '20' }}
                  >
                    <School className="h-6 w-6" style={{ color: school.theme.primaryColor }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {school.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusBadge(school.status)}
                  {getSubscriptionBadge(school.subscription)}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium text-gray-900">{school.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Staff:</span>
                  <span className="font-medium text-gray-900">{school.staff}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Admins:</span>
                  <span className="font-medium text-gray-900">{school.admins}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(school.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Last active: {new Date(school.lastActive).toLocaleDateString()}</span>
                {school.templateId && (
                  <span className="flex items-center">
                    <Copy className="w-3 h-3 mr-1" />
                    Template
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedSchool(school)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingSchool(school)}
                    className="text-gray-600 hover:text-gray-800"
                    title="Edit School"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <Link
                    to={`/themes/${school.id}`}
                    className="text-purple-600 hover:text-purple-800"
                    title="Customize Theme"
                  >
                    <Palette className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDuplicate(school.id)}
                    className="text-green-600 hover:text-green-800"
                    title="Duplicate School"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <a
                    href={school.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                    title="Visit Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(school.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete School"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit School Modal */}
      {(showAddModal || editingSchool) && (
        <SchoolForm
          school={editingSchool}
          onClose={() => {
            setShowAddModal(false);
            setEditingSchool(null);
          }}
          onSubmit={(formData) => {
            console.log('School form submitted:', formData);
            setShowAddModal(false);
            setEditingSchool(null);
            toast.success(editingSchool ? 'School updated successfully' : 'School created successfully');
          }}
        />
      )}

      {/* School Detail Modal */}
      {selectedSchool && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">School Details</h3>
                <button
                  onClick={() => setSelectedSchool(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div 
                    className="h-16 w-16 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: selectedSchool.theme.primaryColor + '20' }}
                  >
                    <School className="h-8 w-8" style={{ color: selectedSchool.theme.primaryColor }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedSchool.name}</h2>
                    <p className="text-gray-600">{selectedSchool.location}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusBadge(selectedSchool.status)}
                      {getSubscriptionBadge(selectedSchool.subscription)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSchool.address}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSchool.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSchool.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <a 
                        href={selectedSchool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        {selectedSchool.website}
                      </a>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Students</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSchool.students}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Staff Members</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSchool.staff}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Admin Users</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedSchool.admins}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created Date</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedSchool.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Details</label>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Plan:</span>
                        <span className="ml-2 font-medium text-gray-900 capitalize">
                          {selectedSchool.subscription.plan}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className="ml-2 font-medium text-gray-900 capitalize">
                          {selectedSchool.subscription.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Expires:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {new Date(selectedSchool.subscription.expiresAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <Link
                      to={`/themes/${selectedSchool.id}`}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                      <Palette className="w-4 h-4 mr-2" />
                      Customize Theme
                    </Link>
                    <button
                      onClick={() => handleDuplicate(selectedSchool.id)}
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </button>
                  </div>
                  <a
                    href={selectedSchool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schools;
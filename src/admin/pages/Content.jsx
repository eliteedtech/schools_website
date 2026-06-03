import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import { 
  FiEdit, 
  FiSave, 
  FiUpload, 
  FiImage,
  FiType,
  FiFileText,
  FiGlobe,
  FiEye,
  FiRotateCcw,
  FiPlus,
  FiTrash2,
  FiHome,
  FiInfo,
  FiUsers,
  FiPhone,
  FiSettings
} from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Content = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [editingField, setEditingField] = useState(null);
  const [tempValues, setTempValues] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const queryClient = useQueryClient();

  // Fetch website content from API
  const { data: content, isLoading, error } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      const response = await api.get('/content');
      return response.data;
    }
  });

  // Update content mutation
  const updateContentMutation = useMutation({
    mutationFn: async ({ section, field, value }) => {
      const response = await api.put(`/content/${section}`, { [field]: value });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['content']);
      toast.success('Content updated successfully!');
      setEditingField(null);
      setTempValues({});
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update content');
    }
  });

  // Upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      const { section, field } = variables.get('metadata') ? JSON.parse(variables.get('metadata')) : {};
      if (section && field) {
        updateContentMutation.mutate({ section, field, value: data.url });
      }
      setUploadingImage(false);
      toast.success('Image uploaded successfully!');
    },
    onError: () => {
      setUploadingImage(false);
      toast.error('Failed to upload image');
    }
  });

  const handleEdit = (section, field, currentValue) => {
    setEditingField(`${section}.${field}`);
    setTempValues({ [field]: currentValue });
  };

  const handleSave = (section, field) => {
    const value = tempValues[field];
    updateContentMutation.mutate({ section, field, value });
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValues({});
  };

  const handleImageUpload = (section, field, file) => {
    if (!file) return;
    
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify({ section, field }));
    
    uploadImageMutation.mutate(formData);
  };

  const sections = [
    { id: 'hero', name: 'Hero Section', icon: FiHome, description: 'Main banner and carousel' },
    { id: 'about', name: 'About Us', icon: FiInfo, description: 'School information and mission' },
    { id: 'programs', name: 'Programs', icon: FiFileText, description: 'Academic programs and courses' },
    { id: 'staff', name: 'Staff Section', icon: FiUsers, description: 'Staff section content' },
    { id: 'gallery', name: 'Gallery Section', icon: FiImage, description: 'Gallery section settings' },
    { id: 'contact', name: 'Contact Info', icon: FiPhone, description: 'Contact information' },
    { id: 'footer', name: 'Footer', icon: FiSettings, description: 'Footer content and links' }
  ];

  const renderEditableField = (section, field, value, type = 'text', options = {}) => {
    const fieldKey = `${section}.${field}`;
    const isEditing = editingField === fieldKey;
    const tempValue = tempValues[field] !== undefined ? tempValues[field] : value;

    if (isEditing) {
      return (
        <div className="space-y-3">
          {type === 'textarea' ? (
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={options.rows || 4}
              value={tempValue || ''}
              onChange={(e) => setTempValues({ ...tempValues, [field]: e.target.value })}
              placeholder={options.placeholder}
            />
          ) : type === 'array' ? (
            <div className="space-y-2">
              {(tempValue || []).map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    value={item}
                    onChange={(e) => {
                      const newArray = [...tempValue];
                      newArray[index] = e.target.value;
                      setTempValues({ ...tempValues, [field]: newArray });
                    }}
                  />
                  <button
                    onClick={() => {
                      const newArray = tempValue.filter((_, i) => i !== index);
                      setTempValues({ ...tempValues, [field]: newArray });
                    }}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newArray = [...(tempValue || []), ''];
                  setTempValues({ ...tempValues, [field]: newArray });
                }}
                className="inline-flex items-center text-blue-950 dark:text-yellow-400 hover:text-blue-800 dark:hover:text-yellow-500 text-sm font-medium"
              >
                <FiPlus className="w-4 h-4 mr-1" />
                Add Item
              </button>
            </div>
          ) : (
            <input
              type={type}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={tempValue || ''}
              onChange={(e) => setTempValues({ ...tempValues, [field]: e.target.value })}
              placeholder={options.placeholder}
            />
          )}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleSave(section, field)}
              disabled={updateContentMutation.isLoading}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:opacity-50"
            >
              <FiSave className="w-4 h-4 mr-2" />
              {updateContentMutation.isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
            >
              <FiRotateCcw className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="group relative">
        <div className="min-h-[3rem] p-3 border border-transparent rounded-lg hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          {type === 'array' ? (
            <ul className="list-disc list-inside space-y-1">
              {(value || []).map((item, index) => (
                <li key={index} className="text-gray-900 dark:text-white">{item}</li>
              ))}
            </ul>
          ) : (
            <span className="text-gray-900 dark:text-white whitespace-pre-wrap">{value || 'Click to edit...'}</span>
          )}
        </div>
        <button
          onClick={() => handleEdit(section, field, value)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-blue-950 dark:text-yellow-400 hover:text-blue-800 dark:hover:text-yellow-500 transition-opacity"
        >
          <FiEdit className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const renderImageField = (section, field, value, label) => {
    return (
      <div className="space-y-4">
        <div className="relative">
          {value ? (
            <img
              src={value}
              alt={label}
              className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center">
              <FiImage className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <label className="cursor-pointer">
              <div className="inline-flex items-center px-4 py-2 bg-blue-950 dark:bg-yellow-400 text-white dark:text-blue-950 rounded-lg hover:bg-blue-900 dark:hover:bg-yellow-500 font-medium">
                <FiUpload className="w-4 h-4 mr-2" />
                {uploadingImage ? 'Uploading...' : 'Change Image'}
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(section, field, e.target.files[0])}
                disabled={uploadingImage}
              />
            </label>
          </div>
        </div>
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          value={value || ''}
          readOnly
          placeholder="Image URL will appear here"
        />
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
          <h3 className="text-red-800 font-medium">Error loading content</h3>
          <p className="text-red-600 text-sm mt-1">
            {error.response?.data?.message || 'Failed to load website content'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Website Content</h2>
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-start p-4 text-left rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-950 text-white dark:bg-yellow-400 dark:text-blue-950'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{section.name}</div>
                    <div className={`text-sm mt-1 ${
                      activeSection === section.id 
                        ? 'text-blue-100 dark:text-blue-800' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {section.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Edit your Dr. Kabiru Gwarzo Academy website content
              </p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              <FiEye className="w-4 h-4 mr-2" />
              Preview Website
            </a>
          </div>

          {/* Hero Section */}
          {activeSection === 'hero' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hero Section</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Main Title</label>
                      {renderEditableField('hero', 'title', content?.hero?.title, 'text', { placeholder: 'Enter main title' })}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Subtitle</label>
                      {renderEditableField('hero', 'subtitle', content?.hero?.subtitle, 'text', { placeholder: 'Enter subtitle' })}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Description</label>
                      {renderEditableField('hero', 'description', content?.hero?.description, 'textarea', { rows: 4, placeholder: 'Enter hero description' })}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Button Text</label>
                        {renderEditableField('hero', 'ctaText', content?.hero?.ctaText, 'text', { placeholder: 'Apply Now' })}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Button Link</label>
                        {renderEditableField('hero', 'ctaLink', content?.hero?.ctaLink, 'text', { placeholder: '/apply' })}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Hero Background Images</label>
                    <div className="space-y-4">
                      {renderImageField('hero', 'backgroundImage1', content?.hero?.backgroundImage1, 'Hero Image 1')}
                      {renderImageField('hero', 'backgroundImage2', content?.hero?.backgroundImage2, 'Hero Image 2')}
                      {renderImageField('hero', 'backgroundImage3', content?.hero?.backgroundImage3, 'Hero Image 3')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* About Section */}
          {activeSection === 'about' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About Us Section</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Section Title</label>
                      {renderEditableField('about', 'title', content?.about?.title, 'text', { placeholder: 'About Our School' })}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Description</label>
                      {renderEditableField('about', 'description', content?.about?.description, 'textarea', { rows: 5, placeholder: 'Enter about description' })}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Mission Statement</label>
                      {renderEditableField('about', 'mission', content?.about?.mission, 'textarea', { rows: 4, placeholder: 'Enter mission statement' })}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Vision Statement</label>
                      {renderEditableField('about', 'vision', content?.about?.vision, 'textarea', { rows: 4, placeholder: 'Enter vision statement' })}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Core Values</label>
                      {renderEditableField('about', 'values', content?.about?.values || [], 'array')}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">About Image</label>
                      {renderImageField('about', 'image', content?.about?.image, 'About Us Image')}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Principal Image</label>
                      {renderImageField('about', 'principalImage', content?.about?.principalImage, 'Principal Image')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">School Address</label>
                      {renderEditableField('contact', 'address', content?.contact?.address, 'textarea', { rows: 3, placeholder: 'Enter school address' })}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Phone Number</label>
                      {renderEditableField('contact', 'phone', content?.contact?.phone, 'tel', { placeholder: '+234 XXX XXX XXXX' })}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Email Address</label>
                      {renderEditableField('contact', 'email', content?.contact?.email, 'email', { placeholder: 'info@drkgacademy.edu.ng' })}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Working Hours</label>
                      {renderEditableField('contact', 'workingHours', content?.contact?.workingHours, 'text', { placeholder: 'Monday - Friday: 8:00 AM - 4:00 PM' })}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Google Maps Embed URL</label>
                      {renderEditableField('contact', 'mapEmbedUrl', content?.contact?.mapEmbedUrl, 'url', { placeholder: 'https://maps.google.com/embed?...' })}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Social Media Links</label>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Facebook</label>
                          {renderEditableField('contact', 'facebook', content?.contact?.facebook, 'url', { placeholder: 'https://facebook.com/drkgacademy' })}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Twitter</label>
                          {renderEditableField('contact', 'twitter', content?.contact?.twitter, 'url', { placeholder: 'https://twitter.com/drkgacademy' })}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Instagram</label>
                          {renderEditableField('contact', 'instagram', content?.contact?.instagram, 'url', { placeholder: 'https://instagram.com/drkgacademy' })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add more sections as needed */}
          {activeSection === 'programs' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Programs Section</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Programs Title</label>
                  {renderEditableField('programs', 'title', content?.programs?.title, 'text', { placeholder: 'Our Programs' })}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Programs Description</label>
                  {renderEditableField('programs', 'description', content?.programs?.description, 'textarea', { rows: 4, placeholder: 'Enter programs description' })}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'footer' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Footer Content</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">School Name</label>
                  {renderEditableField('footer', 'schoolName', content?.footer?.schoolName, 'text', { placeholder: 'Dr. Kabiru Gwarzo Academy' })}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tagline</label>
                  {renderEditableField('footer', 'tagline', content?.footer?.tagline, 'text', { placeholder: 'Excellence in Islamic Education' })}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Copyright Text</label>
                  {renderEditableField('footer', 'copyright', content?.footer?.copyright, 'text', { placeholder: '© 2025 Dr. Kabiru Gwarzo Academy. All rights reserved.' })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
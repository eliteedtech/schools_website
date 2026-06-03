import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Palette, 
  Upload, 
  Save, 
  Eye, 
  RotateCcw,
  Image as ImageIcon,
  Type,
  Layout,
  Settings,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Themes = () => {
  const { schoolId } = useParams();
  const [activeTab, setActiveTab] = useState('colors');
  const [previewMode, setPreviewMode] = useState('desktop');
  const queryClient = useQueryClient();

  // Mock data - replace with actual API calls
  const { data: school, isLoading: schoolLoading } = useQuery(['school', schoolId], async () => {
    return {
      id: parseInt(schoolId),
      name: 'Dr. Kabiru Gwarzo Academy',
      website: 'https://drkgacademy.edu.ng'
    };
  });

  const { data: theme, isLoading: themeLoading } = useQuery(['theme', schoolId], async () => {
    return {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
        background: '#FFFFFF',
        text: '#1F2937',
        textSecondary: '#6B7280'
      },
      typography: {
        headingFont: 'Inter',
        bodyFont: 'Inter',
        headingSize: 'large',
        bodySize: 'medium'
      },
      layout: {
        headerStyle: 'modern',
        footerStyle: 'simple',
        sidebarPosition: 'left',
        containerWidth: 'wide'
      },
      branding: {
        logo: '/api/uploads/schools/1/logo.png',
        favicon: '/api/uploads/schools/1/favicon.ico',
        schoolName: 'Dr. Kabiru Gwarzo Academy',
        tagline: 'Excellence in Islamic Education'
      },
      customCSS: ''
    };
  });

  const [themeData, setThemeData] = useState(theme || {});

  React.useEffect(() => {
    if (theme) {
      setThemeData(theme);
    }
  }, [theme]);

  const updateThemeMutation = useMutation(
    async (updatedTheme) => {
      // API call to update theme
      console.log('Updating theme:', updatedTheme);
      return updatedTheme;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['theme', schoolId]);
        toast.success('Theme updated successfully');
      },
      onError: () => {
        toast.error('Failed to update theme');
      }
    }
  );

  const resetThemeMutation = useMutation(
    async () => {
      // API call to reset theme to default
      console.log('Resetting theme to default');
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['theme', schoolId]);
        toast.success('Theme reset to default');
      },
      onError: () => {
        toast.error('Failed to reset theme');
      }
    }
  );

  const handleColorChange = (colorKey, value) => {
    setThemeData({
      ...themeData,
      colors: {
        ...themeData.colors,
        [colorKey]: value
      }
    });
  };

  const handleTypographyChange = (key, value) => {
    setThemeData({
      ...themeData,
      typography: {
        ...themeData.typography,
        [key]: value
      }
    });
  };

  const handleLayoutChange = (key, value) => {
    setThemeData({
      ...themeData,
      layout: {
        ...themeData.layout,
        [key]: value
      }
    });
  };

  const handleBrandingChange = (key, value) => {
    setThemeData({
      ...themeData,
      branding: {
        ...themeData.branding,
        [key]: value
      }
    });
  };

  const handleSave = () => {
    updateThemeMutation.mutate(themeData);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the theme to default? This will lose all customizations.')) {
      resetThemeMutation.mutate();
    }
  };

  const tabs = [
    { id: 'colors', name: 'Colors', icon: Palette },
    { id: 'typography', name: 'Typography', icon: Type },
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'branding', name: 'Branding', icon: ImageIcon },
    { id: 'custom', name: 'Custom CSS', icon: Settings }
  ];

  const previewModes = [
    { id: 'desktop', name: 'Desktop', icon: Monitor },
    { id: 'tablet', name: 'Tablet', icon: Tablet },
    { id: 'mobile', name: 'Mobile', icon: Smartphone }
  ];

  if (schoolLoading || themeLoading) {
    return <LoadingSpinner text="Loading theme editor..." />;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Theme Customization</h1>
            <p className="text-gray-600">Customize the appearance of {school?.name}</p>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href={school?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Live
            </a>
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
          <div className="p-4">
            {/* Tab Navigation */}
            <nav className="space-y-1 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>

            {/* Colors Tab */}
            {activeTab === 'colors' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Color Scheme</h3>
                
                {Object.entries(themeData.colors || {}).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Typography Tab */}
            {activeTab === 'typography' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Typography</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heading Font</label>
                  <select
                    value={themeData.typography?.headingFont || 'Inter'}
                    onChange={(e) => handleTypographyChange('headingFont', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Poppins">Poppins</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body Font</label>
                  <select
                    value={themeData.typography?.bodyFont || 'Inter'}
                    onChange={(e) => handleTypographyChange('bodyFont', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Lato">Lato</option>
                    <option value="Source Sans Pro">Source Sans Pro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heading Size</label>
                  <select
                    value={themeData.typography?.headingSize || 'medium'}
                    onChange={(e) => handleTypographyChange('headingSize', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body Size</label>
                  <select
                    value={themeData.typography?.bodySize || 'medium'}
                    onChange={(e) => handleTypographyChange('bodySize', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            )}

            {/* Layout Tab */}
            {activeTab === 'layout' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Layout Options</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Header Style</label>
                  <select
                    value={themeData.layout?.headerStyle || 'modern'}
                    onChange={(e) => handleLayoutChange('headerStyle', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="classic">Classic</option>
                    <option value="modern">Modern</option>
                    <option value="minimal">Minimal</option>
                    <option value="centered">Centered</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Footer Style</label>
                  <select
                    value={themeData.layout?.footerStyle || 'simple'}
                    onChange={(e) => handleLayoutChange('footerStyle', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="simple">Simple</option>
                    <option value="detailed">Detailed</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Container Width</label>
                  <select
                    value={themeData.layout?.containerWidth || 'wide'}
                    onChange={(e) => handleLayoutChange('containerWidth', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="narrow">Narrow</option>
                    <option value="medium">Medium</option>
                    <option value="wide">Wide</option>
                    <option value="full">Full Width</option>
                  </select>
                </div>
              </div>
            )}

            {/* Branding Tab */}
            {activeTab === 'branding' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Branding</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                  <input
                    type="text"
                    value={themeData.branding?.schoolName || ''}
                    onChange={(e) => handleBrandingChange('schoolName', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                  <input
                    type="text"
                    value={themeData.branding?.tagline || ''}
                    onChange={(e) => handleBrandingChange('tagline', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                  <div className="space-y-2">
                    {themeData.branding?.logo && (
                      <img
                        src={themeData.branding.logo}
                        alt="Current logo"
                        className="w-32 h-16 object-contain border border-gray-300 rounded"
                      />
                    )}
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Logo
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Favicon
                  </button>
                  <p className="text-xs text-gray-500 mt-1">16x16 or 32x32 pixels, ICO format recommended</p>
                </div>
              </div>
            )}

            {/* Custom CSS Tab */}
            {activeTab === 'custom' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Custom CSS</h3>
                <p className="text-sm text-gray-600">
                  Add custom CSS to further customize your school's website appearance.
                </p>
                
                <div>
                  <textarea
                    rows={12}
                    value={themeData.customCSS || ''}
                    onChange={(e) => setThemeData({...themeData, customCSS: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="/* Add your custom CSS here */
.header {
  background-color: #your-color;
}

.hero-section {
  padding: 2rem;
}"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-100 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Preview Controls */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {previewModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setPreviewMode(mode.id)}
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${
                          previewMode === mode.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {mode.name}
                      </button>
                    );
                  })}
                </div>
                <div className="text-sm text-gray-500">
                  Preview Mode: {previewModes.find(m => m.id === previewMode)?.name}
                </div>
              </div>
            </div>

            {/* Preview Frame */}
            <div className="flex-1 p-8 flex items-center justify-center">
              <div 
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  previewMode === 'mobile' ? 'w-80 h-[600px]' :
                  previewMode === 'tablet' ? 'w-[768px] h-[600px]' :
                  'w-full max-w-6xl h-[600px]'
                }`}
              >
                <div className="h-full flex flex-col">
                  {/* Mock Header */}
                  <div 
                    className="p-4 border-b"
                    style={{ 
                      backgroundColor: themeData.colors?.primary || '#3B82F6',
                      color: 'white'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white bg-opacity-20 rounded"></div>
                        <div>
                          <h1 className="font-bold text-lg">
                            {themeData.branding?.schoolName || 'School Name'}
                          </h1>
                          <p className="text-sm opacity-90">
                            {themeData.branding?.tagline || 'School Tagline'}
                          </p>
                        </div>
                      </div>
                      <nav className="hidden md:flex space-x-6 text-sm">
                        <a href="#" className="hover:opacity-80">Home</a>
                        <a href="#" className="hover:opacity-80">About</a>
                        <a href="#" className="hover:opacity-80">Programs</a>
                        <a href="#" className="hover:opacity-80">Contact</a>
                      </nav>
                    </div>
                  </div>

                  {/* Mock Content */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="space-y-6">
                      <div>
                        <h2 
                          className="text-2xl font-bold mb-4"
                          style={{ 
                            color: themeData.colors?.text || '#1F2937',
                            fontFamily: themeData.typography?.headingFont || 'Inter'
                          }}
                        >
                          Welcome to Our School
                        </h2>
                        <p 
                          className="text-base leading-relaxed"
                          style={{ 
                            color: themeData.colors?.textSecondary || '#6B7280',
                            fontFamily: themeData.typography?.bodyFont || 'Inter'
                          }}
                        >
                          This is a preview of how your website will look with the current theme settings. 
                          You can see how the colors, typography, and layout changes affect the overall appearance.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div 
                          className="p-4 rounded-lg"
                          style={{ backgroundColor: themeData.colors?.background || '#FFFFFF' }}
                        >
                          <h3 
                            className="font-semibold mb-2"
                            style={{ color: themeData.colors?.primary || '#3B82F6' }}
                          >
                            Academic Excellence
                          </h3>
                          <p 
                            className="text-sm"
                            style={{ color: themeData.colors?.textSecondary || '#6B7280' }}
                          >
                            Providing quality education with Islamic values.
                          </p>
                        </div>
                        <div 
                          className="p-4 rounded-lg"
                          style={{ backgroundColor: themeData.colors?.secondary + '20' || '#10B98120' }}
                        >
                          <h3 
                            className="font-semibold mb-2"
                            style={{ color: themeData.colors?.secondary || '#10B981' }}
                          >
                            Modern Facilities
                          </h3>
                          <p 
                            className="text-sm"
                            style={{ color: themeData.colors?.textSecondary || '#6B7280' }}
                          >
                            State-of-the-art classrooms and laboratories.
                          </p>
                        </div>
                      </div>

                      <button 
                        className="px-6 py-3 rounded-lg text-white font-medium"
                        style={{ backgroundColor: themeData.colors?.accent || '#F59E0B' }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Themes;
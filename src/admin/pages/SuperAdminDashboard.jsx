import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  School, 
  Users, 
  Database, 
  Palette,
  TrendingUp, 
  Calendar,
  Globe,
  Settings,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Activity
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const SuperAdminDashboard = () => {
  // Mock data for super admin dashboard
  const { data: stats, isLoading } = useQuery('super-admin-stats', async () => {
    return {
      schools: { total: 12, active: 10, inactive: 2 },
      users: { total: 156, admins: 24, superAdmins: 3 },
      applications: { total: 2340, thisMonth: 234, approved: 1890 },
      revenue: { total: 45600000, thisMonth: 3800000, growth: 12.5 }
    };
  });

  const { data: recentSchools, isLoading: schoolsLoading } = useQuery('recent-schools', async () => {
    return [
      {
        id: 1,
        name: 'Dr. Kabiru Gwarzo Academy',
        location: 'Kano, Nigeria',
        status: 'active',
        students: 450,
        createdAt: '2024-01-15',
        lastActive: '2025-02-04T10:30:00Z'
      },
      {
        id: 2,
        name: 'Al-Hikmah Islamic School',
        location: 'Lagos, Nigeria',
        status: 'active',
        students: 320,
        createdAt: '2024-03-20',
        lastActive: '2025-02-03T14:20:00Z'
      },
      {
        id: 3,
        name: 'Madinah Academy',
        location: 'Abuja, Nigeria',
        status: 'inactive',
        students: 180,
        createdAt: '2024-06-10',
        lastActive: '2025-01-28T09:15:00Z'
      }
    ];
  });

  const { data: systemHealth, isLoading: healthLoading } = useQuery('system-health', async () => {
    return {
      database: { status: 'healthy', responseTime: '45ms', uptime: '99.9%' },
      api: { status: 'healthy', responseTime: '120ms', uptime: '99.8%' },
      storage: { status: 'healthy', usage: '68%', available: '2.4TB' },
      backup: { status: 'healthy', lastBackup: '2025-02-04T02:00:00Z', nextBackup: '2025-02-05T02:00:00Z' }
    };
  });

  if (isLoading) {
    return <LoadingSpinner text="Loading super admin dashboard..." />;
  }

  const statCards = [
    {
      title: 'Total Schools',
      value: stats?.schools?.total || 0,
      change: '+2 this month',
      changeType: 'positive',
      icon: School,
      color: 'blue',
      subtitle: `${stats?.schools?.active || 0} active, ${stats?.schools?.inactive || 0} inactive`
    },
    {
      title: 'Total Users',
      value: stats?.users?.total || 0,
      change: '+15 this month',
      changeType: 'positive',
      icon: Users,
      color: 'green',
      subtitle: `${stats?.users?.admins || 0} admins, ${stats?.users?.superAdmins || 0} super admins`
    },
    {
      title: 'Total Applications',
      value: stats?.applications?.total || 0,
      change: `+${stats?.applications?.thisMonth || 0} this month`,
      changeType: 'positive',
      icon: Database,
      color: 'purple',
      subtitle: `${stats?.applications?.approved || 0} approved applications`
    },
    {
      title: 'Total Revenue',
      value: `₦${(stats?.revenue?.total || 0).toLocaleString()}`,
      change: `+${stats?.revenue?.growth || 0}%`,
      changeType: 'positive',
      icon: TrendingUp,
      color: 'orange',
      subtitle: `₦${(stats?.revenue?.thisMonth || 0).toLocaleString()} this month`
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-600 bg-blue-50',
      green: 'bg-green-500 text-green-600 bg-green-50',
      purple: 'bg-purple-500 text-purple-600 bg-purple-50',
      orange: 'bg-orange-500 text-orange-600 bg-orange-50'
    };
    return colors[color] || colors.blue;
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const getHealthStatus = (status) => {
    const colors = {
      healthy: 'text-green-600',
      warning: 'text-yellow-600',
      error: 'text-red-600'
    };
    return colors[status] || colors.healthy;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-purple-100">
          Manage all schools, users, and system-wide settings from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = getColorClasses(stat.color).split(' ');
          
          return (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${colorClasses[2]}`}>
                  <Icon className={`h-6 w-6 ${colorClasses[1]}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/schools"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <School className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Manage Schools</p>
              <p className="text-sm text-gray-500">Add, edit, or remove schools</p>
            </div>
          </Link>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">User Management</p>
              <p className="text-sm text-gray-500">Manage admin users</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Palette className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Theme Templates</p>
              <p className="text-sm text-gray-500">Manage design templates</p>
            </div>
          </button>
          
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="h-8 w-8 text-orange-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">System Settings</p>
              <p className="text-sm text-gray-500">Configure system-wide settings</p>
            </div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Schools */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Schools</h3>
            <Link
              to="/schools"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {schoolsLoading ? (
            <LoadingSpinner size="small" />
          ) : (
            <div className="space-y-4">
              {recentSchools?.map((school) => (
                <div key={school.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <School className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{school.name}</h4>
                      <p className="text-sm text-gray-500">{school.location} • {school.students} students</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(school.status)}
                    <div className="flex space-x-1">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System Health */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          
          {healthLoading ? (
            <LoadingSpinner size="small" />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Database</p>
                    <p className="text-sm text-gray-500">Response: {systemHealth?.database?.responseTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${getHealthStatus(systemHealth?.database?.status)}`}>
                    {systemHealth?.database?.status?.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">{systemHealth?.database?.uptime} uptime</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">API</p>
                    <p className="text-sm text-gray-500">Response: {systemHealth?.api?.responseTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${getHealthStatus(systemHealth?.api?.status)}`}>
                    {systemHealth?.api?.status?.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">{systemHealth?.api?.uptime} uptime</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Storage</p>
                    <p className="text-sm text-gray-500">Available: {systemHealth?.storage?.available}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${getHealthStatus(systemHealth?.storage?.status)}`}>
                    {systemHealth?.storage?.status?.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">{systemHealth?.storage?.usage} used</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900">Backup</p>
                    <p className="text-sm text-gray-500">
                      Last: {new Date(systemHealth?.backup?.lastBackup).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${getHealthStatus(systemHealth?.backup?.status)}`}>
                    {systemHealth?.backup?.status?.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Next: {new Date(systemHealth?.backup?.nextBackup).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {((stats?.applications?.approved / stats?.applications?.total) * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">Application Approval Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {stats?.schools?.active}
            </div>
            <p className="text-sm text-gray-600">Active Schools</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round((stats?.users?.total || 0) / (stats?.schools?.total || 1))}
            </div>
            <p className="text-sm text-gray-600">Avg Users per School</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
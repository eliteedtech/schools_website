import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios';
import { 
  FiImage, 
  FiCalendar, 
  FiAward,
  FiMail,
  FiTrendingUp,
  FiEye,
  FiPlus,
  FiClock,
  FiMapPin
} from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  // Fetch dashboard stats
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [gallery, events, statistics, messages] = await Promise.all([
        api.get('/gallery?limit=1').then(res => res.data.length),
        api.get('/events?limit=1').then(res => res.data.length),
        api.get('/statistics').then(res => res.data.length),
        api.get('/contact?status=unread&limit=1').then(res => res.data.length)
      ]);
      
      return {
        totalGallery: gallery,
        totalEvents: events,
        totalStatistics: statistics,
        unreadMessages: messages
      };
    }
  });

  // Fetch recent activities
  const { data: recentActivities } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      const [recentEvents, recentStatistics, recentMessages] = await Promise.all([
        api.get('/events?limit=3').then(res => res.data),
        api.get('/statistics').then(res => res.data.slice(0, 3)),
        api.get('/contact?limit=3').then(res => res.data)
      ]);
      
      return {
        events: recentEvents,
        statistics: recentStatistics,
        messages: recentMessages
      };
    }
  });

  const quickStats = [
    {
      title: 'Gallery Photos',
      value: stats?.totalGallery || 0,
      change: 'Total uploaded',
      icon: <FiImage className="w-6 h-6" />,
      color: 'bg-blue-950 dark:bg-blue-800',
      textColor: 'text-white',
      link: '/admin/gallery'
    },
    {
      title: 'Upcoming Events',
      value: stats?.totalEvents || 0,
      change: 'Events scheduled',
      icon: <FiCalendar className="w-6 h-6" />,
      color: 'bg-yellow-400 dark:bg-yellow-500',
      textColor: 'text-blue-950',
      link: '/admin/events'
    },
    {
      title: 'Website Statistics',
      value: stats?.totalStatistics || 0,
      change: 'Statistics configured',
      icon: <FiAward className="w-6 h-6" />,
      color: 'bg-green-600 dark:bg-green-700',
      textColor: 'text-white',
      link: '/admin/statistics'
    },
    {
      title: 'New Messages',
      value: stats?.unreadMessages || 0,
      change: 'Unread messages',
      icon: <FiMail className="w-6 h-6" />,
      color: 'bg-purple-600 dark:bg-purple-700',
      textColor: 'text-white',
      link: '/admin/contact'
    }
  ];

  const quickActions = [
    {
      title: 'Upload Photos',
      description: 'Add new photos to gallery',
      icon: <FiImage className="w-8 h-8" />,
      color: 'bg-blue-950 dark:bg-blue-800',
      link: '/admin/gallery'
    },
    {
      title: 'Add Event',
      description: 'Create upcoming event',
      icon: <FiCalendar className="w-8 h-8" />,
      color: 'bg-yellow-400 dark:bg-yellow-500 text-blue-950',
      link: '/admin/events'
    },
    {
      title: 'Update Statistics',
      description: 'Update website statistics',
      icon: <FiAward className="w-8 h-8" />,
      color: 'bg-green-600 dark:bg-green-700',
      link: '/admin/statistics'
    },
    {
      title: 'View Messages',
      description: 'Check contact messages',
      icon: <FiMail className="w-8 h-8" />,
      color: 'bg-purple-600 dark:bg-purple-700',
      link: '/admin/contact'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Dr. Kabiru Gwarzo Academy - Admin Dashboard
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <Link 
            key={index} 
            to={stat.link}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.color} ${stat.textColor} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all hover:scale-105"
            >
              <div className={`${action.color} text-white p-4 rounded-lg mb-4 inline-flex`}>
                {action.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Events</h3>
            <Link 
              to="/admin/events"
              className="text-blue-950 dark:text-yellow-400 hover:text-blue-800 dark:hover:text-yellow-500 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities?.events?.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="bg-yellow-400 text-blue-950 p-2 rounded-lg">
                  <FiCalendar className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                    event.status === 'upcoming' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FiCalendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No events yet. Add your first event!</p>
              </div>
            )}
          </div>
        </div>

        {/* Website Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Website Statistics</h3>
            <Link 
              to="/admin/statistics"
              className="text-blue-950 dark:text-yellow-400 hover:text-blue-800 dark:hover:text-yellow-500 text-sm font-medium"
            >
              Manage
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivities?.statistics?.map((stat) => (
              <div key={stat.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="bg-green-600 text-white p-2 rounded-lg">
                  <FiAward className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">{stat.label}</h4>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.description}</p>
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FiAward className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No statistics configured yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
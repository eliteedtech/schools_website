import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign,
  BookOpen,
  Users,
  Calendar,
  Check,
  X
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Pricing = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPricing, setEditingPricing] = useState(null);
  const queryClient = useQueryClient();

  // Mock data - replace with actual API call
  const { data: pricingPlans, isLoading } = useQuery('pricing', async () => {
    return [
      {
        id: 1,
        name: 'Pre-Nursery Program',
        level: 'pre-nursery',
        academicYear: '2025/2026',
        fees: {
          registration: 5000,
          tuition: 150000,
          uniform: 25000,
          books: 15000,
          feeding: 80000,
          transport: 60000
        },
        totalAmount: 335000,
        paymentSchedule: 'termly',
        features: [
          'Islamic foundation classes',
          'Basic literacy and numeracy',
          'Play-based learning',
          'Nutritious meals',
          'Safe transportation'
        ],
        isActive: true,
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Primary School Program',
        level: 'primary',
        academicYear: '2025/2026',
        fees: {
          registration: 10000,
          tuition: 200000,
          uniform: 30000,
          books: 25000,
          feeding: 90000,
          transport: 70000,
          extracurricular: 20000
        },
        totalAmount: 445000,
        paymentSchedule: 'termly',
        features: [
          'Comprehensive Islamic education',
          'Modern curriculum',
          'Computer literacy',
          'Sports and games',
          'Library access',
          'After-school programs'
        ],
        isActive: true,
        createdAt: '2025-01-01T00:00:00Z'
      },
      {
        id: 3,
        name: 'Junior Secondary Program',
        level: 'jss',
        academicYear: '2025/2026',
        fees: {
          registration: 15000,
          tuition: 250000,
          uniform: 35000,
          books: 40000,
          feeding: 100000,
          transport: 80000,
          laboratory: 30000,
          extracurricular: 25000
        },
        totalAmount: 575000,
        paymentSchedule: 'termly',
        features: [
          'Advanced Islamic studies',
          'Science laboratory access',
          'Technology integration',
          'Career guidance',
          'Leadership training',
          'Inter-school competitions'
        ],
        isActive: true,
        createdAt: '2025-01-01T00:00:00Z'
      }
    ];
  });

  const deletePricingMutation = useMutation(
    async (pricingId) => {
      // API call to delete pricing
      console.log('Deleting pricing:', pricingId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('pricing');
        toast.success('Pricing plan deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete pricing plan');
      }
    }
  );

  const handleDelete = (pricingId) => {
    if (window.confirm('Are you sure you want to delete this pricing plan?')) {
      deletePricingMutation.mutate(pricingId);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const PricingForm = ({ pricing, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      name: pricing?.name || '',
      level: pricing?.level || 'pre-nursery',
      academicYear: pricing?.academicYear || '2025/2026',
      paymentSchedule: pricing?.paymentSchedule || 'termly',
      fees: pricing?.fees || {
        registration: 0,
        tuition: 0,
        uniform: 0,
        books: 0,
        feeding: 0,
        transport: 0
      },
      features: pricing?.features || ['']
    });

    const handleFeeChange = (feeType, value) => {
      setFormData({
        ...formData,
        fees: {
          ...formData.fees,
          [feeType]: parseInt(value) || 0
        }
      });
    };

    const handleFeatureChange = (index, value) => {
      const newFeatures = [...formData.features];
      newFeatures[index] = value;
      setFormData({ ...formData, features: newFeatures });
    };

    const addFeature = () => {
      setFormData({
        ...formData,
        features: [...formData.features, '']
      });
    };

    const removeFeature = (index) => {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData({ ...formData, features: newFeatures });
    };

    const calculateTotal = () => {
      return Object.values(formData.fees).reduce((sum, fee) => sum + fee, 0);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const submissionData = {
        ...formData,
        totalAmount: calculateTotal(),
        features: formData.features.filter(feature => feature.trim() !== '')
      };
      onSubmit(submissionData);
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {pricing ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Level</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                  >
                    <option value="pre-nursery">Pre-Nursery</option>
                    <option value="nursery">Nursery</option>
                    <option value="primary">Primary</option>
                    <option value="jss">Junior Secondary</option>
                    <option value="sss">Senior Secondary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Academic Year</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                    placeholder="2025/2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Schedule</label>
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.paymentSchedule}
                    onChange={(e) => setFormData({...formData, paymentSchedule: e.target.value})}
                  >
                    <option value="termly">Termly</option>
                    <option value="annually">Annually</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              {/* Fee Structure */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Fee Structure</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(formData.fees).map(([feeType, amount]) => (
                    <div key={feeType}>
                      <label className="block text-sm font-medium text-gray-700 capitalize">
                        {feeType.replace(/([A-Z])/g, ' $1')} Fee
                      </label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                        <input
                          type="number"
                          min="0"
                          className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={amount}
                          onChange={(e) => handleFeeChange(feeType, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Total Amount:</span>
                    <span className="text-lg font-bold text-blue-900">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Features & Benefits</h4>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Enter feature..."
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    + Add Feature
                  </button>
                </div>
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
                  {pricing ? 'Update' : 'Create'} Pricing Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading pricing plans..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pricing Management</h1>
          <p className="text-gray-600">Manage school fee structures and pricing plans</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Pricing Plan
        </button>
      </div>

      {/* Pricing Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {pricingPlans?.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{plan.level.replace('-', ' ')} Level</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingPricing(plan)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatCurrency(plan.totalAmount)}
                  </span>
                  <span className="text-sm text-gray-500">per {plan.paymentSchedule.replace('ly', '')}</span>
                </div>
                <p className="text-sm text-gray-600">Academic Year: {plan.academicYear}</p>
              </div>

              {/* Fee Breakdown */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Fee Breakdown</h4>
                <div className="space-y-1">
                  {Object.entries(plan.fees).map(([feeType, amount]) => (
                    <div key={feeType} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 capitalize">
                        {feeType.replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <span className="text-gray-900">{formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                <div className="space-y-1">
                  {plan.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.features.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{plan.features.length - 3} more features
                    </p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  plan.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(plan.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Pricing Modal */}
      {(showAddModal || editingPricing) && (
        <PricingForm
          pricing={editingPricing}
          onClose={() => {
            setShowAddModal(false);
            setEditingPricing(null);
          }}
          onSubmit={(formData) => {
            console.log('Pricing form submitted:', formData);
            setShowAddModal(false);
            setEditingPricing(null);
            toast.success(editingPricing ? 'Pricing plan updated successfully' : 'Pricing plan created successfully');
          }}
        />
      )}
    </div>
  );
};

export default Pricing;
'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
  BuildingStorefrontIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  TruckIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';

interface Vendor {
  id: string;
  name: string;
  category: 'maintenance' | 'cleaning' | 'supplies' | 'renovation' | 'catering' | 'transport';
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  services: string[];
  priceRange: 'budget' | 'mid' | 'premium';
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  availability: 'available' | 'busy' | 'unavailable';
  responseTime: string;
}

export function VendorMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const vendors: Vendor[] = [
    {
      id: 'vendor-001',
      name: 'Cyprus Professional Cleaning',
      category: 'cleaning',
      description: 'Professional housekeeping and deep cleaning services for hotels and vacation rentals.',
      location: 'Limassol, Cyprus',
      rating: 4.8,
      reviewCount: 124,
      verified: true,
      services: ['Daily Housekeeping', 'Deep Cleaning', 'Laundry Services', 'Window Cleaning'],
      priceRange: 'mid',
      contact: {
        phone: '+357 25 123456',
        email: 'info@cypruscleaning.com',
        website: 'www.cypruscleaning.com'
      },
      availability: 'available',
      responseTime: 'Within 2 hours'
    },
    {
      id: 'vendor-002',
      name: 'Mediterranean Maintenance Co.',
      category: 'maintenance',
      description: 'Complete maintenance solutions for hospitality properties. 24/7 emergency services.',
      location: 'Paphos, Cyprus',
      rating: 4.9,
      reviewCount: 89,
      verified: true,
      services: ['HVAC Repair', 'Plumbing', 'Electrical Work', 'Pool Maintenance'],
      priceRange: 'premium',
      contact: {
        phone: '+357 26 987654',
        email: 'service@medmaintenance.cy'
      },
      availability: 'busy',
      responseTime: 'Within 4 hours'
    },
    {
      id: 'vendor-003',
      name: 'Island Supplies Ltd',
      category: 'supplies',
      description: 'Hotel supplies, linens, toiletries and hospitality equipment supplier.',
      location: 'Nicosia, Cyprus',
      rating: 4.6,
      reviewCount: 156,
      verified: true,
      services: ['Linens & Towels', 'Toiletries', 'Kitchen Supplies', 'Cleaning Products'],
      priceRange: 'budget',
      contact: {
        phone: '+357 22 456789',
        email: 'orders@islandsupplies.com.cy',
        website: 'www.islandsupplies.com.cy'
      },
      availability: 'available',
      responseTime: 'Within 1 hour'
    },
    {
      id: 'vendor-004',
      name: 'Elite Property Renovations',
      category: 'renovation',
      description: 'High-end renovation and interior design services for hospitality properties.',
      location: 'Ayia Napa, Cyprus',
      rating: 4.7,
      reviewCount: 67,
      verified: false,
      services: ['Interior Design', 'Bathroom Renovation', 'Kitchen Upgrade', 'Flooring'],
      priceRange: 'premium',
      contact: {
        phone: '+357 23 345678',
        email: 'projects@eliterenovations.cy'
      },
      availability: 'available',
      responseTime: 'Within 24 hours'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Vendors', icon: BuildingStorefrontIcon, count: vendors.length },
    { id: 'maintenance', name: 'Maintenance', icon: WrenchScrewdriverIcon, count: vendors.filter(v => v.category === 'maintenance').length },
    { id: 'cleaning', name: 'Cleaning', icon: SparklesIcon, count: vendors.filter(v => v.category === 'cleaning').length },
    { id: 'supplies', name: 'Supplies', icon: TruckIcon, count: vendors.filter(v => v.category === 'supplies').length },
    { id: 'renovation', name: 'Renovation', icon: PaintBrushIcon, count: vendors.filter(v => v.category === 'renovation').length }
  ];

  const filteredVendors = selectedCategory === 'all'
    ? vendors
    : vendors.filter(vendor => vendor.category === selectedCategory);

  const getCategoryIcon = (category: Vendor['category']) => {
    switch (category) {
      case 'maintenance':
        return WrenchScrewdriverIcon;
      case 'cleaning':
        return SparklesIcon;
      case 'supplies':
        return TruckIcon;
      case 'renovation':
        return PaintBrushIcon;
      default:
        return BuildingStorefrontIcon;
    }
  };

  const getPriceRangeColor = (range: Vendor['priceRange']) => {
    switch (range) {
      case 'budget':
        return 'bg-green-100 text-green-800';
      case 'mid':
        return 'bg-yellow-100 text-yellow-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (availability: Vendor['availability']) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs text-gray-500">({category.count})</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVendors.map((vendor) => {
          const CategoryIcon = getCategoryIcon(vendor.category);

          return (
            <div key={vendor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <CategoryIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                      {vendor.verified && (
                        <CheckBadgeIcon className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{vendor.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriceRangeColor(vendor.priceRange)}`}>
                    {vendor.priceRange}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(vendor.availability)}`}>
                    {vendor.availability}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{vendor.description}</p>

              {/* Rating and Response Time */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{vendor.rating}</span>
                    <span className="text-sm text-gray-500">({vendor.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Responds {vendor.responseTime.toLowerCase()}
                </div>
              </div>

              {/* Services */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Services</h4>
                <div className="flex flex-wrap gap-1">
                  {vendor.services.slice(0, 4).map((service, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {service}
                    </span>
                  ))}
                  {vendor.services.length > 4 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      +{vendor.services.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => toast.success(`Calling ${vendor.name}...`)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <PhoneIcon className="h-4 w-4" />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => toast.success(`Opening email to ${vendor.name}...`)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>Email</span>
                </button>
                <button
                  onClick={() => toast.success(`Viewing ${vendor.name} profile...`)}
                  className="bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredVendors.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BuildingStorefrontIcon className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
          <p className="text-gray-500">Try selecting a different category</p>
        </div>
      )}
    </div>
  );
}
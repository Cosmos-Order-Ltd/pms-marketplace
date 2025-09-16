'use client';

import React, { useState } from 'react';

export function PropertyFilters() {
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [] as string[]
  });

  const propertyTypes = [
    { value: 'hotel', label: 'Hotel' },
    { value: 'villa', label: 'Villa' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'resort', label: 'Resort' },
    { value: 'hostel', label: 'Hostel' }
  ];

  const bedroomOptions = [
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4+ Bedrooms' }
  ];

  const amenitiesList = [
    'WiFi', 'Pool', 'Gym', 'Parking', 'Beach Access',
    'Air Conditioning', 'Kitchen', 'Balcony', 'Pet Friendly'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-32">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

      <div className="space-y-6">
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Types</option>
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (EUR)</label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="10000"
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>€0</span>
              <span>€10,000+</span>
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Any</option>
            {bedroomOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {amenitiesList.map(amenity => (
              <label key={amenity} className="flex items-center">
                <input type="checkbox" className="rounded mr-2" />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
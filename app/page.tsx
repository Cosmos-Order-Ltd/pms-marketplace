'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  HeartIcon,
  FunnelIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { PropertyCard } from './components/PropertyCard';
import { PropertyFilters } from './components/PropertyFilters';
import { FeaturedProperties } from './components/FeaturedProperties';
import { VendorMarketplace } from './components/VendorMarketplace';

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  priceType: 'per_night' | 'per_month' | 'sale';
  currency: string;
  propertyType: 'hotel' | 'villa' | 'apartment' | 'resort' | 'hostel';
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  images: string[];
  rating: number;
  reviewCount: number;
  amenities: string[];
  availability: {
    from: string;
    to: string;
  };
  owner: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
  };
  featured: boolean;
  isFavorite: boolean;
}

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState<'properties' | 'vendors'>('properties');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [properties, setProperties] = useState<Property[]>([
    {
      id: 'prop-001',
      title: 'Luxury Beachfront Villa - Paphos',
      description: 'Stunning 4-bedroom villa with private pool and direct beach access. Perfect for families and groups.',
      location: 'Paphos, Cyprus',
      price: 450,
      priceType: 'per_night',
      currency: 'EUR',
      propertyType: 'villa',
      bedrooms: 4,
      bathrooms: 3,
      area: 280,
      images: ['villa1.jpg', 'villa2.jpg', 'villa3.jpg'],
      rating: 4.9,
      reviewCount: 127,
      amenities: ['Private Pool', 'Beach Access', 'WiFi', 'Air Conditioning', 'Kitchen', 'Parking'],
      availability: {
        from: '2025-02-01',
        to: '2025-12-31'
      },
      owner: {
        name: 'Maria Constantinou',
        avatar: 'avatar1.jpg',
        rating: 4.8,
        verified: true
      },
      featured: true,
      isFavorite: false
    },
    {
      id: 'prop-002',
      title: 'Modern City Apartment - Limassol',
      description: 'Contemporary 2-bedroom apartment in the heart of Limassol with marina views.',
      location: 'Limassol, Cyprus',
      price: 1800,
      priceType: 'per_month',
      currency: 'EUR',
      propertyType: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 95,
      images: ['apt1.jpg', 'apt2.jpg'],
      rating: 4.6,
      reviewCount: 89,
      amenities: ['Marina View', 'Gym', 'WiFi', 'Air Conditioning', 'Balcony'],
      availability: {
        from: '2025-03-01',
        to: '2026-02-28'
      },
      owner: {
        name: 'Andreas Georgiou',
        avatar: 'avatar2.jpg',
        rating: 4.7,
        verified: true
      },
      featured: false,
      isFavorite: false
    },
    {
      id: 'prop-003',
      title: 'Boutique Hotel - Ayia Napa',
      description: '12-room boutique hotel near the famous Nissi Beach. Fully operational business.',
      location: 'Ayia Napa, Cyprus',
      price: 2500000,
      priceType: 'sale',
      currency: 'EUR',
      propertyType: 'hotel',
      bedrooms: 12,
      bathrooms: 14,
      area: 800,
      images: ['hotel1.jpg', 'hotel2.jpg', 'hotel3.jpg'],
      rating: 4.4,
      reviewCount: 245,
      amenities: ['Restaurant', 'Bar', 'Pool', 'Beach Access', 'Business License'],
      availability: {
        from: '2025-01-16',
        to: '2025-12-31'
      },
      owner: {
        name: 'Elena Papadopoulos',
        avatar: 'avatar3.jpg',
        rating: 4.9,
        verified: true
      },
      featured: true,
      isFavorite: false
    }
  ]);

  useEffect(() => {
    toast.success('Welcome to PMS Marketplace!');
  }, []);

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );

    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, isFavorite: !property.isFavorite }
          : property
      )
    );

    const property = properties.find(p => p.id === propertyId);
    if (property) {
      toast.success(
        property.isFavorite
          ? `Removed "${property.title}" from favorites`
          : `Added "${property.title}" to favorites`
      );
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || property.location.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const tabs = [
    { id: 'properties' as const, name: 'Properties', count: filteredProperties.length },
    { id: 'vendors' as const, name: 'Vendors', count: 45 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PMS Marketplace</h1>
              <p className="text-gray-600">Discover properties and connect with vendors</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                {viewMode === 'grid' ? (
                  <ListBulletIcon className="h-5 w-5" />
                ) : (
                  <Squares2X2Icon className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <FunnelIcon className="h-5 w-5" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex space-x-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-64 relative">
              <MapPinIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-4 text-sm font-medium relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <PropertyFilters />
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {activeTab === 'properties' && (
              <>
                {/* Featured Properties */}
                <FeaturedProperties
                  properties={properties.filter(p => p.featured)}
                  onToggleFavorite={toggleFavorite}
                />

                {/* Properties Grid/List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      All Properties ({filteredProperties.length})
                    </h2>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Sort by:</span>
                      <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Rating</option>
                        <option>Recently Added</option>
                      </select>
                    </div>
                  </div>

                  <div className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                      : 'space-y-4'
                  }>
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        viewMode={viewMode}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>

                  {filteredProperties.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Squares2X2Icon className="h-16 w-16 mx-auto" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                      <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'vendors' && (
              <VendorMarketplace />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
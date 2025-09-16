'use client';

import React from 'react';
import toast from 'react-hot-toast';
import {
  HeartIcon,
  StarIcon,
  MapPinIcon,
  HomeIcon,
  BedIcon,
  BathIcon,
  SquaresPlusIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

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
  owner: {
    name: string;
    avatar: string;
    rating: number;
    verified: boolean;
  };
  isFavorite: boolean;
}

interface PropertyCardProps {
  property: Property;
  viewMode: 'grid' | 'list';
  onToggleFavorite: (propertyId: string) => void;
}

export function PropertyCard({ property, viewMode, onToggleFavorite }: PropertyCardProps) {
  const formatPrice = (price: number, type: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: property.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);

    switch (type) {
      case 'per_night':
        return `${formatted}/night`;
      case 'per_month':
        return `${formatted}/month`;
      case 'sale':
        return formatted;
      default:
        return formatted;
    }
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel':
      case 'resort':
        return '🏨';
      case 'villa':
        return '🏖️';
      case 'apartment':
        return '🏢';
      default:
        return '🏠';
    }
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case 'hotel':
      case 'resort':
        return 'bg-blue-100 text-blue-800';
      case 'villa':
        return 'bg-green-100 text-green-800';
      case 'apartment':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex gap-6">
          {/* Image */}
          <div className="w-48 h-32 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
            <span className="text-4xl">{getPropertyTypeIcon(property.propertyType)}</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPropertyTypeColor(property.propertyType)}`}>
                    {property.propertyType}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>
              </div>

              <button
                onClick={() => onToggleFavorite(property.id)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                {property.isFavorite ? (
                  <HeartSolidIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>

            {/* Property Details */}
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              {property.bedrooms && (
                <div className="flex items-center space-x-1">
                  <BedIcon className="h-4 w-4" />
                  <span>{property.bedrooms} bed</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center space-x-1">
                  <BathIcon className="h-4 w-4" />
                  <span>{property.bathrooms} bath</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <SquaresPlusIcon className="h-4 w-4" />
                <span>{property.area} m²</span>
              </div>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{property.rating}</span>
                  <span className="text-sm text-gray-500">({property.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  {property.owner.verified && (
                    <CheckBadgeIcon className="h-4 w-4 text-blue-500" />
                  )}
                  <span>{property.owner.name}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(property.price, property.priceType)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-6xl">{getPropertyTypeIcon(property.propertyType)}</span>

        <button
          onClick={() => onToggleFavorite(property.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full"
        >
          {property.isFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>

        <span className={`absolute top-3 left-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPropertyTypeColor(property.propertyType)}`}>
          {property.propertyType}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
          <MapPinIcon className="h-4 w-4" />
          <span>{property.location}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>

        {/* Property Details */}
        <div className="flex items-center space-x-3 text-sm text-gray-500 mb-3">
          {property.bedrooms && (
            <div className="flex items-center space-x-1">
              <BedIcon className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center space-x-1">
              <BathIcon className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <SquaresPlusIcon className="h-4 w-4" />
            <span>{property.area} m²</span>
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs text-gray-600">{property.owner.name[0]}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600">{property.owner.name}</span>
            {property.owner.verified && (
              <CheckBadgeIcon className="h-4 w-4 text-blue-500" />
            )}
          </div>
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{property.rating}</span>
            <span className="text-sm text-gray-500">({property.reviewCount})</span>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              {formatPrice(property.price, property.priceType)}
            </div>
          </div>
        </div>

        {/* Quick View Button */}
        <button
          onClick={() => toast.success(`Viewing details for "${property.title}"`)}
          className="w-full mt-3 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
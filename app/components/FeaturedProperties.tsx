'use client';

import React from 'react';
import { StarIcon, FireIcon } from '@heroicons/react/24/solid';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceType: string;
  currency: string;
  propertyType: string;
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
}

interface FeaturedPropertiesProps {
  properties: Property[];
  onToggleFavorite: (propertyId: string) => void;
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
      <div className="flex items-center space-x-2 mb-4">
        <FireIcon className="h-6 w-6 text-yellow-300" />
        <h2 className="text-xl font-semibold">Featured Properties</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
            <div className="text-4xl mb-2">🏖️</div>
            <h3 className="font-semibold mb-1">{property.title}</h3>
            <p className="text-white/80 text-sm mb-2">{property.location}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <StarIcon className="h-4 w-4 text-yellow-300" />
                <span className="text-sm">{property.rating}</span>
              </div>
              <div className="font-bold">
                €{property.price.toLocaleString()}
                {property.priceType === 'per_night' ? '/night' :
                 property.priceType === 'per_month' ? '/month' : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
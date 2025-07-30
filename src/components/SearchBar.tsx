'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Button from '@/UI/Button';
import Select from '@/UI/Select';

interface SearchBarProps {
  onSearch: (query: string, category: string) => void;
  isLoading: boolean;
}

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology', 'politics'];

const categoryOptions = categories.map(cat => ({
  value: cat,
  label: cat.charAt(0).toUpperCase() + cat.slice(1)
}));

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search news by content, author, or keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
          </div>
          <div className="flex flex-row gap-4 w-full sm:w-auto">
            <Button
              type="button" 
              variant="secondary"
              text='Filters' 
              onClick={() => setShowFilters(!showFilters)}
              icon={
                <Filter className="w-5 h-5" />
              }
              containerStyle="w-full sm:w-auto"
            />
            <Button 
              type="submit" 
              variant="default"
              text={isLoading ? 'Searching...' : 'Search'}
              disabled={isLoading}
              containerStyle="w-full sm:w-auto"
            />
          </div>
        </div>
        
        {showFilters && (
          <div className="pt-4 border-t border-gray-200">
            <Select
              label="Category"
              placeholder="All Categories"
              options={categoryOptions}
              value={category}
              onChange={handleCategoryChange}
              allowClear={true}
              containerStyle="w-full md:w-64"
            />
          </div>
        )}
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions } from '../../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onToggleAdvanced: () => void;
  showAdvanced: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  onToggleAdvanced,
  showAdvanced
}) => {
  const modalityOptions = ['LLM', 'VLM', '이미지'];
  const licenseOptions = ['연구용', '상업용', '온프렘', 'FT'];

  const toggleFilter = (type: keyof FilterOptions, value: string) => {
    const currentArray = filters[type] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    onFiltersChange({
      ...filters,
      [type]: newArray
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">빠른 필터</h2>
        <button
          onClick={onToggleAdvanced}
          className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
        >
          <Filter className="h-4 w-4" />
          <span>{showAdvanced ? '고급 필터 숨기기' : '고급 필터'}</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Modality */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">모달리티:</span>
          <div className="flex space-x-1">
            {modalityOptions.map(option => (
              <button
                key={option}
                onClick={() => toggleFilter('modality', option)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.modality.includes(option)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* License */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">라이선스:</span>
          <div className="flex space-x-1">
            {licenseOptions.map(option => (
              <button
                key={option}
                onClick={() => toggleFilter('license', option)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filters.license.includes(option)
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">가격 범위:</span>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) => onFiltersChange({
                ...filters,
                priceRange: [0, Number(e.target.value)]
              })}
              className="w-24"
            />
            <span className="text-xs text-gray-600">~${filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Clear Filters */}
        {(filters.modality.length > 0 || filters.license.length > 0) && (
          <button
            onClick={() => onFiltersChange({
              search: filters.search,
              modality: [],
              license: [],
              priceRange: [0, 1000],
              minPerformance: 0
            })}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
          >
            <X className="h-3 w-3" />
            <span>필터 초기화</span>
          </button>
        )}
      </div>
    </div>
  );
};
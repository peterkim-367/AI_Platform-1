import React from 'react';
import { Star, Eye, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Model } from '../../types';

interface ModelCardProps {
  model: Model;
  onAddToComparison: (model: Model) => void;
  isComparing: boolean;
}

export const ModelCard: React.FC<ModelCardProps> = ({ 
  model, 
  onAddToComparison, 
  isComparing 
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start space-x-3 mb-4">
        <img 
          src={model.thumbnail} 
          alt={model.name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{model.name}</h3>
          <p className="text-sm text-gray-600">{model.creator}</p>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onAddToComparison(model)}
            className={`p-1 rounded transition-colors ${
              isComparing 
                ? 'bg-blue-100 text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {model.metrics.mmlu && (
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">MMLU</div>
            <div className="text-lg font-bold text-gray-900">{model.metrics.mmlu}%</div>
          </div>
        )}
        {model.metrics.hellaswag && (
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600 mb-1">HellaSwag</div>
            <div className="text-lg font-bold text-gray-900">{model.metrics.hellaswag}%</div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          model.modality === 'LLM' ? 'bg-blue-100 text-blue-800' :
          model.modality === 'VLM' ? 'bg-purple-100 text-purple-800' :
          'bg-green-100 text-green-800'
        }`}>
          {model.modality}
        </span>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          {model.license}
        </span>
      </div>

      {/* Price & Actions */}
      <div className="flex items-center justify-between">
        <div className="text-sm">
          {model.pricing.type === 'free' ? (
            <span className="font-medium text-green-600">무료</span>
          ) : (
            <span className="font-medium text-gray-900">
              ${model.pricing.amount} {model.pricing.currency}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/playground?model=${model.id}`}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            체험
          </Link>
          <Link
            to={`/model/${model.id}`}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            자세히
          </Link>
        </div>
      </div>
    </div>
  );
};
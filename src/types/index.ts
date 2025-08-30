export interface Model {
  id: string;
  name: string;
  creator: string;
  version: string;
  thumbnail: string;
  description: string;
  modality: 'LLM' | 'VLM' | 'Image';
  license: '연구용' | '상업용' | '온프렘' | 'FT';
  pricing: {
    type: 'free' | 'paid';
    amount?: number;
    currency?: 'USDC' | 'SOL';
  };
  metrics: {
    mmlu?: number;
    hellaswag?: number;
    [key: string]: number | undefined;
  };
  tags: string[];
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  wallet?: {
    address: string;
    network: string;
    connected: boolean;
  };
}

export interface ComparisonItem {
  model: Model;
  selected: boolean;
}

export type FilterOptions = {
  search: string;
  modality: string[];
  license: string[];
  priceRange: [number, number];
  minPerformance: number;
};
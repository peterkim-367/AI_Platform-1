import { Model } from '../types';

export const mockModels: Model[] = [
  {
    id: '1',
    name: 'GPT-4 Turbo',
    creator: 'OpenAI',
    version: '1.0.0',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: '최신 대화형 AI 모델',
    modality: 'LLM',
    license: '상업용',
    pricing: { type: 'paid', amount: 20, currency: 'USDC' },
    metrics: { mmlu: 87, hellaswag: 92 },
    tags: ['대화', '추론', '코딩'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Claude 3 Opus',
    creator: 'Anthropic',
    version: '3.0.0',
    thumbnail: 'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: '안전하고 도움이 되는 AI',
    modality: 'LLM',
    license: '연구용',
    pricing: { type: 'paid', amount: 15, currency: 'USDC' },
    metrics: { mmlu: 85, hellaswag: 88 },
    tags: ['안전성', '추론', '창작'],
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'DALL-E 3',
    creator: 'OpenAI',
    version: '3.0.0',
    thumbnail: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: '고품질 이미지 생성 AI',
    modality: 'Image',
    license: '상업용',
    pricing: { type: 'paid', amount: 25, currency: 'USDC' },
    metrics: { fid: 95, inception_score: 89 },
    tags: ['이미지', '생성', '예술'],
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'Llama 2 Chat',
    creator: 'Meta',
    version: '2.1.0',
    thumbnail: 'https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: '오픈소스 대화 모델',
    modality: 'LLM',
    license: '연구용',
    pricing: { type: 'free' },
    metrics: { mmlu: 78, hellaswag: 82 },
    tags: ['오픈소스', '대화', '무료'],
    createdAt: '2024-01-08'
  },
  {
    id: '5',
    name: 'Stable Diffusion XL',
    creator: 'Stability AI',
    version: '1.0.0',
    thumbnail: 'https://images.pexels.com/photos/8728562/pexels-photo-8728562.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: '고해상도 이미지 생성',
    modality: 'Image',
    license: '상업용',
    pricing: { type: 'paid', amount: 10, currency: 'USDC' },
    metrics: { fid: 88, inception_score: 85 },
    tags: ['이미지', '고해상도', '예술'],
    createdAt: '2024-01-05'
  },
  {
    id: '6',
    name: 'GPT-4 Vision',
    creator: 'OpenAI',
    version: '1.0.0',
    thumbnail: 'https://images.pexels.com/photos/8728562/pexels-photo-8728562.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: '이미지 이해 및 분석',
    modality: 'VLM',
    license: '상업용',
    pricing: { type: 'paid', amount: 30, currency: 'USDC' },
    metrics: { mmlu: 85, visual_qa: 92 },
    tags: ['멀티모달', '이미지분석', '텍스트'],
    createdAt: '2024-01-12'
  }
];